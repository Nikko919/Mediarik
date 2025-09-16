
// animation intro




document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('.intro-column__img'); // главное не трогаем

  imgs.forEach((img) => {
    let repel = false;
    let baseAngle = 0;
    let magnitude = 18;
    let raf = 0;

    function onEnter(e) {
      repel = true;
      const rect = img.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      baseAngle = Math.atan2(cy - e.clientY, cx - e.clientX);
      baseAngle += (Math.random() * Math.PI / 2) - (Math.PI / 4); // ±45°
      magnitude = 14 + Math.random() * 12; // 14–26px
      img.classList.add('is-repelling');
      apply(e);
    }

    function apply(e) {
      if (!repel) return;

      const rect = img.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const away = Math.atan2(cy - e.clientY, cx - e.clientX);
      const angle = away * 0.6 + baseAngle * 0.4;

      const dx = Math.cos(angle) * magnitude;
      const dy = Math.sin(angle) * magnitude;

      /* КЛЮЧЕВАЯ РАЗНИЦА: смещаем через individual transform property — translate,
         она компонуется с вашей анимацией в transform и не конфликтует */
      img.style.translate = `${dx}px ${dy}px`;
    }

    function onMove(e) {
      if (!repel) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => apply(e));
    }

    function onLeave() {
      repel = false;
      img.classList.remove('is-repelling');
      img.style.translate = ''; // вернуть как было — левитация продолжится
    }

    img.addEventListener('mouseenter', onEnter);
    img.addEventListener('mousemove', onMove);
    img.addEventListener('mouseleave', onLeave);
  });
});
