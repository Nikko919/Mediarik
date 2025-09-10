// раскрывание отзывов

// document.addEventListener('DOMContentLoaded', () => {
//   const cards = document.querySelectorAll('.reviews__card');

//   cards.forEach(card => {
//     const bottom = card.querySelector('.reviews__card-bottom');
//     const btn = card.querySelector('.reviews__btn');
//     if (!bottom || !btn) return;

//     const paras = bottom.querySelectorAll('p.text');
//     // Если абзац всего один — прятать нечего
//     if (paras.length <= 1) {
//       btn.hidden = true;
//       return;
//     }

//     let isExpanded = false;

//     // Список абзацев, которые скрываем в "свернутом" состоянии (начиная со второго)
//     const extra = Array.from(paras).slice(1).map(el => ({
//       el,
//       prevDisplay: el.style.display
//     }));

//     // Функция: скрыть «лишние» абзацы
//     const hideExtra = () => extra.forEach(x => x.el.style.display = 'none');
//     // Функция: показать «лишние» абзацы
//     const showExtra = () => extra.forEach(x => x.el.style.display = x.prevDisplay || '');

//     // 1) Инициализация: скрываем лишнее и фиксируем "свернутую" высоту карточки
//     hideExtra();
//     // Ставим height по фактической свернутой высоте
//     card.style.height = 'auto';
//     const collapsedHeight = card.scrollHeight; // высота с одним абзацем
//     card.style.height = collapsedHeight + 'px';

//     // Утилита: анимировать до полной высоты (раскрыть)
//     const animateToFullHeight = () => {
//       // Показать контент заранее, чтобы scrollHeight включал всё
//       showExtra();
//       const start = card.offsetHeight;   // текущая «px»-высота
//       card.style.height = start + 'px';  // фиксируем старт
//       // Следующий кадр — до полной высоты
//       requestAnimationFrame(() => {
//         card.style.height = card.scrollHeight + 'px';
//       });
//       // После анимации ставим auto, чтобы карточка жила по контенту
//       const onEnd = (e) => {
//         if (e.propertyName !== 'height') return;
//         card.style.height = 'auto';
//         card.removeEventListener('transitionend', onEnd);
//       };
//       card.addEventListener('transitionend', onEnd);
//     };

//     // Утилита: анимировать к «свернутой» высоте (показан 1-й абзац)
//     const animateToCollapsed = () => {
//       // Сначала вычислим целевую свернутую высоту: прячем лишнее только на время измерения
//       hideExtra();
//       // Чтобы правильно посчитать, кратко разорём auto -> px для анимации
//       card.style.height = 'auto';
//       const target = card.scrollHeight;      // высота с 1-м абзацем
//       const from = card.offsetHeight;        // текущая px-высота (была auto)
//       card.style.height = from + 'px';       // фиксируем старт
//       requestAnimationFrame(() => {
//         card.style.height = target + 'px';   // едем к свернутой
//       });
//       // Ничего не возвращаем в auto — в свернутом состоянии нам фиксированная высота и нужна
//     };

//     // Кнопка
//     const updateBtnLabel = () => {
//       btn.setAttribute('aria-expanded', String(isExpanded));
//       btn.classList.toggle('is-open', isExpanded);
//       // Если хочешь менять текст — раскомментируй:
//       // btn.textContent = isExpanded ? 'Свернуть' : 'Развернуть';
//     };

//     btn.addEventListener('click', () => {
//       if (!isExpanded) {
//         animateToFullHeight();
//         isExpanded = true;
//       } else {
//         animateToCollapsed();
//         isExpanded = false;
//       }
//       updateBtnLabel();
//     });

//     // Ресайз: в открытом состоянии — держим auto; в закрытом — пересчитываем «свернутую» высоту
//     window.addEventListener('resize', () => {
//       if (isExpanded) {
//         card.style.height = 'auto';
//       } else {
//         hideExtra();
//         card.style.height = 'auto';
//         const target = card.scrollHeight;
//         card.style.height = target + 'px';
//       }
//     });
//   });
// });





// document.addEventListener('DOMContentLoaded', () => {
//   const cards = document.querySelectorAll('.reviews__card');

