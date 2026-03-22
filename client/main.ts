import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";
import { navigateTo } from "./app.js";

window.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();

  navigateTo("log");

  document.querySelectorAll<HTMLButtonElement>(".nav-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll<HTMLButtonElement>(".nav-button")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const view = btn.dataset.view;
      if (view) {
        navigateTo(view);
      }
    });
  });
});
