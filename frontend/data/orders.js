const defaultOrders = [
  {
    id: "0e3713e6-209f-4bef-a3e2-ca267ad830ea",
    orderTime: "2024-02-27T20:57:02.235Z",
    totalCostCents: 5800,
    products: [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        estimatedDeliveryTime: "2024-03-01T20:57:02.235Z",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        estimatedDeliveryTime: "2024-03-01T20:57:02.235Z",
      },
    ],
  },
  {
    id: "111244622",
    orderTime: "2024-08-28T20:57:02.235Z",
    totalCostCents: 4000000,
    products: [
      {
        productId: "altamash-tag-here",
        quantity: 2,
        estimatedDeliveryTime: "2024-09-01T20:57:02.235Z",
      },
      {
        productId: "ammara-tag-here",
        quantity: 3,
        estimatedDeliveryTime: "2024-09-05T20:57:02.235Z",
      },
    ],
  },
];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export let orders = JSON.parse(localStorage.getItem("orders"));
export async function loadOrdersFetch() {
  if (!orders) {
    console.log("Fetched orders");
    const promise = fetch("http://127.0.0.1:8000/orders")
      .then((response) => {
        return response.json();
      })
      .then((fetchedOrders) => {
        if (fetchedOrders.length === 0) {
          orders = defaultOrders;
        } else {
          orders = fetchedOrders;
        }
        saveToStorage();
      });
    return promise;
  } else {
    console.log("Orders read from local storage");
  }
}
