onProductsReady(() => {
  const detail = document.querySelector("[data-product-detail]");
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id")) || PRODUCTS[0];
  let selectedSize = "50ml";
  let quantity = 1;

  document.title = `${product.name} | Scentelle`;
  detail.innerHTML = `
    <div class="detail-media">
      <img class="detail-image" src="${product.image}" alt="${product.name}">
      <div class="thumb-row">
        <img src="${product.image}" alt="${product.name} front">
        <img src="${product.image}" alt="${product.name} side">
        <img src="${product.image}" alt="${product.name} box">
      </div>
    </div>
    <div class="detail-copy">
      <p class="eyebrow">${product.gender} / ${product.type}</p>
      <h1>${product.name}</h1>
      <div class="rating">${stars(product.rating)} <span class="muted">(42 reviews)</span></div>
      <p class="detail-price">${formatPrice(product.price)}</p>
      <p><strong>Fragrance Type:</strong> ${product.type}</p>
      <p><strong>Stock:</strong> In Stock</p>
      <p class="lead">${product.description}</p>
      <div class="option-block">
        <h3>Size</h3>
        <div class="size-options">
          <button class="size active" data-size="50ml" type="button">50ml</button>
          <button class="size" data-size="75ml" type="button">75ml</button>
          <button class="size" data-size="100ml" type="button">100ml</button>
        </div>
      </div>
      <div class="option-block">
        <h3>Quantity</h3>
        <div class="quantity-control">
          <button data-qty="minus" type="button">-</button>
          <span data-qty-value>1</span>
          <button data-qty="plus" type="button">+</button>
        </div>
      </div>
      <button class="btn dark wide" data-detail-cart type="button">Add to Cart</button>
    </div>
  `;

  detail.querySelectorAll("[data-size]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.size;
      detail.querySelectorAll("[data-size]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  detail.querySelectorAll("[data-qty]").forEach((button) => {
    button.addEventListener("click", () => {
      quantity = button.dataset.qty === "plus" ? quantity + 1 : Math.max(1, quantity - 1);
      detail.querySelector("[data-qty-value]").textContent = quantity;
    });
  });

  detail.querySelector("[data-detail-cart]").addEventListener("click", () => {
    addToCart(product.id, selectedSize, quantity);
  });

  document.querySelector("[data-notes]").innerHTML = `
    <article><h3>Top Notes</h3><p>${product.topNotes.join(", ")}</p></article>
    <article><h3>Heart Notes</h3><p>${product.heartNotes.join(", ")}</p></article>
    <article><h3>Base Notes</h3><p>${product.baseNotes.join(", ")}</p></article>
  `;

  const related = PRODUCTS.filter((item) => item.id !== product.id && item.gender === product.gender).slice(0, 4);
  document.querySelector("[data-related]").innerHTML = related.map((item) => productCard(item, { viewButton: false })).join("");
  bindAddToCart(document.querySelector("[data-related]"));
});
