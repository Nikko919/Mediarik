// раскрывающий список у усоуг
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".services__menu-btn-box");
  const menu = document.querySelector(".services__menu-list");

  btn.addEventListener("click", function () {
    menu.classList.toggle("active");
    btn.classList.toggle("open");
  });
});

// код для intro
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".intro__menu-btn-box");
  const menu = document.querySelector(".intro__menu-list");
  const title = document.querySelector(".intro__menu-title");
  const links = document.querySelectorAll(".intro__menu-link");

  // открытие/закрытие списка
  btn.addEventListener("click", function () {
    menu.classList.toggle("active");
    btn.classList.toggle("open");
  });

  // определить текущую страницу
  const currentPath = window.location.pathname;
  let activeSet = false;

  links.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      title.textContent = link.textContent;
      link.classList.add("isactive");
      title.classList.add("isactive"); // 👈 добавляем к .intro__menu-title
      activeSet = true;
    }

    // обработка клика
    link.addEventListener("click", function () {
      // снять активность со всех ссылок
      links.forEach(l => l.classList.remove("isactive"));

      // назначить текущему
      this.classList.add("isactive");

      // обновить заголовок
      title.textContent = this.textContent;
      title.classList.add("isactive"); // 👈 ставим класс на title

      // закрыть меню
      menu.classList.remove("active");
      btn.classList.remove("open");
    });
  });

  // если совпадений нет — дефолт без isactive
  if (!activeSet) {
    title.textContent = "Выбрать услугу";
    title.classList.remove("isactive");
  }
});





// (function () {
//   const box = document.querySelector('.intro-column__img-box');
//   if (!box) return;

//   const satellites = Array.from(box.querySelectorAll('.intro-column__img-position'));
//   const PUSH = 60; // сила разлёта (px) — подстрой

//   function reset(except) {
//     satellites.forEach(img => {
//       if (img !== except) {
//         img.style.translate = '0px 0px';
//       }
//     });
//     if (except) {
//       except.style.translate = '0px 0px';
//     }
//   }

//   function onEnter(e) {
//     const hovered = e.currentTarget;

//     const boxRect = box.getBoundingClientRect();
//     const bh = boxRect.height;
//     const third = bh / 3;

//     const hRect = hovered.getBoundingClientRect();
//     const hy = hRect.top + hRect.height / 2;

//     const relY = hy - boxRect.top;
//     let zone = 'middle';
//     if (relY < third) zone = 'top';
//     else if (relY > 2 * third) zone = 'bottom';

//     satellites.forEach(img => {
//       if (img === hovered) return;

//       const r = img.getBoundingClientRect();
//       const sx = r.left + r.width / 2;
//       const sy = r.top + r.height / 2;

//       let dx = 0, dy = 0;

//       if (zone === 'middle') {
//         // разлетаются от наведённой радиально
//         const vx = sx - (hRect.left + hRect.width / 2);
//         const vy = sy - (hRect.top + hRect.height / 2);
//         const len = Math.hypot(vx, vy) || 1;
//         const k = PUSH / len;
//         dx = vx * k;
//         dy = vy * k;
//       } else if (zone === 'bottom') {
//         // все, кто выше наведённой — вверх; остальные слегка вниз
//         if (sy < hy) { dy = -PUSH; } else { dy = PUSH * 0.3; }
//       } else { // top
//         // все — вниз; те, кто ниже, можно сильнее
//         dy = sy > hy ? PUSH * 1.2 : PUSH;
//       }

//       img.style.translate = `${dx}px ${dy}px`;
//     });
//   }

//   function onLeave() {
//     reset(null);
//   }

//   satellites.forEach(img => {
//     img.addEventListener('mouseenter', onEnter);
//     img.addEventListener('mouseleave', onLeave);
//     // для тача:
//     img.addEventListener('touchstart', onEnter, { passive: true });
//     img.addEventListener('touchend', onLeave);
//   });
// })();




























// код для подставки  названия пакета тарифов



document.addEventListener("DOMContentLoaded", function () {
  // выбираем все кнопки внутри карточек
  const buttons = document.querySelectorAll(".advantages-btn.open-popup");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      // находим ближайшую карточку
      const card = button.closest(".card");
      // берем текст заголовка карточки
      const title = card.querySelector(".card__title").innerText;
      // находим поле "Пакет" в форме
      const packInput = document.querySelector(".popup__inputs input[name='pack']");
      // подставляем название пакета
      packInput.value = title;
    });
  });
});
