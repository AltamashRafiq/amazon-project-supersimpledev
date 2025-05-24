import { Product } from "../../data/products.js";

describe("Test suite: Product", () => {
  const product = new Product({
    id: "id-altamamushy-happy",
    image: "images/products/altamash.jpg",
    name: "Altamushy",
    rating: {
      stars: 5,
      count: 127938,
    },
    priceCents: 1005,
    keywords: ["cutie", "handsome", "lovable", "mens"],
  });

  it("prints correct price", () => {
    expect(product.getPrice()).toEqual("$10.05");
  });

  it("does not print extra info", () => {
    expect(product.extraInfoHTML()).toEqual("");
  });
});
