import json
import uuid
from datetime import datetime, timezone, timedelta

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from orders import read_orders, write_orders
from models import Cart, Order, OrderProductDetails, Product, DeliveryOption
from utils.money import calculate_product_price, calculate_total_price

app = FastAPI()

origins = ["http://127.0.0.1:5500"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

PRODUCTS = {}
with open("./data/products.json", "r") as f:
    PRODUCTS = {item["id"]: Product(**item) for item in json.load(f)}

DELIVERY_OPTIONS = {}
with open("./data/deliveryOptions.json", "r") as f:
    DELIVERY_OPTIONS = {item["id"]: DeliveryOption(**item) for item in json.load(f)}

ORDERS = read_orders()


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Welcome to Altamash's Amazon API :)"}


@app.get("/greeting")
async def get_greeting() -> dict[str, str]:
    return {"message": "Hello from Altamash"}


@app.post("/greeting")
async def post_greeting(name: str) -> dict[str, str]:
    return {"message": f"Hello {name}!"}


@app.get("/products")
async def get_products() -> list[Product]:
    global PRODUCTS

    return PRODUCTS.values()


@app.post("/orders")
async def add_order(cart: Cart) -> Order:
    global PRODUCTS, DELIVERY_OPTIONS, ORDERS

    products = []
    product_prices_before_tax = []
    for item in cart.cart:
        estimated_delivery_time = datetime.now(timezone.utc) + timedelta(
            days=DELIVERY_OPTIONS[item.deliveryOptionId].deliveryDays
        )
        products.append(
            OrderProductDetails(
                productId=item.productId,
                quantity=item.quantity,
                estimatedDeliveryTime=estimated_delivery_time.isoformat().replace(
                    "+00:00", "Z"
                ),
            )
        )
        product_prices_before_tax.append(
            calculate_product_price(
                item.quantity,
                PRODUCTS[item.productId].priceCents,
                DELIVERY_OPTIONS[item.deliveryOptionId].priceCents,
            )
        )

    order = Order(
        id=str(uuid.uuid4()),
        orderTime=datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        totalCostCents=calculate_total_price(product_prices_before_tax),
        products=products,
    )
    ORDERS.append(order)
    write_orders(ORDERS)

    return order


@app.get("/orders")
async def get_orders() -> list[Order]:
    global ORDERS

    return ORDERS


@app.get("/orders/count")
async def count_orders() -> int:
    global ORDERS

    return len(ORDERS)


@app.delete("/orders")
async def delete_orders() -> dict[str, str]:
    global ORDERS

    old_order_count = len(ORDERS)

    ORDERS = []
    write_orders(ORDERS)

    return {
        "message": f"Deleted existing order! Old count: {old_order_count}. New count = {len(ORDERS)}"
    }


@app.get("/cart")
async def get_cart() -> str:
    return "load cart"
