// появление  меню
// document.addEventListener("DOMContentLoaded", () => {
//   const btn = document.querySelector(".form-output__btn");
//   const list = document.querySelector(".form-output__list");
//   const title = document.querySelector(".form-output-title");

//   // переключение меню
//   btn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     btn.classList.toggle("active");
//   });

//   // выбор пункта
//   list.querySelectorAll(".form-output__item").forEach(item => {
//     item.addEventListener("click", (e) => {
//       e.stopPropagation();
//       title.textContent = item.textContent;
//       btn.classList.remove("active");
//     });
//   });

//   // клик вне — закрыть
//   document.addEventListener("click", () => {
//     btn.classList.remove("active");
//   });
// });


// // появление  меню
// document.addEventListener("DOMContentLoaded", () => {
//   const btn = document.querySelector(".form-output__btn");
//   const list = document.querySelector(".form-output__list");
//   const title = document.querySelector(".form-output-title");
//   const input = document.getElementById("deliveryType"); // 🔹 скрытый input

//   // переключение меню
//   btn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     btn.classList.toggle("active");
//   });

//   // выбор пункта
//   list.querySelectorAll(".form-output__item").forEach(item => {
//     item.addEventListener("click", (e) => {
//       e.stopPropagation();

//       // меняем текст кнопки
//       title.textContent = item.textContent;

//       // 🔹 подставляем выбранное значение в hidden input
//       input.value = item.dataset.value || item.textContent;

//       btn.classList.remove("active");
//     });
//   });

//   // клик вне — закрыть
//   document.addEventListener("click", () => {
//     btn.classList.remove("active");
//   });
// });





// // увелечение клиентов

// document.addEventListener("DOMContentLoaded", function () {
//   const input = document.querySelector(".quantity-input");
//   const btnPlus = document.querySelector(".quantity-plus");
//   const btnMinus = document.querySelector(".quantity-minus");

//   btnPlus.addEventListener("click", () => {
//     let value = parseInt(input.value, 10);
//     input.value = value + 1000;
//   });

//   btnMinus.addEventListener("click", () => {
//     let value = parseInt(input.value, 10);
//     if (value > 1000) {
//       input.value = value - 1000;
//     }
//   });
// });


// // добавление цены динамически
// const input = document.getElementById("approximateInput");
// const priceEl = document.querySelector(".approximate__box-price");

// function sync() {
//   input.value = priceEl.textContent.trim();
// }

// // первичная установка
// sync();

// // следим за изменениями текста в .approximate__box-price
// const observer = new MutationObserver(sync);
// observer.observe(priceEl, { childList: true, characterData: true, subtree: true });














// рабочий код

// document.addEventListener("DOMContentLoaded", () => {
//   // элементы «Тип рассылки»
//   const btn = document.querySelector(".form-output__btn");
//   const list = document.querySelector(".form-output__list");
//   const title = document.querySelector(".form-output-title");
//   const deliveryTypeInput = document.getElementById("deliveryType");

//   // элементы «Количество»
//   const qtyInput = document.querySelector(".quantity-input");
//   const btnPlus = document.querySelector(".quantity-plus");
//   const btnMinus = document.querySelector(".quantity-minus");

//   // элементы «Ориентировочная стоимость»
//   const approxHidden = document.getElementById("approximateInput");
//   const approxText = document.querySelector(".approximate__box-price");

//   // текущее значение цены за единицу (из data-price)
//   let currentUnitPrice = 0; // станет числом после выбора типа рассылки

//   // форматирование числа с пробелами 1 234 567
//   const formatNumber = (n) =>
//     n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

//   // пересчёт и вывод
//   function calculateAndRender() {
//     const qty = parseInt(qtyInput.value, 10) || 0;
//     const total = currentUnitPrice * qty;

//     approxText.textContent = formatNumber(total);
//     // если нужно без пробелов — положи чистое число
//     approxHidden.value = total;
//   }

//   // --- раскрытие/закрытие меню
//   btn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     btn.classList.toggle("active");
//   });
//   document.addEventListener("click", () => btn.classList.remove("active"));

//   // --- выбор пункта меню
//   list.querySelectorAll(".form-output__item").forEach((item) => {
//     item.addEventListener("click", (e) => {
//       e.stopPropagation();

//       title.textContent = item.textContent.trim();
//       deliveryTypeInput.value = item.textContent.trim(); // пишем текст в hidden
//       currentUnitPrice = Number(item.dataset.price) || 0; // берём цену

