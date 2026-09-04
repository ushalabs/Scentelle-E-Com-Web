const CART_KEY = "scentelleCart";
const PROMO_KEY = "scentellePromo";

function formatPrice(price) {
  return `Rs. ${Number(price).toLocaleString("en-PK")}`;
}

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
  });
}

function showToast(message, type = "success") {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove("show"), 2600);
}

async function apiPost(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({ success: false, message: "Server response was not valid JSON." }));
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Request failed.");
  }
  return data;
}

function redirectAfterLogin() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");
  window.location.href = next && next !== "login.html" ? next : "index.html";
}

function addToCart(productId, size = "50ml", quantity = 1) {
  const product = getProductById(productId);
  if (!product) return;
  const cart = getCart();
  const key = `${product.id}-${size}`;
  const existing = cart.find((item) => item.key === key);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      key,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      quantity
    });
  }

  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function stars(rating) {
  return `<span class="stars" aria-label="${rating} out of 5 stars">*****</span> <span>${rating}</span>`;
}

function productCard(product, options = {}) {
  const viewButton = options.viewButton !== false;
  return `
    <article class="product-card">
      <button class="wish-button" type="button" aria-label="Add ${product.name} to wishlist">♡</button>
      <a class="product-image" href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <div class="product-info">
        <p class="eyebrow">${product.gender} / ${product.type}</p>
        <h3>${product.name}</h3>
        <div class="rating">${stars(product.rating)}</div>
        <p class="price">${formatPrice(product.price)}</p>
        <div class="card-actions">
          <button class="btn dark" data-add-cart="${product.id}" type="button">Add to Cart</button>
          ${viewButton ? `<a class="btn light" href="product.html?id=${product.id}">View Product</a>` : ""}
        </div>
      </div>
    </article>
  `;
}

function bindAddToCart(scope = document) {
  scope.querySelectorAll("[data-add-cart]").forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.addCart));
  });
}

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("open");
  });
}

function initSearchIcon() {
  document.querySelectorAll("[data-search-link]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "shop.html#search";
    });
  });
}

function initNewsletter() {
  const form = document.querySelector("[data-newsletter]");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.querySelector("input").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    try {
      const data = await apiPost("api/newsletter.php", { email });
      form.reset();
      showToast(data.message);
    } catch (error) {
      showToast(error.message, "error");
    }
  });
}

function initHomeProducts() {
  const grid = document.querySelector("[data-featured-products]");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.slice(0, 8).map((product) => productCard(product, { viewButton: false })).join("");
  bindAddToCart(grid);
}

function initLoginForms() {
  const page = document.querySelector("[data-auth-page]");
  if (!page) return;
  const tabs = page.querySelectorAll("[data-auth-tab]");
  const panels = page.querySelectorAll("[data-auth-panel]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      page.querySelector(`[data-auth-panel="${tab.dataset.authTab}"]`).classList.add("active");
    });
  });

  const loginForm = page.querySelector("[data-login-form]");
  page.querySelector("[data-forgot-password]").addEventListener("click", () => {
    showToast("Password reset is a frontend demo feature");
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) {
      showToast("Enter a valid email and password", "error");
      return;
    }
    try {
      const data = await apiPost("api/auth.php", { action: "login", email, password });
      localStorage.setItem("scentelleUser", JSON.stringify(data.user));
      showToast(data.message);
      setTimeout(redirectAfterLogin, 500);
    } catch (error) {
      showToast(error.message, "error");
    }
  });

  const signupForm = page.querySelector("[data-signup-form]");
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fullName = signupForm.fullName.value.trim();
    const email = signupForm.email.value.trim();
    const password = signupForm.password.value;
    const confirm = signupForm.confirmPassword.value;
    if (!fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter your name and a valid email", "error");
      return;
    }
    if (password.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }
    if (password !== confirm) {
      showToast("Passwords do not match", "error");
      return;
    }
    try {
      const data = await apiPost("api/auth.php", { action: "signup", fullName, email, password });
      localStorage.setItem("scentelleUser", JSON.stringify(data.user));
      signupForm.reset();
      showToast(data.message);
      setTimeout(redirectAfterLogin, 500);
    } catch (error) {
      showToast(error.message, "error");
    }
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = Array.from(form.querySelectorAll("input, textarea")).map((field) => field.value.trim());
    if (values.some((value) => !value) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value)) {
      showToast("Please complete the contact form correctly", "error");
      return;
    }
    try {
      const data = await apiPost("api/contact.php", {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim()
      });
      form.reset();
      showToast(data.message);
    } catch (error) {
      showToast(error.message, "error");
    }
  });
}

onProductsReady(() => {
  updateCartCount();
  initMobileMenu();
  initSearchIcon();
  initNewsletter();
  initHomeProducts();
  initLoginForms();
  initContactForm();
});
