(function () {
  const isLoginPage = window.location.pathname.toLowerCase().endsWith("login.html");

  if (!isLoginPage) {
    document.documentElement.classList.add("auth-checking");
  }

  async function fetchSession() {
    try {
      const response = await fetch("api/session.php", { credentials: "same-origin" });
      const data = await response.json();
      return response.ok && data.success && data.authenticated ? data.user : null;
    } catch (error) {
      return null;
    }
  }

  function sendToLogin() {
    localStorage.removeItem("scentelleUser");
    const currentPage = window.location.pathname.split("/").pop() + window.location.search + window.location.hash;
    window.location.replace(`login.html?next=${encodeURIComponent(currentPage)}`);
  }

  async function logout() {
    try {
      await fetch("api/logout.php", { method: "POST", credentials: "same-origin" });
    } catch (error) {
      // The local browser state is cleared even if the server is unreachable.
    }
    localStorage.removeItem("scentelleUser");
    window.location.replace("login.html");
  }

  window.ScentelleAuth = {
    fetchSession,
    logout
  };

  document.addEventListener("DOMContentLoaded", async () => {
    const user = await fetchSession();

    if (!isLoginPage && !user) {
      sendToLogin();
      return;
    }

    if (!isLoginPage && user) {
      localStorage.setItem("scentelleUser", JSON.stringify(user));
      document.querySelectorAll("[data-user-name]").forEach((el) => {
        el.textContent = user.fullName || user.email;
      });
      document.querySelectorAll("[data-logout]").forEach((button) => {
        button.addEventListener("click", logout);
      });
      document.documentElement.classList.remove("auth-checking");
    }

    if (isLoginPage && user) {
      window.location.replace("index.html");
    }
  });
})();