//       btn.classList.remove("active");
//       calculateAndRender();
//     });
//   });

//   // --- количество (шаг 1000)
//   btnPlus.addEventListener("click", () => {
//     const value = parseInt(qtyInput.value, 10) || 0;
//     qtyInput.value = value + 1000;
//     calculateAndRender();
//   });

//   btnMinus.addEventListener("click", () => {
//     const value = parseInt(qtyInput.value, 10) || 0;
//     qtyInput.value = Math.max(1000, value - 1000);
//     calculateAndRender();
//   });

//   // первичная установка (если заранее задано значение в .approximate__box-price — перезапишется)
//   calculateAndRender();
// });




// самы рабочий

// document.addEventListener("DOMContentLoaded", () => {
//   // элементы «Тип рассылки»
//   const btn = document.querySelector(".form-output__btn");
//   const list = document.querySelector(".form-output__list");
//   const title = document.querySelector(".form-output-title");
//   const deliveryTypeInput = document.getElementById("deliveryType");

//   // элементы «Количество»
//   const qtyInput = document.querySelector(".quantity-input");
//   const btnPlus = document.querySelector(".quantity-plus");
//   const btnMinus = document.querySelector(".quantity-minus");

//   // элементы «Ориентировочная стоимость»
//   const approxHidden = document.getElementById("approximateInput");
//   const approxText = document.querySelector(".approximate__box-price");

//   // текущее значение цены за единицу (из data-price)
//   let currentUnitPrice = 0; // станет числом после выбора типа рассылки

//   // --- изначально блокируем кнопки количества ---
//   btnPlus.classList.add("disabled");
//   btnMinus.classList.add("disabled");

//   // форматирование числа с пробелами 1 234 567
//   const formatNumber = (n) =>
//     n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

//   // пересчёт и вывод
//   function calculateAndRender() {
//     const qty = parseInt(qtyInput.value, 10) || 0;
//     const total = currentUnitPrice * qty;

//     approxText.textContent = formatNumber(total);
//     approxHidden.value = total;
//   }

//   // --- раскрытие/закрытие меню ---
//   btn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     btn.classList.toggle("active");
//   });
//   document.addEventListener("click", () => btn.classList.remove("active"));

//   // --- выбор пункта меню ---
//   list.querySelectorAll(".form-output__item").forEach((item) => {
//     item.addEventListener("click", (e) => {
//       e.stopPropagation();

//       title.textContent = item.textContent.trim();
//       deliveryTypeInput.value = item.textContent.trim();
//       currentUnitPrice = Number(item.dataset.price) || 0;

//       btn.classList.remove("active");
//       calculateAndRender();

//       // включаем кнопки количества после выбора тарифа
//       btnPlus.classList.remove("disabled");
//       btnMinus.classList.remove("disabled");
//     });
//   });

//   // --- количество (шаг 1000) ---
//   btnPlus.addEventListener("click", () => {
//     if (currentUnitPrice === 0) return; // защита
//     const value = parseInt(qtyInput.value, 10) || 0;
//     qtyInput.value = value + 1000;
//     calculateAndRender();
//   });

//   btnMinus.addEventListener("click", () => {
//     if (currentUnitPrice === 0) return; // защита
//     const value = parseInt(qtyInput.value, 10) || 0;
//     qtyInput.value = Math.max(1000, value - 1000);
//     calculateAndRender();
//   });

//   // первичная установка
//   calculateAndRender();
// });

// самы рабочий  с попа окном

// document.addEventListener("DOMContentLoaded", () => {
//   // элементы «Тип рассылки»
//   const btn = document.querySelector(".form-output__btn");
//   const list = document.querySelector(".form-output__list");
//   const title = document.querySelector(".form-output-title");
//   const deliveryTypeInput = document.getElementById("deliveryType");

//   // элементы «Количество»
//   const qtyInput = document.querySelector(".quantity-input");
//   const btnPlus = document.querySelector(".quantity-plus");
//   const btnMinus = document.querySelector(".quantity-minus");

//   // элементы «Ориентировочная стоимость»
//   const approxHidden = document.getElementById("approximateInput");
//   const approxText = document.querySelector(".approximate__box-price");

//   // форма
//   const form = document.querySelector(".calculator__form");
//   const submitBtn = form?.querySelector(".calculator-btn");

//   // текущее значение цены за единицу (из data-price)
//   let currentUnitPrice = 0;

