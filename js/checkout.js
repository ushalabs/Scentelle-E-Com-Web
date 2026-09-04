document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-checkout-form]");
  const summary = document.querySelector("[data-order-summary]");
  const success = document.querySelector("[data-order-success]");
  const cardFields = document.querySelector("[data-card-fields]");
  if (!form || !summary) return;

  function totals() {
    const subtotal = getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
    const delivery = subtotal === 0 || subtotal >= 10000 ? 0 : 500;
    const discount = localStorage.getItem(PROMO_KEY) === "SCENT10" ? Math.round(subtotal * 0.1) : 0;
    return { subtotal, delivery, discount, total: subtotal + delivery - discount };
  }

  function renderSummary() {
    const cart = getCart();
    const money = totals();
    summary.innerHTML = `
      <div class="summary-products">
        ${cart.length ? cart.map((item) => `<p><span>${item.name} (${item.size}) x ${item.quantity}</span><strong>${formatPrice(item.price * item.quantity)}</strong></p>`).join("") : "<p>Your cart is empty.</p>"}
      </div>
      <div><span>Subtotal</span><strong>${formatPrice(money.subtotal)}</strong></div>
      <div><span>Delivery</span><strong>${money.delivery ? formatPrice(money.delivery) : "Free"}</strong></div>
      <div><span>Discount</span><strong>-${formatPrice(money.discount)}</strong></div>
      <div class="summary-total"><span>Final Total</span><strong>${formatPrice(money.total)}</strong></div>
    `;
  }

  form.querySelectorAll('input[name="payment"]').forEach((input) => {
    input.addEventListener("change", () => {
      const selectedPayment = form.querySelector('input[name="payment"]:checked').value;
      cardFields.hidden = selectedPayment !== "card";
      cardFields.querySelectorAll("input").forEach((field) => {
        field.required = selectedPayment === "card";
      });
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cart = getCart();
    if (!cart.length) {
      showToast("Your cart is empty", "error");
      return;
    }
    if (!form.checkValidity()) {
      showToast("Please complete all required fields", "error");
      form.reportValidity();
      return;
    }

    const selectedPayment = form.querySelector('input[name="payment"]:checked').value;

    try {
      const data = await apiPost("api/order.php", {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        address: form.address.value.trim(),
        city: form.city.value.trim(),
        province: form.province.value,
        postalCode: form.postalCode.value.trim(),
        paymentMethod: selectedPayment === "card" ? "Credit / Debit Card" : "Cash on Delivery",
        promoCode: localStorage.getItem(PROMO_KEY) || "",
        cart
      });

      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(PROMO_KEY);
      updateCartCount();
      form.hidden = true;
      summary.closest(".summary-box").hidden = true;
      document.querySelector(".checkout-layout").classList.add("success-mode");
      success.hidden = false;
      success.querySelector("[data-order-number]").textContent = data.orderNumber;
    } catch (error) {
      showToast(error.message, "error");
    }
  });

  renderSummary();
});
