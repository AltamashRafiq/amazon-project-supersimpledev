export function filterProduct(search, product) {
  if ((search !== null) & !product.name.toLowerCase().includes(search)) {
    let keywordFound = false;
    product.keywords.forEach((keyword) => {
      if (keyword.toLowerCase().includes(search)) {
        keywordFound = true;
      }
    });

    if (!keywordFound) return true;
  }

  return false;
}

export function addSearchBarEventListeners() {
  document
    .querySelector(".js-search-bar")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const search = document.querySelector(".js-search-bar").value;
        runSearchBar(search);
      }
    });

  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-bar").value;
    runSearchBar(search);
  });
}

function runSearchBar(search) {
  let amazonUrl = "http://127.0.0.1:5500/amazon.html";
  if (search) {
    const url = new URL(amazonUrl);
    const params = new URLSearchParams(url.search);
    params.set("search", search.replaceAll(" ", "_"));
    url.search = params.toString().toLowerCase();
    window.location.href = url.href;
  } else if (window.location.href == amazonUrl) {
    return;
  } else if (window.location.href.startsWith(amazonUrl)) {
    window.location.href = amazonUrl;
  } else {
    return;
  }
}
