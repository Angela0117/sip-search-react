// AOS.init();

// //首頁熱門酒譜swiper
// const swiper_popular_recipe = new Swiper(".swiper-popular-recipe", {
//   direction: "horizontal",
//   slidesPerView: "auto",
//   // loop: true,
//   speed: 1200,
//   slidesOffsetBefore: 50,
//   spaceBetween: 20,
//   breakpoints: {
//     320: {
//       //当屏幕宽度大于等于320
//       slidesOffsetBefore: 50,
//     },
//     576: {
//       //当屏幕宽度大于等于320
//       slidesOffsetBefore: 100,
//     },
//     768: {
//       //当屏幕宽度大于等于768
//       slidesOffsetBefore: 200,
//       spaceBetween: 20,
//     },
//     1280: {
//       //当屏幕宽度大于等于1280
//       slidesOffsetBefore: 300,
//       spaceBetween: 72,
//     },
//   },

//   mousewheel: true,
//   mousewheel: {
//     releaseOnEdges: true,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

// //首頁熱門酒吧swiper
// const swiper_popular_bars = new Swiper(".swiper-popular-bars", {
//   // Optional parameters
//   loop: true,
//   speed: 2000,
//   effect: "fade",
//   fadeEffect: {
//     crossFade: true, // 同时淡入和淡出
//   },

//   // If we need pagination
//   // pagination: {
//   //   el: ".swiper-pagination",
//   // },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   // And if we need scrollbar
//   // scrollbar: {
//   //   el: ".swiper-scrollbar",
//   // },
// });

//彈出是否18歲視窗
// 使用 jQuery 監聽頁面加載
//  $(document).ready(function() {
//   // 顯示彈窗
//   $('#ageVerificationModal').modal('show');

//   // 當用戶點擊 "是" 按鈕時，允許訪問網站
//   $('#btnYes').click(function() {
//       $('#ageVerificationModal').modal('hide');
//       window.location.href = '#'; // 替換為你的網站首頁
//   });

//   // 當用戶點擊 "否" 按鈕時，重定向到其他網站
//   $('#btnNo').click(function() {
//       window.location.href = 'https://www.google.com'; // 替換為其他頁面
//   });
// });
