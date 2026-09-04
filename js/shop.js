onProductsReady(() => {
  const grid = document.querySelector("[data-shop-grid]");
  if (!grid) return;

  const genderFilter = document.querySelector("#genderFilter");
  const typeFilter = document.querySelector("#typeFilter");
  const priceFilter = document.querySelector("#priceFilter");
  const sortFilter = document.querySelector("#sortFilter");
  const searchInput = document.querySelector("#productSearch");
  const countLabel = document.querySelector("[data-result-count]");

  const params = new URLSearchParams(window.location.search);
  if (params.get("gender")) genderFilter.value = params.get("gender");
  if (window.location.hash === "#search") searchInput.focus();

  function priceMatches(product) {
    const value = priceFilter.value;
    if (value === "under-8000") return product.price < 8000;
    if (value === "8000-12000") return product.price >= 8000 && product.price <= 12000;
    if (value === "12000-16000") return product.price > 12000 && product.price <= 16000;
    if (value === "above-16000") return product.price > 16000;
    return true;
  }

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    let items = PRODUCTS.filter((product) => {
      const genderOk = genderFilter.value === "All" || product.gender === genderFilter.value;
      const typeOk = typeFilter.value === "All" || product.type === typeFilter.value;
      const searchOk = product.name.toLowerCase().includes(query);
      return genderOk && typeOk && priceMatches(product) && searchOk;
    });

    if (sortFilter.value === "low") items.sort((a, b) => a.price - b.price);
    if (sortFilter.value === "high") items.sort((a, b) => b.price - a.price);
    if (sortFilter.value === "rated") items.sort((a, b) => b.rating - a.rating);

    countLabel.textContent = `${items.length} perfumes found`;
    grid.innerHTML = items.length
      ? items.map((product) => productCard(product)).join("")
      : `<div class="empty-state"><h3>No perfumes found</h3><p>Try changing your filters or search term.</p></div>`;
    bindAddToCart(grid);
  }

  [genderFilter, typeFilter, priceFilter, sortFilter, searchInput].forEach((control) => {
    control.addEventListener("input", render);
  });

  render();
});
