// раскрывающий список у усоуг
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".services__menu-btn-box");
  const menu = document.querySelector(".services__menu-list");

  btn.addEventListener("click", function () {
    menu.classList.toggle("active");
    btn.classList.toggle("open");
  });
});
