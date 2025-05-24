import { cart, updateCartQuantity } from "../data/cart-class.js";
import { products, loadProductsFetch } from "../data/products.js";
import {
  addSearchBarEventListeners,
  filterProduct,
} from "./utils/searchBar.js";

loadProductsFetch().then(() => {
  renderProductsGrid();
  addSearchBarEventListeners();
});

function renderProductsGrid() {
  const url = new URL(window.location.href);
  let search = url.searchParams.get("search");

  let productsHTML = "";
  products.forEach((product) => {
    if (filterProduct(search, product)) {
      return;
    }

    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
      </div>

      <div class="product-price">${product.getPrice()}</div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${
          product.id
        }" name="quantity-selector">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart js-added-to-cart-${
        product.id
      }">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
        product.id
      }">
      Add to Cart
      </button>
    </div>
    `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;
  updateCartQuantity();

  let timeoutMap = {};
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      const quantity = Number(
        document.querySelector(`.js-quantity-selector-${productId}`).value
      );

      cart.addToCart(productId, quantity);
      updateCartQuantity();
      displayAddedPopup(productId, timeoutMap);
    });
  });
}

function displayAddedPopup(productId, timeoutMap) {
  if (timeoutMap[productId]) {
    clearTimeout(timeoutMap[productId]);
  }

  document
    .querySelector(`.js-added-to-cart-${productId}`)
    .classList.add("added-to-cart-popped");

  timeoutMap[productId] = setTimeout(() => {
    document
      .querySelector(`.js-added-to-cart-${productId}`)
      .classList.remove("added-to-cart-popped");
  }, 2000);
}
