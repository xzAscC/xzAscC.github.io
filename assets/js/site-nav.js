// Close the phone menu with Escape, or when something outside it is pressed or activated.
const menu = document.querySelector(".site-nav__menu");

if (menu) {
  const closeIfOutside = (event) => {
    if (menu.open && !menu.contains(event.target)) {
      menu.open = false;
    }
  };

  // Both events: iOS Safari sends no click for a tap on plain text or empty space,
  // and a keyboard or assistive-technology activation sends a click with no pointerdown.
  document.addEventListener("pointerdown", closeIfOutside);
  document.addEventListener("click", closeIfOutside);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
}