//   cards.forEach(card => {
//     const bottom = card.querySelector('.reviews__card-bottom');
//     const btn = card.querySelector('.reviews__btn');
//     if (!bottom || !btn) return;

//     const paras = bottom.querySelectorAll('p.text');
//     // Если абзац всего один — прятать нечего
//     if (paras.length <= 1) {
//       btn.hidden = true;
//       return;
//     }

//     let isExpanded = false;

//     // Список абзацев, которые скрываем в "свернутом" состоянии (начиная со второго)
//     const extra = Array.from(paras).slice(1).map(el => ({
//       el,
//       prevDisplay: el.style.display
//     }));

//     const hideExtra = () => extra.forEach(x => x.el.style.display = 'none');
//     const showExtra = () => extra.forEach(x => x.el.style.display = x.prevDisplay || '');

//     // Инициализация: свернутый вид
//     hideExtra();
//     card.style.height = 'auto';
//     let collapsedHeight = card.scrollHeight; // высота с одним абзацем
//     card.style.height = collapsedHeight + 'px';

//     // Раскрытие
//     const animateToFullHeight = () => {
//       showExtra();
//       const start = card.offsetHeight;
//       card.style.height = start + 'px';
//       requestAnimationFrame(() => {
//         card.style.height = card.scrollHeight + 'px';
//       });
//       const onEnd = (e) => {
//         if (e.propertyName !== 'height') return;
//         card.style.height = 'auto';
//         card.removeEventListener('transitionend', onEnd);
//       };
//       card.addEventListener('transitionend', onEnd);
//     };

//     // Сворачивание (плавное)
//     const animateToCollapsed = () => {
//       // показать всё, чтобы измерить полную высоту
//       showExtra();
//       const fullHeight = card.scrollHeight;

//       // спрятать лишнее только для вычисления свернутой высоты
//       extra.forEach(x => x.el.style.display = 'none');
//       collapsedHeight = card.scrollHeight;

//       // вернуть лишнее обратно, чтобы они участвовали в анимации
//       extra.forEach(x => x.el.style.display = x.prevDisplay || '');

//       // анимировать от полной к свернутой
//       card.style.height = fullHeight + 'px';
//       requestAnimationFrame(() => {
//         card.style.height = collapsedHeight + 'px';
//       });

//       // по завершении реально скрыть лишние абзацы
//       const onEnd = (e) => {
//         if (e.propertyName !== 'height') return;
//         hideExtra();
//         card.style.height = collapsedHeight + 'px'; // фиксируем
//         card.removeEventListener('transitionend', onEnd);
//       };
//       card.addEventListener('transitionend', onEnd);
//     };

//     const updateBtnLabel = () => {
//       btn.setAttribute('aria-expanded', String(isExpanded));
//       btn.classList.toggle('is-open', isExpanded);
//     };

//     btn.addEventListener('click', () => {
//       if (!isExpanded) {
//         animateToFullHeight();
//         isExpanded = true;
//       } else {
//         animateToCollapsed();
//         isExpanded = false;
//       }
//       updateBtnLabel();
//     });

//     window.addEventListener('resize', () => {
//       if (isExpanded) {
//         card.style.height = 'auto';
//       } else {
//         hideExtra();
//         card.style.height = 'auto';
//         collapsedHeight = card.scrollHeight;
//         card.style.height = collapsedHeight + 'px';
//       }
//     });
//   });
// });






// document.addEventListener('DOMContentLoaded', () => {
//   const minCollapsedHeight = 353; // 👉 задай свою минимальную высоту (px)

//   const cards = document.querySelectorAll('.reviews__card');

//   cards.forEach(card => {
//     const bottom = card.querySelector('.reviews__card-bottom');
//     const btn = card.querySelector('.reviews__btn');
//     if (!bottom || !btn) return;

//     const paras = bottom.querySelectorAll('p.text');
//     if (paras.length <= 1) {
//       btn.hidden = true;
//       return;
//     }

//     let isExpanded = false;
//     let collapsedHeight = 0;

