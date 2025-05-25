const defaultOrders = [];

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
