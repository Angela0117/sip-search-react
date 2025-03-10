import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

// 初始化 Swiper
document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.swiper-container', {
    // Swiper options
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});


$(document).ready(function() {
    console.log("jQuery is working from CDN!");
  });




// $(document).ready(function() {
//     var $scrollContainer = $('#scroll-container');
//     var scrollAmount = 150; // 每次滾動的像素量

//     // 左移按鈕
//     $('#scroll-left-btn').click(function() {
//         $scrollContainer.animate({
//             scrollLeft: '-=' + scrollAmount
//         }, 300);
//     });

//     // 右移按鈕
//     $('#scroll-right-btn').click(function() {
//         $scrollContainer.animate({
//             scrollLeft: '+=' + scrollAmount
//         }, 300);
//     });

//     // 第二个容器的按钮
//     $('#scroll-left-btn-1').click(function() {
//         $('#scroll-container-1').animate({
//             scrollLeft: '-=' + scrollAmount
//         }, 300);
//     });

//     $('#scroll-right-btn-1').click(function() {
//         $('#scroll-container-1').animate({
//             scrollLeft: '+=' + scrollAmount
//         }, 300);
//     });


//     //第三個容器
//     $('#scroll-left-btn-2').click(function() {
//         $('#scroll-container-2').animate({
//             scrollLeft: '-=' + scrollAmount
//         }, 300);
//     });

//     $('#scroll-right-btn-2').click(function() {
//         $('#scroll-container-2').animate({
//             scrollLeft: '+=' + scrollAmount
//         }, 300);
//     });


// });

// document.addEventListener('DOMContentLoaded', function () {
//   const scrollLeftBtn1 = document.getElementById('scroll-left-btn-1');
//   const scrollRightBtn1 = document.getElementById('scroll-right-btn-1');
//   const scrollContainer1 = document.getElementById('scroll-container-1');

//   if (scrollLeftBtn1 && scrollRightBtn1 && scrollContainer1) {
//     scrollLeftBtn1.addEventListener('click', function () {
//       scrollContainer1.scrollBy({
//         left: -200,
//         behavior: 'smooth'
//       });
//     });

//     scrollRightBtn1.addEventListener('click', function () {
//       scrollContainer1.scrollBy({
//         left: 200,
//         behavior: 'smooth'
//       });
//     });
//   }
// });






  
  
  
  
  