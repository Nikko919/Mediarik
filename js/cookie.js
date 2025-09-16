document.addEventListener('DOMContentLoaded', function () {
  const cookieBox = document.querySelector('.cookie-box');
  const btnAccept = document.querySelector('.cookie-btn-ok');
  const btnDecline = document.querySelector('.cookie-btn-no');

  // Проверяем, есть ли уже кука о принятии
  function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function setCookie(name, value, options = {}) {
    options = {
      path: '/',
      // можно добавить другие опции по необходимости
      ...options
    };
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }

  if (!getCookie('cookie_accepted')) {
    setTimeout(() => {
      cookieBox.style.display = 'block';
    }, 2000);
  }

  btnAccept.addEventListener('click', function () {
    setCookie('cookie_accepted', 'true', { 'max-age': 60 * 60 * 24 * 30 }); // 30 дней
    cookieBox.style.display = 'none';
  });

  btnDecline.addEventListener('click', function () {
    cookieBox.style.display = 'none';
  });
});