//   // --- изначально блокируем кнопки количества ---
//   btnPlus.classList.add("disabled");
//   btnMinus.classList.add("disabled");

//   // форматирование числа с пробелами 1 234 567
//   const formatNumber = (n) =>
//     n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

//   // пересчёт и вывод
//   function calculateAndRender() {
//     const qty = parseInt(qtyInput.value, 10) || 0;
//     const total = currentUnitPrice * qty;
//     approxText.textContent = formatNumber(total);
//     approxHidden.value = total;
//   }

//   // --- раскрытие/закрытие меню ---
//   btn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     btn.classList.toggle("active");
//   });
//   document.addEventListener("click", () => btn.classList.remove("active"));

//   // --- выбор пункта меню ---
//   list.querySelectorAll(".form-output__item").forEach((item) => {
//     item.addEventListener("click", (e) => {
//       e.stopPropagation();
//       title.textContent = item.textContent.trim();
//       deliveryTypeInput.value = item.textContent.trim();
//       currentUnitPrice = Number(item.dataset.price) || 0;

//       btn.classList.remove("active");
//       calculateAndRender();

//       // включаем кнопки количества после выбора тарифа
//       btnPlus.classList.remove("disabled");
//       btnMinus.classList.remove("disabled");
//     });
//   });

//   // --- количество (шаг 1000) ---
//   btnPlus.addEventListener("click", () => {
//     if (currentUnitPrice === 0) return;
//     const value = parseInt(qtyInput.value, 10) || 0;
//     qtyInput.value = value + 1000;
//     calculateAndRender();
//   });

//   btnMinus.addEventListener("click", () => {
//     if (currentUnitPrice === 0) return;
//     const value = parseInt(qtyInput.value, 10) || 0;
//     qtyInput.value = Math.max(1000, value - 1000);
//     calculateAndRender();
//   });

//   // первичная установка
//   calculateAndRender();

//   // =========================
//   //   ПОПАП (по центру экрана)
//   // =========================

//   // стили попапа
//   const style = document.createElement("style");
//   style.textContent = `
//     .toast{
//       position: fixed;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%) scale(0.9);
//       max-width: 400px;
//       width: auto;
//       padding: 18px 22px;
//       background: #222;
//       color: #fff;
//       border-radius: 12px;
//       box-shadow: 0 12px 40px rgba(0,0,0,.25);
//       opacity: 0;
//       pointer-events: none;
//       transition: opacity .3s ease, transform .3s ease;
//       z-index: 9999;
//       font-size: 16px;
//       text-align: center;
//       line-height: 1.4;
//     }
//     .toast.show{
//       opacity: 1;
//       transform: translate(-50%, -50%) scale(1);
//       pointer-events: auto;
//     }
//     .toast.success{ background:#2e7d32; }
//     .toast.error{   background:#c62828; }
//     .toast.info{    background:#1565c0; }
//   `;
//   document.head.appendChild(style);

//   // контейнер попапа
//   const toast = document.createElement("div");
//   toast.className = "toast";
//   toast.setAttribute("aria-live", "polite");
//   toast.setAttribute("aria-hidden", "true");
//   document.body.appendChild(toast);

//   function showToast(message, type = "info", timeout = 5000) {
//     toast.textContent = message;
//     toast.className = `toast ${type} show`;
//     toast.setAttribute("aria-hidden", "false");

//     clearTimeout(showToast._timer);
//     showToast._timer = setTimeout(() => {
//       toast.classList.remove("show");
//       toast.setAttribute("aria-hidden", "true");
//     }, timeout);
//   }

//   // =========================
//   //   Отправка формы
//   // =========================
//   if (form && submitBtn) {
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       // не отправляем без выбранного типа
//       if (!deliveryTypeInput.value) {
//         showToast("Выберите тип рассылки.", "info", 3000);
//         return;
//       }

//       submitBtn.disabled = true;

//       try {
//         const endpoint = form.getAttribute("action") || "/send.php";
//         const res = await fetch(endpoint, {
//           method: "POST",
//           body: new FormData(form),
//         });
//         const text = (await res.text()).trim();

