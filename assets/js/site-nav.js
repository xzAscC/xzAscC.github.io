// Close the phone menu with Escape, or with a click or tap outside it.
const menu = document.querySelector(".site-nav__menu");

if (menu) {
  document.addEventListener("click", (event) => {
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
