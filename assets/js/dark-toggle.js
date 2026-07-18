const root = document.documentElement;
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
let followsSystem = true;

try {
  const savedTheme = localStorage.getItem("theme");
  followsSystem = savedTheme !== "dark" && savedTheme !== "light";
} catch (error) {
  console.warn("Could not read the saved theme.", error);
}

if (root.dataset.theme !== "dark" && root.dataset.theme !== "light") {
  root.dataset.theme = colorScheme.matches ? "dark" : "light";
}

const toggle = document.querySelector("#theme-toggle");

if (toggle) {
  const updateToggle = () => {
    const isDark = root.dataset.theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  };

  updateToggle();
  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    followsSystem = false;

    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch (error) {
      console.warn("Could not save the theme.", error);
    }

    updateToggle();
  });

  colorScheme.addEventListener("change", (event) => {
    if (followsSystem) {
      root.dataset.theme = event.matches ? "dark" : "light";
      updateToggle();
    }
  });
}
