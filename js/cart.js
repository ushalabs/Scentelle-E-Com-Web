function cartTotals() {
  const subtotal = getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 10000 ? 0 : 500;
  const promo = localStorage.getItem(PROMO_KEY);
  const discount = promo === "SCENT10" ? Math.round(subtotal * 0.1) : 0;
  return { subtotal, delivery, discount, total: subtotal + delivery - discount };
}

function renderCart() {
  const list = document.querySelector("[data-cart-list]");
  const summary = document.querySelector("[data-cart-summary]");
  if (!list || !summary) return;

  const cart = getCart();
  if (!cart.length) {
    list.innerHTML = `<div class="empty-state"><h3>Your cart is empty</h3><p>Explore our fragrances and add your favorites.</p><a class="btn dark" href="shop.html">Continue Shopping</a></div>`;
  } else {
    list.innerHTML = cart.map((item) => `
      <article class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p class="muted">Size: ${item.size}</p>
          <p class="price">${formatPrice(item.price)}</p>
        </div>
        <div class="quantity-control">
          <button data-cart-dec="${item.key}" type="button">-</button>
          <span>${item.quantity}</span>
          <button data-cart-inc="${item.key}" type="button">+</button>
        </div>
        <button class="remove" data-cart-remove="${item.key}" type="button">Remove</button>
      </article>
    `).join("");
  }

  const totals = cartTotals();
  summary.innerHTML = `
    <div><span>Subtotal</span><strong>${formatPrice(totals.subtotal)}</strong></div>
    <div><span>Delivery</span><strong>${totals.delivery ? formatPrice(totals.delivery) : "Free"}</strong></div>
    <div><span>Discount</span><strong>-${formatPrice(totals.discount)}</strong></div>
    <div class="summary-total"><span>Total</span><strong>${formatPrice(totals.total)}</strong></div>
  `;

  list.querySelectorAll("[data-cart-inc]").forEach((button) => {
    button.addEventListener("click", () => updateItem(button.dataset.cartInc, 1));
  });
  list.querySelectorAll("[data-cart-dec]").forEach((button) => {
    button.addEventListener("click", () => updateItem(button.dataset.cartDec, -1));
  });
  list.querySelectorAll("[data-cart-remove]").forEach((button) => {
    button.addEventListener("click", () => removeItem(button.dataset.cartRemove));
  });
}

function updateItem(key, change) {
  const cart = getCart().map((item) => item.key === key ? { ...item, quantity: Math.max(1, item.quantity + change) } : item);
  saveCart(cart);
  renderCart();
}

function removeItem(key) {
  saveCart(getCart().filter((item) => item.key !== key));
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  const promoForm = document.querySelector("[data-promo-form]");
  if (!promoForm) return;
  const promoInput = promoForm.querySelector("input");
  promoInput.value = localStorage.getItem(PROMO_KEY) || "";
  promoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = promoInput.value.trim().toUpperCase();
    if (code === "SCENT10") {
      localStorage.setItem(PROMO_KEY, code);
      showToast("Promo code applied");
      renderCart();
    } else {
      localStorage.removeItem(PROMO_KEY);
      showToast("Invalid promo code", "error");
      renderCart();
    }
  });
});
