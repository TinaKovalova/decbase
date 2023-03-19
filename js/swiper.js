 const swiper = new Swiper(".swiper", {
    grabCursor:true,
    loop:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
      0: {
        slidesPerView: 1,
        slidesPerGroup:2,
        centeredSlides:true
      },
      1439: {
        slidesPerView: 2,
        slidesPerGroup:2,
      }
    }
  });
 