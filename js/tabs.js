const tabBtns = document.querySelectorAll('.faq__tabs-btn');
const tabPanels = document.querySelectorAll('.faq__tabs-content');

function activateTab(index) {
  tabBtns.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
  tabPanels.forEach((panel, i) => {
    panel.classList.toggle('active', i === index);
  });
}

tabBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => activateTab(i));
});

// старт — первый таб активный
if (tabBtns.length && tabPanels.length) activateTab(0);