//     const extra = Array.from(paras).slice(1).map(el => ({
//       el,
//       prevDisplay: el.style.display
//     }));

//     const hideExtra = () => extra.forEach(x => x.el.style.display = 'none');
//     const showExtra = () => extra.forEach(x => x.el.style.display = x.prevDisplay || '');

//     // инициализация
//     hideExtra();
//     card.style.height = 'auto';
//     collapsedHeight = Math.max(card.scrollHeight, minCollapsedHeight);
//     card.style.height = collapsedHeight + 'px';

//     // раскрытие
//     const animateToFullHeight = () => {
//       showExtra();
//       const start = card.offsetHeight;
//       card.style.height = start + 'px';
//       requestAnimationFrame(() => {
//         card.style.height = card.scrollHeight + 'px';
//       });
//       const onEnd = (e) => {
//         if (e.propertyName !== 'height') return;
//         card.style.height = 'auto';
//         card.removeEventListener('transitionend', onEnd);
//       };
//       card.addEventListener('transitionend', onEnd);
//     };

//     // сворачивание
//     const animateToCollapsed = () => {
//       showExtra();
//       const fullHeight = card.scrollHeight;

//       // вычисляем свернутую высоту (с 1 абзацем)
//       extra.forEach(x => x.el.style.display = 'none');
//       let naturalCollapsed = card.scrollHeight;
//       collapsedHeight = Math.max(naturalCollapsed, minCollapsedHeight);

//       // вернуть лишние обратно для плавной анимации
//       extra.forEach(x => x.el.style.display = x.prevDisplay || '');

//       card.style.height = fullHeight + 'px';
//       requestAnimationFrame(() => {
//         card.style.height = collapsedHeight + 'px';
//       });

//       const onEnd = (e) => {
//         if (e.propertyName !== 'height') return;
//         hideExtra();
//         card.style.height = collapsedHeight + 'px';
//         card.removeEventListener('transitionend', onEnd);
//       };
//       card.addEventListener('transitionend', onEnd);
//     };

//     const updateBtnLabel = () => {
//       btn.setAttribute('aria-expanded', String(isExpanded));
//       btn.classList.toggle('is-open', isExpanded);
//     };

//     btn.addEventListener('click', () => {
//       if (!isExpanded) {
//         animateToFullHeight();
//         isExpanded = true;
//       } else {
//         animateToCollapsed();
//         isExpanded = false;
//       }
//       updateBtnLabel();
//     });

//     window.addEventListener('resize', () => {
//       if (isExpanded) {
//         card.style.height = 'auto';
//       } else {
//         hideExtra();
//         card.style.height = 'auto';
//         let naturalCollapsed = card.scrollHeight;
//         collapsedHeight = Math.max(naturalCollapsed, minCollapsedHeight);
//         card.style.height = collapsedHeight + 'px';
//       }
//     });
//   });
// });





// document.addEventListener('DOMContentLoaded', () => {
//   const minCollapsedHeight = 353; // 👉 минимальная высота свернутой карточки

//   const cards = document.querySelectorAll('.reviews__card');

//   cards.forEach(card => {
//     const bottom = card.querySelector('.reviews__card-bottom');
//     const btn = card.querySelector('.reviews__btn');
//     if (!bottom || !btn) return;

//     const paras = bottom.querySelectorAll('p.text');
//     if (paras.length <= 1) {
//       btn.hidden = true;
//       return;
//     }

//     let isExpanded = false;
//     let collapsedHeight = 0;

//     const extras = Array.from(paras).slice(1);

//     // подготовим стили для плавности
//     extras.forEach(el => {
//       el.style.transition = 'opacity .2s ease';
//     });

//     // скрыть из потока
//     const hideFromFlow = () => {
//       extras.forEach(el => {
//         el.style.opacity = '0';
//         el.style.visibility = 'hidden';
//         el.style.position = 'absolute';
//         el.style.left = '-9999px';
//         el.style.pointerEvents = 'none';
//       });
//     };

