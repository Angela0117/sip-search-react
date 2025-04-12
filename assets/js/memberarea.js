// document.addEventListener('DOMContentLoaded', function() {
//   // 點擊手風琴按鈕時切換個人檔案內容
//   var profileButton = document.querySelector('.accordion-button');
//   profileButton.addEventListener('click', function() {
//     // 檢查手風琴是否已展開
//     var isExpanded = profileButton.getAttribute('aria-expanded') === 'true';

//     // 如果手風琴沒有展開，顯示個人檔案內容並隱藏其他內容
//     if (!isExpanded) {
//       clearAllContents(); // 先清除所有內容區域
//       showContent('profile-content'); // 顯示個人檔案內容
//     }
//   });

//   // 點擊左側選單時切換內容
//   var navLinks = document.querySelectorAll('.nav-link');
//   navLinks.forEach(function(link) {
//     link.addEventListener('click', function() {
//       // 隱藏所有內容區域
//       clearAllContents();

//       // 顯示對應的內容區域
//       var targetId = this.getAttribute('data-target');
//       showContent(targetId);
//     });
//   });

//   // 清除所有內容區域的函數
//   function clearAllContents() {
//     document.querySelectorAll('.content-section').forEach(function(section) {
//       section.classList.remove('active-section');
//     });
//   }

//   // 顯示指定內容區域的函數
//   function showContent(targetId) {
//     document.getElementById(targetId).classList.add('active-section');
//   }

//   $('.notify-toggle-switch').click(function() {
//     const input = $(this).find('input');
//     input.prop('checked', !input.prop('checked')); // 切換狀態
//     $(this).toggleClass('active'); // 切換外觀
//   });

// });

//通知

// document.addEventListener('DOMContentLoaded', function() {
//   // 點擊手風琴按鈕時切換個人檔案內容
//   var profileButton = document.querySelector('.accordion-button');
//   if (profileButton) {
//     profileButton.addEventListener('click', function() {
//       // 檢查手風琴是否已展開
//       var isExpanded = profileButton.getAttribute('aria-expanded') === 'true';

//       // 如果手風琴沒有展開，顯示個人檔案內容並隱藏其他內容
//       if (!isExpanded) {
//         clearAllContents(); // 先清除所有內容區域
//         showContent('profile-content'); // 顯示個人檔案內容
//       }
//     });
//   }

//   // 點擊左側選單時切換內容
//   var navLinks = document.querySelectorAll('.nav-link');
//   // navLinks.forEach(function(link) {
//   //   link.addEventListener('click', function() {
//   //     // 隱藏所有內容區域
//   //     clearAllContents();

//   //     // 顯示對應的內容區域
//   //     var targetId = this.getAttribute('data-target');
//   //     showContent(targetId);
//   //   });
//   // });

//   // 清除所有內容區域的函數
//   function clearAllContents() {
//     document.querySelectorAll('.content-section').forEach(function(section) {
//       section.classList.remove('active-section');
//     });
//   }

//   // 顯示指定內容區域的函數
//   // function showContent(targetId) {
//   //   document.getElementById(targetId).classList.add('active-section');
//   // }

//   $('.notify-toggle-switch').click(function() {
//     const input = $(this).find('input');
//     input.prop('checked', !input.prop('checked')); // 切換狀態
//     $(this).toggleClass('active'); // 切換外觀
//   });
// });
