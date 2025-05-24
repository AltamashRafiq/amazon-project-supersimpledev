import { Cart } from "../../data/cart-class.js";

describe("Test suite: add to cart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("adds an existing product to the cart", () => {
    const cart = new Cart("cart-oop");
    cart.cartItems = [
      {
        productId: "id-altamamushy-happy",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.addToCart("id-altamamushy-happy");
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual("id-altamamushy-happy");
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify(cart.cartItems)
    );
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    const cart = new Cart("cart-oop");
    cart.cartItems = [];

    cart.addToCart("id-altamamushy-happy");
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual("id-altamamushy-happy");
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify(cart.cartItems)
    );
  });
});

describe("Test suite: remove from cart", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  const cart = new Cart("cart-oop");

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    cart.cartItems = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  });

  it("removes a productId that is in the cart", () => {
    cart.removeFromCart(productId1);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify(cart.cartItems)
    );
  });

  it("removes a productId that is not in the cart", () => {
    const productId3 = "bla";

    expect(cart.cartItems.length).toEqual(2);
    const originalCartJSON = JSON.stringify(cart.cartItems);

    cart.removeFromCart(productId3);
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].id).not.toEqual(productId3);
    expect(cart.cartItems[1].id).not.toEqual(productId3);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      originalCartJSON
    );
  });
});

describe("Test suite: update delivery option", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  const cart = new Cart("cart-oop");

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    cart.cartItems = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  });

  it("updates the delivery option of a product in the cart", () => {
    cart.updateDeliveryOption(productId1, "3");

    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("3");
    expect(cart.cartItems[1].productId).toEqual(productId2);
    expect(cart.cartItems[1].deliveryOptionId).toEqual("2");
    expect(cart.cartItems.length).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify(cart.cartItems)
    );
  });

  it("does not update if productId not in cart", () => {
    const originalCartJSON = JSON.stringify(cart.cartItems);
    const productId3 = "bla";

    cart.updateDeliveryOption(productId3, "3");

    expect(JSON.stringify(cart.cartItems)).toEqual(originalCartJSON);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("does not update if deliveryOptionId does not exist", () => {
    const originalCartJSON = JSON.stringify(cart.cartItems);
    const deliveryOptionId = "10";

    cart.updateDeliveryOption(productId1, deliveryOptionId);

    expect(JSON.stringify(cart.cartItems)).toEqual(originalCartJSON);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("resets the cart correctly", () => {
    const originalCartJSON = JSON.stringify(cart.cartItems);
    expect(JSON.stringify(cart.cartItems)).toEqual(originalCartJSON);

    cart.resetCart();
    expect(JSON.stringify(cart.cartItems)).toEqual("[]");
  });
});
