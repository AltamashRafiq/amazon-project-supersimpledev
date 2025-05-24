import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

import { updateCartQuantity } from "../data/cart-class.js";
import { orders, loadOrdersFetch } from "../data/orders.js";
import { products, loadProductsFetch } from "../data/products.js";
import { stringISOToDayJS } from "./utils/date.js";
import { calculatPercentageProgress } from "./utils/progressBar.js";
import { addSearchBarEventListeners } from "./utils/searchBar.js";

function renderTrackingPage() {
  const url = new URL(window.location.href);

  const order = orders.find(
    (order) => order.id === url.searchParams.get("orderId")
  );
  const product = products.find(
    (product) => product.id === url.searchParams.get("productId")
  );
  const productOrderDetails = order.products.find(
    (product) => product.productId === url.searchParams.get("productId")
  );

  const currentTimeString = stringISOToDayJS(dayjs());
  const orderTimeString = order.orderTime;
  const deliveryTimeString = productOrderDetails.estimatedDeliveryTime;
  const progressBarWidth =
    100 *
    calculatPercentageProgress(
      currentTimeString,
      orderTimeString,
      deliveryTimeString
    );

  let trackingHTMl = `
    <div class="delivery-date">Arriving on ${stringISOToDayJS(
      productOrderDetails.estimatedDeliveryTime
    ).format("dddd, MMM DD")}</div>
    <div class="product-info">${product.name}</div>

    <div class="product-info">Quantity: ${productOrderDetails.quantity}</div>

    <img
      class="product-image"
      src="${product.image}"
    />

    <div class="progress-labels-container">
      <div class="progress-label js-progress-label-preparing">Preparing</div>
      <div class="progress-label js-progress-label-shipped">Shipped</div>
      <div class="progress-label js-progress-label-delivered">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progressBarWidth}%;"></div>
    </div>
  `;

  updateCartQuantity();
  document.querySelector(".js-order-tracking").innerHTML = trackingHTMl;

  let shippingStatus;
  if (progressBarWidth < 50) {
    shippingStatus = "preparing";
  } else if (progressBarWidth < 100) {
    shippingStatus = "shipped";
  } else {
    shippingStatus = "delivered";
  }
  document
    .querySelector(`.js-progress-label-${shippingStatus}`)
    .classList.add("current-status");
}

async function loadPage() {
  try {
    await loadProductsFetch();
    await loadOrdersFetch();
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }

  renderTrackingPage();
  addSearchBarEventListeners();
}

loadPage();
