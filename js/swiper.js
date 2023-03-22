new Swiper(".swiper", {
    slidesPerView: 2,
    slidesPerGroup:2,
    watchOverflow: true,
    slideToClickedSlide:true,
    loop:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
      0: {
        slidesPerView: 1,
        centeredSlides:true
      },
      1439: {
        slidesPerView: 2,
      }
    }
  });
 