//         if (text.startsWith("success")) {
//           showToast("Спасибо! Ваша заявка отправлена.", "success", 4000);
//         } else if (text.startsWith("rate_limit:")) {
//           const wait = text.split(":")[1] || "несколько секунд";
//           showToast(`Слишком частые отправки. Попробуйте через ${wait} сек.`, "info", 4000);
//         } else if (text.startsWith("validation_error:")) {
//           showToast(text.replace("validation_error:", "").trim(), "error", 3000);
//         } else {
//           showToast("Ошибка при отправке. Попробуйте позже.", "error", 4000);
//         }
//       } catch (err) {
//         showToast("Сеть недоступна или сервер не отвечает.", "error", 4000);
//       } finally {
//         submitBtn.disabled = false;
//       }
//     });
//   }
// });


// самый самый рабочик код 
// document.addEventListener("DOMContentLoaded", () => {
//   // элементы «Тип рассылки»
//   const btn = document.querySelector(".form-output__btn");
//   const list = document.querySelector(".form-output__list");
//   const title = document.querySelector(".form-output-title");
//   const deliveryTypeInput = document.getElementById("deliveryType");

//   // элементы «Количество»
//   const qtyInput = document.querySelector(".quantity-input");
//   const btnPlus = document.querySelector(".quantity-plus");
//   const btnMinus = document.querySelector(".quantity-minus");

//   // элементы «Ориентировочная стоимость»
//   const approxHidden = document.getElementById("approximateInput");
//   const approxText = document.querySelector(".approximate__box-price");

//   // форма
//   const form = document.querySelector(".calculator__form");
//   const submitBtn = form?.querySelector(".calculator-btn");

//   // текущее значение цены за единицу (из data-price)
//   let currentUnitPrice = 0;

//   // --- изначально блокируем кнопки количества ---
//   btnPlus.classList.add("disabled");
//   btnMinus.classList.add("disabled");

//   // форматирование числа с пробелами 1 234 567
//   const formatNumber = (n) =>
//     n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

//   // пересчёт и вывод
//   function calculateAndRender() {
//     const qty = parseInt(qtyInput.value, 10) || 0;
//     const total = currentUnitPrice * qty;

//     // показываем с ₽ для пользователя
//     approxText.textContent = formatNumber(total) + " ₽";

//     // отправляем в hidden только число
//     approxHidden.value = total;
//   }

//   // --- раскрытие/закрытие меню ---
//   btn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     btn.classList.toggle("active");
//   });
//   document.addEventListener("click", () => btn.classList.remove("active"));

//   // --- выбор пункта меню ---
//   list.querySelectorAll(".form-output__item").forEach((item) => {
//     item.addEventListener("click", (e) => {
//       e.stopPropagation();
//       title.textContent = item.textContent.trim();
//       deliveryTypeInput.value = item.textContent.trim();
//       currentUnitPrice = Number(item.dataset.price) || 0;

//       btn.classList.remove("active");
//       calculateAndRender();

//       // включаем кнопки количества после выбора тарифа
//       btnPlus.classList.remove("disabled");
//       btnMinus.classList.remove("disabled");
//     });
//   });

//   // --- количество (шаг 1000) ---
//   btnPlus.addEventListener("click", () => {
//     if (currentUnitPrice === 0) return;
//     const value = parseInt(qtyInput.value, 10) || 0;
//     qtyInput.value = value + 1000;
//     calculateAndRender();
//   });

//   btnMinus.addEventListener("click", () => {
//     if (currentUnitPrice === 0) return;
//     const value = parseInt(qtyInput.value, 10) || 0;
//     qtyInput.value = Math.max(1000, value - 1000);
//     calculateAndRender();
//   });

//   // первичная установка
//   calculateAndRender();

//   // =========================
//   //   ПОПАП (по центру формы)
//   // =========================

//   // стили попапа
//   const style = document.createElement("style");
//   style.textContent = `
//     .calculator__form { position: relative; }
//     .toast{
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%) scale(0.9);
//       max-width: 90%;
//       width: auto;
//       padding: 18px 22px;
//       background: #222;
//       color: #fff;
//       border-radius: 12px;
//       box-shadow: 0 12px 40px rgba(0,0,0,.25);
//       opacity: 0;
//       pointer-events: none;
//       transition: opacity .3s ease, transform .3s ease;
//       z-index: 100;
//       font-size: 16px;
//       text-align: center;
//       line-height: 1.4;
//     }
//     .toast.show{
//       opacity: 1;
//       transform: translate(-50%, -50%) scale(1);
//       pointer-events: auto;
//     }
//     .toast.success{ background:#2e7d32; }
//     .toast.error{   background:#c62828; }
//     .toast.info{    background:#1565c0; }
//     .form-output__btn.error {
//       outline: 2px solid #c62828;
//       border-radius: 6px;
//     }
//   `;
//   document.head.appendChild(style);

