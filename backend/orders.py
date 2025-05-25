import json
import os

from models import Order

ORDERS_FILE = "./data/orders.json"


def write_orders(orders: list[Order]) -> None:
    with open(ORDERS_FILE, "w") as f:
        json.dump([order.model_dump() for order in orders], f)


def read_orders() -> list[Order]:
    if not os.path.exists(ORDERS_FILE):
        write_orders([])
        return []

    with open(ORDERS_FILE, "r") as f:
        orders = [Order(**order) for order in json.load(f)]
        return orders