//     // показать (вернуть в поток, но сначала прозрачные)
//     const showInFlow = () => {
//       extras.forEach(el => {
//         el.style.position = '';
//         el.style.left = '';
//         el.style.pointerEvents = '';
//         el.style.visibility = 'visible';
//         el.style.opacity = '0';
//       });
//     };

//     // окончательно сделать видимыми
//     const makeVisible = () => {
//       requestAnimationFrame(() => {
//         extras.forEach(el => { el.style.opacity = '1'; });
//       });
//     };

//     // инициализация: свернуто
//     hideFromFlow();
//     card.style.height = 'auto';
//     collapsedHeight = Math.max(card.scrollHeight, minCollapsedHeight);
//     card.style.height = collapsedHeight + 'px';

//     // раскрытие
//     const animateToFullHeight = () => {
//       showInFlow(); // вернули extras в поток, они пока прозрачные
//       const start = card.offsetHeight;
//       card.style.height = start + 'px';

//       requestAnimationFrame(() => {
//         const full = card.scrollHeight;
//         card.style.height = full + 'px';
//       });

//       const onEnd = (e) => {
//         if (e.propertyName !== 'height') return;
//         card.style.height = 'auto';
//         makeVisible(); // теперь плавно проявляем текст
//         card.removeEventListener('transitionend', onEnd);
//       };
//       card.addEventListener('transitionend', onEnd);
//     };

//     // сворачивание
//     const animateToCollapsed = () => {
//       // начнем плавное исчезновение текста
//       extras.forEach(el => { el.style.opacity = '0'; });

//       const fullHeight = card.scrollHeight;

//       // вычисляем целевую свернутую высоту: на мгновение уберем из потока
//       showInFlow();
//       hideFromFlow();
//       card.style.height = 'auto';
//       const naturalCollapsed = card.scrollHeight;
//       collapsedHeight = Math.max(naturalCollapsed, minCollapsedHeight);

//       // вернем в поток (но прозрачные) чтобы анимация высоты была плавной
//       showInFlow();
//       extras.forEach(el => { el.style.opacity = '0'; });

//       card.style.height = fullHeight + 'px';
//       requestAnimationFrame(() => {
//         card.style.height = collapsedHeight + 'px';
//       });

//       const onEnd = (e) => {
//         if (e.propertyName !== 'height') return;
//         hideFromFlow(); // окончательно убрали из потока
//         card.style.height = collapsedHeight + 'px';
//         card.removeEventListener('transitionend', onEnd);
//       };
//       card.addEventListener('transitionend', onEnd);
//     };

//     const updateBtnLabel = () => {
//       btn.setAttribute('aria-expanded', String(isExpanded));
//       btn.classList.toggle('is-open', isExpanded);
//     };

//     btn.addEventListener('click', () => {
//       if (!isExpanded) {
//         animateToFullHeight();
//         isExpanded = true;
//       } else {
//         animateToCollapsed();
//         isExpanded = false;
//       }
//       updateBtnLabel();
//     });

//     window.addEventListener('resize', () => {
//       if (isExpanded) {
//         card.style.height = 'auto';
//       } else {
//         hideFromFlow();
//         card.style.height = 'auto';
//         const naturalCollapsed = card.scrollHeight;
//         collapsedHeight = Math.max(naturalCollapsed, minCollapsedHeight);
//         card.style.height = collapsedHeight + 'px';
//       }
//     });
//   });
// });




