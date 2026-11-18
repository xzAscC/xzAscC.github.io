// Close the phone menu with Escape, or with a press outside it.
// pointerdown, not click: iOS Safari sends no click for a tap on plain text or empty space.
const menu = document.querySelector(".site-nav__menu");

if (menu) {
  document.addEventListener("pointerdown", (event) => {
    if (menu.open && !menu.contains(event.target)) {
      menu.open = false;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
}
