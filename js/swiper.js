 const swiper = new Swiper(".swiper", {
    spaceBetween:10,
    slidesPerView: 2,
    senteredSlides:true,
    grabCursor:true,
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
      1300: {
        slidesPerView: 2
      }
    }
  });
 