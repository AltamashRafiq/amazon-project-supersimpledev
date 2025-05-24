import { orders, loadOrdersFetch } from "../data/orders.js";
import { cart, updateCartQuantity } from "../data/cart-class.js";
import { products, loadProductsFetch } from "../data/products.js";
import { stringISOToDayJS } from "./utils/date.js";
import { addSearchBarEventListeners } from "./utils/searchBar.js";

function renderOrderProductDetails(product, orderProductDetails, orderId) {
  let productHTML = `
    <div class="product-image-container">
      <img src="${product.image}" />
    </div>

    <div class="product-details">
      <div class="product-name">${product.name}</div>
      <div class="product-delivery-date">Arriving on: ${stringISOToDayJS(
        orderProductDetails.estimatedDeliveryTime
      ).format("M dd")}</div>
      <div class="product-quantity">Quantity: ${
        orderProductDetails.quantity
      }</div>
      <button class="buy-again-button button-primary js-buy-again-button" data-product-id=${
        product.id
      }>
        <img class="buy-again-icon" src="images/icons/buy-again.png" />
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=${orderId}&productId=${product.id}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
  `;

  return productHTML;
}

function renderOrderProducts(orderProducts, orderId) {
  let productsHTML = "";
  orderProducts.forEach((orderProduct) => {
    const matchingProduct = products.find(
      (product) => product.id === orderProduct.productId
    );
    productsHTML += renderOrderProductDetails(
      matchingProduct,
      orderProduct,
      orderId
    );
  });

  return productsHTML;
}

function renderOrders() {
  let orderHTML = "";
  orders.forEach((order) => {
    orderHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${stringISOToDayJS(order.orderTime).format("MMMM d")}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$35.06</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${renderOrderProducts(order.products, order.id)}
      </div>
    </div>
    `;
  });

  document.querySelector(".js-order-grid").innerHTML = orderHTML;
  document.querySelectorAll(".js-buy-again-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      cart.addToCart(productId, 1);
      updateCartQuantity();
    });
  });
}

async function loadPage() {
  try {
    await loadProductsFetch();
    await loadOrdersFetch();
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }

  updateCartQuantity();
  renderOrders();
  addSearchBarEventListeners();
}
loadPage();
