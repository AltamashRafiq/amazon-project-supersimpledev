import { isValidDeliveryOption } from "./deliveryOptions.js";

export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity = 1) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    if (!isValidDeliveryOption(deliveryOptionId)) {
      console.log(`Invalid deliveryOptionId provided: ${deliveryOptionId}`);
      return;
    }

    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
        matchingItem.deliveryOptionId = deliveryOptionId;
      }
    });

    if (matchingItem) {
      this.saveToStorage();
    }
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem["quantity"] = newQuantity;
      }
    });

    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  resetCart() {
    this.cartItems = [];

    this.saveToStorage();
  }
}

export function updateCartQuantity() {
  document.querySelector(".js-cart-quantity").innerHTML =
    cart.calculateCartQuantity();
}

export const cart = new Cart("cart");
export async function loadCartFetch() {
  const promise = fetch("http://127.0.0.1:8000/cart")
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      console.log(text);
    });

  return promise;
}
