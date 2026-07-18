const root = document.documentElement;
let savedTheme;

try {
  savedTheme = localStorage.getItem("theme");
} catch (error) {
  console.warn("Could not read the saved theme.", error);
}

const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
root.dataset.theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : preferredTheme;

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

    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch (error) {
      console.warn("Could not save the theme.", error);
    }

    updateToggle();
  });
}