//   // контейнер попапа теперь внутри формы
//   const toast = document.createElement("div");
//   toast.className = "toast";
//   toast.setAttribute("aria-live", "polite");
//   toast.setAttribute("aria-hidden", "true");
//   form.appendChild(toast);

//   function showToast(message, type = "info", timeout = 5000) {
//     toast.textContent = message;
//     toast.className = `toast ${type} show`;
//     toast.setAttribute("aria-hidden", "false");

//     clearTimeout(showToast._timer);
//     showToast._timer = setTimeout(() => {
//       toast.classList.remove("show");
//       toast.setAttribute("aria-hidden", "true");
//     }, timeout);
//   }

//   // =========================
//   //   Отправка формы (AJAX)
//   // =========================
//   if (form && submitBtn) {
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault(); // ← блокируем переход на PHP-страницу

//       // проверка выбора тарифа
//       if (!deliveryTypeInput.value || deliveryTypeInput.value.trim() === "") {
//         showToast("Пожалуйста, выберите тип рассылки.", "info", 4000);
//         btn.classList.add("error");
//         setTimeout(() => btn.classList.remove("error"), 3000);
//         return;
//       }

//       submitBtn.disabled = true;

//       try {
//         const endpoint = form.getAttribute("action") || "/send-calculator.php";
//         const res = await fetch(endpoint, {
//           method: "POST",
//           body: new FormData(form),
//         });
//         const text = (await res.text()).trim();

//         if (text.startsWith("success")) {
//           showToast("Спасибо! Ваша заявка отправлена.", "success", 5000);

//           // (опционально) сброс формы:
//           // form.reset();
//           // deliveryTypeInput.value = "";
//           // title.textContent = "Выберите тип:";
//           // currentUnitPrice = 0;
//           // qtyInput.value = "1000";
//           // btnPlus.classList.add("disabled");
//           // btnMinus.classList.add("disabled");
//           // calculateAndRender();
//         } else if (text.startsWith("rate_limit:")) {
//           const wait = text.split(":")[1] || "несколько секунд";
//           showToast(`Слишком частые отправки. Попробуйте через ${wait} сек.`, "info", 5000);
//         } else if (text.startsWith("validation_error:")) {
//           showToast(text.replace("validation_error:", "").trim(), "error", 7000);
//         } else {
//           showToast("Ошибка при отправке. Попробуйте позже.", "error", 5000);
//         }
//       } catch {
//         showToast("Сеть недоступна или сервер не отвечает.", "error", 5000);
//       } finally {
//         submitBtn.disabled = false;
//       }
//     });
//   }
// });





// самый новый который работат с многим количеством форм 