document.addEventListener('DOMContentLoaded', () => {
  const minCollapsedHeight = 353; // минимальная высота в свернутом виде (px)

  const cards = document.querySelectorAll('.reviews__card');

  cards.forEach(card => {
    const bottom = card.querySelector('.reviews__card-bottom');
    const btn = card.querySelector('.reviews__btn');
    if (!bottom || !btn) return;

    const paras = bottom.querySelectorAll('p.text');
    if (paras.length <= 1) {
      btn.hidden = true;
      return;
    }

    let isExpanded = false;
    let isAnimating = false;
    let collapsedHeight = 0;

    const extras = Array.from(paras).slice(1);

    // У всех "лишних" абзацев будет плавное появление/исчезновение
    extras.forEach(el => {
      const t = getComputedStyle(el).transition;
      el.style.transition = (t && t.length ? t + ', ' : '') + 'opacity .25s ease';
    });

    // helpers
    const hideFromFlow = () => {
      extras.forEach(el => {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.pointerEvents = 'none';
      });
    };
    const showInFlowInvisible = () => {
      extras.forEach(el => {
        el.style.position = '';
        el.style.left = '';
        el.style.pointerEvents = '';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
      });
    };
    const fadeIn = () => {
      requestAnimationFrame(() => {
        extras.forEach(el => {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        });
      });
    };
    const fadeOut = () => {
      extras.forEach(el => {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      });
    };

    // Фолбэк, если transitionend не пришёл
    const withTransitionEnd = (el, cb, msFallback = 600) => {
      let done = false;
      const onEnd = (e) => {
        if (e.propertyName !== 'height') return;
        if (done) return;
        done = true;
        el.removeEventListener('transitionend', onEnd);
        clearTimeout(timer);
        cb();
      };
      el.addEventListener('transitionend', onEnd, { once: true });
      const timer = setTimeout(() => {
        if (done) return;
        done = true;
        el.removeEventListener('transitionend', onEnd);
        cb();
      }, msFallback);
    };

    // ---- инициализация (свернуто) ----
    hideFromFlow();
    card.style.height = 'auto';
    collapsedHeight = Math.max(card.scrollHeight, minCollapsedHeight);
    card.style.height = collapsedHeight + 'px';

    // ---- раскрытие ----
    const animateToFullHeight = () => {
      if (isAnimating || isExpanded) return;
      isAnimating = true;

      // вернуть абзацы в поток, но невидимыми -> высота посчитается полной
      showInFlowInvisible();

      const start = card.offsetHeight;
      card.style.height = start + 'px';
      requestAnimationFrame(() => {
        const full = card.scrollHeight;
        card.style.height = full + 'px';
      });

      withTransitionEnd(card, () => {
        card.style.height = 'auto';
        fadeIn();            // плавное проявление текста после роста
        isAnimating = false;
      });

      isExpanded = true;
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('is-open');
    };

    // ---- сворачивание ----
    const animateToCollapsed = () => {
      if (isAnimating || !isExpanded) return;
      isAnimating = true;

      // 1) гасим текст (он остаётся в потоке, чтобы схлопывание шло плавно)
      fadeOut();

      // 2) считаем целевую свернутую высоту
      const fullHeight = card.scrollHeight;

      // временно исключим из потока для измерения "естественной" свернутой
      hideFromFlow();
      card.style.height = 'auto';
      const naturalCollapsed = card.scrollHeight;
      collapsedHeight = Math.max(naturalCollapsed, minCollapsedHeight);

      // вернём их в поток (невидимые), чтобы анимация шла без скачков
      showInFlowInvisible();

      // 3) анимируем высоту
      card.style.height = fullHeight + 'px';
      requestAnimationFrame(() => {
        card.style.height = collapsedHeight + 'px';
      });

      // 4) после схлопывания окончательно исключим из потока
      withTransitionEnd(card, () => {
        hideFromFlow();
        card.style.height = collapsedHeight + 'px';
        isAnimating = false;
      });

      isExpanded = false;
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('is-open');
    };

    const updateBtnLabel = () => {
      btn.setAttribute('aria-expanded', String(isExpanded));
      btn.classList.toggle('is-open', isExpanded);
    };

    btn.addEventListener('click', () => {
      if (isAnimating) return; // игнор клика во время анимации
      if (!isExpanded) {
        animateToFullHeight();
        isExpanded = true;
      } else {
        animateToCollapsed();
        isExpanded = false;
      }
      updateBtnLabel();
    });

    // корректировка на ресайз
    window.addEventListener('resize', () => {
      if (isAnimating) return;
      if (isExpanded) {
        card.style.height = 'auto';
      } else {
        hideFromFlow();                // extras вне потока
        card.style.height = 'auto';
        const naturalCollapsed = card.scrollHeight;
        collapsedHeight = Math.max(naturalCollapsed, minCollapsedHeight);
        card.style.height = collapsedHeight + 'px';
      }
    });
  });
});
