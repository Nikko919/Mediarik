

document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.hero-column__img-position');

  const tracks = [
    'float-up', 'float-down', 'float-left', 'float-right',
    'float-diag1', 'float-diag2', 'float-diag3', 'float-diag4',
    'float-circle'
  ];

  // Назначаем случайную анимацию, время и задержку каждой иконке
  icons.forEach((el) => {
    const name = tracks[Math.floor(Math.random() * tracks.length)];
    const duration = (3 + Math.random() * 3).toFixed(2); // 5–8s
    const delay = (Math.random() * 2).toFixed(2);        // 0–2s
    el.style.animation = `${name} ${duration}s ease-in-out infinite ${delay}s`;
  });

  // Реакция на курсор (отплывание)
  icons.forEach((img) => {
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
      img.style.translate = '';
    }

    img.addEventListener('mouseenter', onEnter);
    img.addEventListener('mousemove', onMove);
    img.addEventListener('mouseleave', onLeave);
  });
});




// анимациюя фона 

document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.elipse');

  const tracks = [
    'drift-up', 'drift-down', 'drift-left', 'drift-right',
    'drift-diag1', 'drift-diag2', 'drift-diag3', 'drift-diag4',
    'drift-circle'
  ];

  els.forEach(el => {
    // амплитуда 40–80px
    const amp = (80 + Math.random() * 40).toFixed(0) + 'px';
    el.style.setProperty('--amp', amp);

    // скорость 3–5s
    const duration = (3 + Math.random() * 2).toFixed(2);

    // старт вразнобой
    const negDelay = (-Math.random() * duration).toFixed(3) + 's';

    // случайная траектория
    const name = tracks[Math.floor(Math.random() * tracks.length)];
    const direction = Math.random() < 0.5 ? 'normal' : 'reverse';

    el.style.animation = `${name} ${duration}s ease-in-out infinite ${negDelay}`;
    el.style.animationDirection = direction;
  });
});