document.addEventListener("DOMContentLoaded", () => {
  // Вставим стили (один раз на страницу)
  if (!document.getElementById("calc-toast-styles")) {
    const style = document.createElement("style");
    style.id = "calc-toast-styles";
    style.textContent = `
      .calculator__form { position: relative; }
      .toast{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        max-width: 90%;
        width: auto;
        padding: 18px 22px;
        background: #222;
        color: #fff;
        border-radius: 12px;
        box-shadow: 0 12px 40px rgba(0,0,0,.25);
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s ease, transform .3s ease;
        z-index: 100;
        font-size: 16px;
        text-align: center;
        line-height: 1.4;
      }
      .toast.show{
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
        pointer-events: auto;
      }
      .toast.success{ background:#2e7d32; }
      .toast.error{   background:#c62828; }
      .toast.info{    background:#1565c0; }
      .form-output__btn.error {
        outline: 2px solid #c62828;
        border-radius: 6px;
      }
      /* если используешь класс .disabled для кнопок +/- */
      .quantity-btn.disabled { opacity:.5; pointer-events:none; }
    `;
    document.head.appendChild(style);
  }

  // Инициализация каждого калькулятора отдельно
  document.querySelectorAll(".calculator__form").forEach((form) => initCalculator(form));

  function initCalculator(form) {
    // элементы «Тип рассылки» — берём только внутри текущей формы
    const btn = form.querySelector(".form-output__btn");
    const list = form.querySelector(".form-output__list");
    const title = form.querySelector(".form-output-title");

    // НЕ опираемся на дублирующиеся id — берём по name в пределах формы
    const deliveryTypeInput = form.querySelector('[name="delivery_type"]');

    // элементы «Количество»
    const qtyInput = form.querySelector(".quantity-input");
    const btnPlus = form.querySelector(".quantity-plus");
    const btnMinus = form.querySelector(".quantity-minus");

    // элементы «Ориентировочная стоимость»
    const approxHidden = form.querySelector('[name="approximate_price"]');
    const approxText = form.querySelector(".approximate__box-price");

    const submitBtn = form.querySelector(".calculator-btn");

    // форменный попап
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("aria-live", "polite");
    toast.setAttribute("aria-hidden", "true");
    form.appendChild(toast);

    // состояние цены за единицу
    let currentUnitPrice = 0;

    // изначально блокируем +/- до выбора тарифа
    btnPlus?.classList.add("disabled");
    btnMinus?.classList.add("disabled");

    const formatNumber = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    function calculateAndRender() {
      const qty = parseInt(qtyInput?.value || "0", 10) || 0;
      const total = currentUnitPrice * qty;

      if (approxText) approxText.textContent = formatNumber(total) + " ₽"; // показываем с ₽
      if (approxHidden) approxHidden.value = total; // в hidden — только число
    }

    function showToast(message, type = "info", timeout = 5000) {
      toast.textContent = message;
      toast.className = `toast ${type} show`;
      toast.setAttribute("aria-hidden", "false");

      clearTimeout(showToast._timer);
      showToast._timer = setTimeout(() => {
        toast.classList.remove("show");
        toast.setAttribute("aria-hidden", "true");
      }, timeout);
    }

    // --- меню типа рассылки ---
    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("active");
    });

    // закрытие меню при клике вне текущей формы/кнопки
    document.addEventListener("click", (e) => {
      if (!form.contains(e.target)) {
        btn?.classList.remove("active");
      }
    });

    // выбор пункта
    list?.querySelectorAll(".form-output__item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const text = item.textContent.trim();
        const price = Number(item.dataset.price) || 0;

        if (title) title.textContent = text;
        if (deliveryTypeInput) deliveryTypeInput.value = text;
        currentUnitPrice = price;

        btn?.classList.remove("active");
        calculateAndRender();

        // включаем +/- после выбора
        btnPlus?.classList.remove("disabled");
        btnMinus?.classList.remove("disabled");
      });
    });

    // --- количество (шаг 1000) ---
    btnPlus?.addEventListener("click", () => {
      if (currentUnitPrice === 0) return;
      const value = parseInt(qtyInput.value, 10) || 0;
      qtyInput.value = value + 1000;
      calculateAndRender();
    });

    btnMinus?.addEventListener("click", () => {
      if (currentUnitPrice === 0) return;
      const value = parseInt(qtyInput.value, 10) || 0;
      qtyInput.value = Math.max(1000, value - 1000);
      calculateAndRender();
    });

    // первичная установка
    calculateAndRender();

    // --- отправка формы (AJAX), без перехода на PHP-страницу ---
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!deliveryTypeInput?.value || deliveryTypeInput.value.trim() === "") {
        showToast("Пожалуйста, выберите тип рассылки.", "info", 4000);
        btn?.classList.add("error");
        setTimeout(() => btn?.classList.remove("error"), 3000);
        return;
      }

      submitBtn && (submitBtn.disabled = true);

      try {
        const endpoint = form.getAttribute("action") || "/send-calculator.php";
        const res = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
        });
        const text = (await res.text()).trim();

        if (text.startsWith("success")) {
          showToast("Спасибо! Ваша заявка отправлена.", "success", 5000);

          // (опционально) сброс конкретной формы
          // form.reset();
          // if (title) title.textContent = "Выберите тип:";
          // currentUnitPrice = 0;
          // if (qtyInput) qtyInput.value = "1000";
          // btnPlus?.classList.add("disabled");
          // btnMinus?.classList.add("disabled");
          // calculateAndRender();
        } else if (text.startsWith("rate_limit:")) {
          const wait = text.split(":")[1] || "несколько секунд";
          showToast(`Слишком частые отправки. Попробуйте через ${wait} сек.`, "info", 5000);
        } else if (text.startsWith("validation_error:")) {
          showToast(text.replace("validation_error:", "").trim(), "error", 7000);
        } else {
          showToast("Ошибка при отправке. Попробуйте позже.", "error", 5000);
        }
      } catch {
        showToast("Сеть недоступна или сервер не отвечает.", "error", 5000);
      } finally {
        submitBtn && (submitBtn.disabled = false);
      }
    });
  }
});
