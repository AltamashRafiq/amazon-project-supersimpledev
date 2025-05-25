def calculate_product_price(quantity: int, price: int, shipping: int) -> int:
    return (quantity * price) + shipping


def calculate_total_price(product_prices_before_tax: list[int], tax: float = 0.1) -> int:
    price_before_tax = sum(product_prices_before_tax)
    price_after_tax = int(tax * price_before_tax + price_before_tax)

    return price_after_tax
