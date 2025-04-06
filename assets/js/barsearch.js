//banner的modal
// 監聽所有 .tag 和 .item 元素的點擊事件
// document.querySelectorAll(".city-item,.other-item").forEach((element) => {
//   element.addEventListener("click", function () {
//     // 切換 'selected' class 來改變背景顏色
//     this.classList.toggle("selected");
//   });
// });

// 當點擊 "Add Selected Tags" 按鈕時，將選中的 tag 添加到 banner 下方
// document.getElementById("addTagsBtn").addEventListener("click", function () {
//   const selectedTagsContainer = document.getElementById("selected-tags");

//   // 獲取所有已經選中的 tag
//   document
//     .querySelectorAll(".city-item.selected,.other-item.selected")
//     .forEach((selectedElement) => {
//       const tagName = selectedElement.textContent.trim();

//       // 檢查該 tag 是否已經存在於外部 banner
//       if (!selectedTagsContainer.querySelector(`[data-tag="${tagName}"]`)) {
//         // 創建新元素來顯示選中的 tag
//         const selectedTag = document.createElement("div");
//         selectedTag.classList.add("selected-tag");
//         selectedTag.textContent = tagName;
//         selectedTag.setAttribute("data-tag", tagName);
//         // 創建關閉圖標
//         const closeIcon = document.createElement("span");
//         closeIcon.classList.add("material-symbols-outlined", "close-icon");
//         closeIcon.textContent = "close";

//         // 關閉圖標點擊事件，點擊後移除該 tag
//         closeIcon.addEventListener("click", function (event) {
//           selectedTagsContainer.removeChild(selectedTag);
//         });

//         // 將關閉圖標添加到 tag 內部
//         selectedTag.appendChild(closeIcon);
//         // 添加到 banner 下方
//         selectedTagsContainer.appendChild(selectedTag);

//         // 選擇完成後，清除選中狀態
//         document
//           .querySelectorAll(".city-item.selected, .other-item.selected")
//           .forEach((selectedElement) => {
//             selectedElement.classList.remove("selected");
//           });
//         // 點擊外部 tag 可以移除
//         // selectedTag.addEventListener("click", function () {
//         //   selectedTagsContainer.removeChild(this);
//         // });
//       }
//     });

//   // 選擇完成後，清除選中狀態並關閉 modal
//   document
//     .querySelectorAll(".tag.selected, .item.selected")
//     .forEach((selectedElement) => {
//       selectedElement.classList.remove("selected");
//     });

//   // 手動關閉 modal （如果沒有使用 data-bs-dismiss="modal"）
//   const modal = bootstrap.Modal.getInstance(
//     document.getElementById("searchModal")
//   );
//   modal.hide();
// });

// 熱門酒吧swiper
// let popularBarsSwiper = new Swiper(".popularBarsSwiper", {
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   loop: true,
//   breakpoints: {
//     768: {
//       slidesPerView: 1,
//       slidesPerGroup: 1,
//     },
//     992: {
//       slidesPerView: 2,
//       slidesPerGroup: 2,
//     },
//   },
// });
