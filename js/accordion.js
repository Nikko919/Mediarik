
// готовый код 
// const accordionBtn = document.querySelectorAll('.accordion__top');

// accordionBtn.forEach((header) => {
//   header.addEventListener('click', () => {
//     const accordionItem = header.parentElement;
//     const accordionContent = accordionItem.querySelector('.accordion__content');
//     const isActive = accordionContent.classList.contains('active');

//     // Закрытие других аккордеонов
//     document.querySelectorAll('.accordion__content').forEach((content) => {
//       if (content !== accordionContent) {
//         content.classList.remove('active');
//         content.style.maxHeight = '0'; // Скрытие
//         content.previousElementSibling.classList.remove('active'); // Удаляем класс active у кнопки
//         // Удаляем класс active у SVG
//         const svg = content.previousElementSibling.querySelector('.accordion__top-icon');
//         if (svg) {
//           svg.classList.remove('active');
//         }
//       }
//     });

//     if (!isActive) {
//       accordionContent.classList.add('active'); // Плавное появление
//       header.classList.add('active'); // Добавляем класс active к кнопке
//       requestAnimationFrame(() => {
//         accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // Плавное появление
//       });

//       // Добавляем класс active к SVG
//       const svg = header.querySelector('.accordion__top-icon');
//       if (svg) {
//         svg.classList.add('active');
//       }
//     } else {
//       accordionContent.classList.remove('active'); // Плавное скрытие
//       header.classList.remove('active'); // Удаляем класс active у кнопки
//       accordionContent.style.maxHeight = '0'; // Плавное скрытие


//     }
//   });
// });



const accordionBtns = document.querySelectorAll('.accordion__top');

accordionBtns.forEach((header) => {
  header.addEventListener('click', () => {
    const content = header.parentElement.querySelector('.accordion__content');
    const isOpen = content.classList.contains('active');

    // 1) Закрываем все остальные
    document.querySelectorAll('.accordion__content.active').forEach((c) => {
      if (c !== content) {
        c.classList.remove('active');
        c.style.maxHeight = '0';
        const h = c.previousElementSibling;
        if (h) h.classList.remove('active');
        const i = h?.querySelector('.accordion__top-icon');
        if (i) i.classList.remove('active');
      }
    });

    const icon = header.querySelector('.accordion__top-icon');

    if (!isOpen) {
      // 2) Открываем текущий
      header.classList.add('active');
      content.classList.add('active');
      if (icon) icon.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      // 3) Закрываем текущий по повторному клику
      header.classList.remove('active');
      content.classList.remove('active');
      if (icon) icon.classList.remove('active');
      content.style.maxHeight = '0';
    }
  });
});
