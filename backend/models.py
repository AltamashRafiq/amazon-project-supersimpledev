from pydantic import BaseModel


class OrderProductDetails(BaseModel):
    productId: str
    quantity: int
    estimatedDeliveryTime: str


class Order(BaseModel):
    id: str
    orderTime: str
    totalCostCents: int
    products: list[OrderProductDetails]


class CartItem(BaseModel):
    productId: str
    quantity: int
    deliveryOptionId: str


class Cart(BaseModel):
    cart: list[CartItem]


class Rating(BaseModel):
    stars: float
    count: int


class Product(BaseModel):
    id: str
    image: str
    name: str
    rating: Rating
    priceCents: int
    keywords: list[str]
    type: str | None = None
    sizeChartLink: str | None = None


class DeliveryOption(BaseModel):
    id: str
    deliveryDays: int
    priceCents: int
