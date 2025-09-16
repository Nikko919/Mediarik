
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.popup__form').forEach(form => {
    const phoneInput = form.querySelector('input[name="phone"]');
    const nameInput = form.querySelector('input[name="name"]');
    const policyCheckbox = form.querySelector('input.policy-checkbox');

    // ==== BEGIN: phone mask autofill fix ====
    // Фикс «съедания» первой цифры при автозаполнении/вставке
    if (phoneInput && window.IMask) {
      // подскажем браузеру тип поля
      phoneInput.setAttribute('autocomplete', 'tel');
      phoneInput.setAttribute('inputmode', 'tel');

      const mask = IMask(phoneInput, {
        // единый формат — приводим всё к +7
        mask: '+{7} (000) 000-00-00',
        lazy: true,      // префикс виден сразу, курсор после +7
        overwrite: true,  // не «ползём» вправо при наборе

        // нормализуем любые вставки/автозаполнение
        prepare: (appended, masked) => {
          let s = (appended || '').toString();

          // если автозаполнение вставляет сразу весь номер — прилетает длинная строка
          if (s.length > 1) {
            s = s.replace(/\D/g, '');
            if (!s) return s;

            if (s.startsWith('8')) s = '7' + s.slice(1);
            else if (s.startsWith('9')) s = '7' + s;
            else if (s.startsWith('7')) s = '7' + s.slice(1); // уберём дубль первой 7

            return s;
          }

          // помарочный ввод
          if (!masked.value) {
            if (s === '8' || s === '7') return '7';
            if (s === '9') return '79';
          }
          return s;
        }
      });

      // некоторые браузеры не шлют нормальный input при автозаполнении — переапплаим маску
      const reapplyMask = () => requestAnimationFrame(() => mask.updateValue());

      phoneInput.addEventListener('change', reapplyMask);
      phoneInput.addEventListener('input', (e) => {
        if (e.inputType === 'insertReplacementText' || e.inputType === 'insertFromPaste') {
          reapplyMask();
        }
      });

      // webkit-детект автозаполнения через спец. анимацию
      phoneInput.addEventListener('animationstart', (e) => {
        if (e.animationName === 'onAutoFillStart') reapplyMask();
      });

      // добавим CSS для детекта автозаполнения (один раз на страницу)
      if (!document.getElementById('autofill-detect-style')) {
        const style = document.createElement('style');
        style.id = 'autofill-detect-style';
        style.textContent = `
@keyframes onAutoFillStart { from {} to {} }
input:-webkit-autofill { animation-name: onAutoFillStart; animation-duration: 0.001s; }
        `.trim();
        document.head.appendChild(style);
      }
    }
    // ==== END: phone mask autofill fix ====

    if (nameInput) {
      nameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\-\' ]/g, '');
        removeErrorBorder(this);
      });
    }

    // Раньше было 'input, textarea' — теперь только inputs
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', function () {
        removeErrorBorder(this);
      });
    });

    if (policyCheckbox) {
      policyCheckbox.addEventListener('change', function () {
        removeErrorBorder(this);
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      clearErrors(form);

      // Исключили textarea из обязательных полей
      form.querySelectorAll('input[type="text"]').forEach(input => {
        if (!input.value.trim()) {
          showErrorBorder(input);
          valid = false;
        } else if (input === nameInput) {
          if (!/^[-' a-zA-Zа-яА-ЯёЁ]+$/.test(input.value.trim())) {
            showErrorBorder(input);
            valid = false;
          }
        } else if (input === phoneInput) {
          // телефон проверяем по количеству цифр
          let x = input.value.replace(/\D/g, '');
          if (x.length !== 11) {
            showErrorBorder(input);
            valid = false;
          }
        }
      });

      // Валидация чекбокса политики
      if (policyCheckbox && !policyCheckbox.checked) {
        showErrorBorder(policyCheckbox);
        valid = false;
      }

      if (valid) {
        const formData = new FormData(form);
        formData.delete('policy');

        fetch(form.action, {
          method: 'POST',
          body: formData
        })
          .then(response => response.text())
          .then(data => {
            if (data.trim() === 'success') {
              showThankYouModal();
              const popupBg = form.closest('.popup__bg');
              const popup = form.closest('.popup');
              if (popupBg) popupBg.classList.remove('active');
              if (popup) popup.classList.remove('active');
              form.reset();
            } else if (data.startsWith('rate_limit:')) {
              const wait = data.split(':')[1];
              alert(`С этого IP уже была отправка недавно. Пожалуйста, подождите ${wait} секунд.`);
            } else if (data.startsWith('validation_error:')) {
              const error = data.split(':')[1];
              alert(`Ошибка валидации: ${error}`);
            } else {
              alert('Произошла ошибка при отправке формы. Попробуйте позже.');
            }
          })
          .catch(error => {
            console.error('Ошибка при отправке формы:', error);
            alert('Произошла ошибка при отправке формы. Попробуйте еще раз.');
          });
      }
    });
  });

  function showErrorBorder(input) {
    if (input.type === 'checkbox') {
      const customBox = input.closest('label')?.querySelector('.custom-checkbox');
      if (customBox) {
        customBox.style.border = '1px solid #e74c3c';
      }
    } else {
      input.style.border = '1px solid #e74c3c';
    }
  }

  function removeErrorBorder(input) {
    if (input.type === 'checkbox') {
      const customBox = input.closest('label')?.querySelector('.custom-checkbox');
      if (customBox) {
        customBox.style.border = '';
      }
    } else {
      input.style.border = '';
    }
  }

  function clearErrors(form) {
    // Раньше было 'input, textarea' — теперь только inputs
    form.querySelectorAll('input').forEach(input => {
      removeErrorBorder(input);
    });
    const policy = form.querySelector('input.policy-checkbox');
    if (policy) removeErrorBorder(policy);
  }

  function showThankYouModal() {
    const modalHTML = `
      <div id="thankYouModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease;">
        <div style="background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); text-align: center; max-width: 400px; width: 90%; transform: scale(0.8); transition: transform 0.3s ease;">
          <div style="width: 60px; height: 60px; background: #4CAF50; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: white; font-size: 30px;">✓</div>
          <h2 style="font-size: 24px; font-weight: 600; color: #333; margin-bottom: 10px;">Успешно!</h2>
          <p style="font-size: 16px; color: #666; line-height: 1.5; margin-bottom: 15px;">Спасибо! Ваша заявка отправлена.</p>
          <div style="font-size: 14px; color: #999;">Окно закроется автоматически через <span id="timer">2</span> сек</div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('thankYouModal');
    const timerElement = document.getElementById('timer');

    setTimeout(() => {
      modal.style.opacity = '1';
      modal.querySelector('div').style.transform = 'scale(1)';
    }, 10);

    let timeLeft = 2;
    const timerInterval = setInterval(() => {
      timeLeft--;
      if (timerElement) timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        hideThankYouModal();
      }
    }, 1000);

    setTimeout(() => {
      hideThankYouModal();
    }, 2000);
  }

  function hideThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
      modal.style.opacity = '0';
      modal.querySelector('div').style.transform = 'scale(0.8)';
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  }
});
