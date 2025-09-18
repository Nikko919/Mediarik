var swiper = new Swiper(".casesSwiper", {
  grabCursor: true,
  slidesPerView: 1.05,
  spaceBetween: 10,
  breakpoints: {
    760: {
      slidesPerView: 1.05,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 1.8,
      spaceBetween: 20,
    },
    // 1900: {
    //   slidesPerView: 2.8,
    // },
  },
  navigation: {
    nextEl: ".casesSwiper-button-next",
    prevEl: ".casesSwiper-button-prev",
  },
});


var swiper = new Swiper(".reviewsSwiper", {
  grabCursor: true,
  slidesPerView: 1.1,
  spaceBetween: 10,
  breakpoints: {
    760: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // 1900: {
    //   slidesPerView: 2.8,
    // },
  },
});




var swiper = new Swiper(".examplesSwiper", {
  grabCursor: true,
  slidesPerView: 1,
  navigation: {
    nextEl: ".examplesSwiper-button-next",
    prevEl: ".examplesSwiper-button-prev",
  },
});