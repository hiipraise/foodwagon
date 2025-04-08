document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("sflBtn");
  const menuBar = document.getElementById("menuBar");
  const menuTime = document.getElementById("menuTime");

  menuBar.addEventListener("click", () => {
    menu.classList.add("show");
    menuBar.classList.add("hidden");
    menuTime.classList.remove("hidden");
  });

  menuTime.addEventListener("click", () => {
    menu.classList.remove("show");
    menuBar.classList.remove("hidden");
    menuTime.classList.add("hidden");
  });
});
