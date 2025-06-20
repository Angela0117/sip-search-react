import React from "react";
import { useEffect } from "react";


function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // 轉跳到這個頁面時，視窗回到頂部
  }, []);

  return (
    <>
      <title>關於我們</title>
      <div className="section-ab1">
        <div className="banner">
          <div className="container ps-10">
            <div className="about-content">
              <h2 className="fs-lg-2 text-end text-primary-1 mt-13">
                關於我們
              </h2>
            </div>
            <div className="pb-lg-13 pb-10">
              <p className="text-primary-1 fs-lg-6">「sip&search 微醺指南」</p>
              <p className="text-primary-1 fs-lg-7">
                是您探索調酒與酒吧的最佳夥伴。在這裡,您可以輕鬆搜尋豐富的酒譜,無論是簡單的家常調酒,還是精緻的專業配方,我們應有盡有。
              </p>
              <p className="text-primary-1 fs-lg-7">
                同時,我們幫助您發現身邊的特色酒吧,無論在哪裡,都能找到屬於自己的微醺角落。
              </p>
              <div className="mt-lg-12 fw-bold">
                <p className="text-primary-1 fs-lg-6">
                  探索風味,尋找微醺,讓每一杯酒都成為您的故事。
                </p>
              </div>
              <div className="mt-lg-12 mt-10">
                <button className="btn btn-index-primary1 fs-lg-6 py-lg-3 px-lg-7 mb-lg-6">
                  加入我們
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-ab2 mb-13">
        <div className="container">
          <div className="aboutText mt-lg-13 mb-lg-13 mt-11 mb-11">
            <h2 className="fw-bold text-primary-1 text-center mb-6 fs-7 fs-lg-2">
              一起共享，分享體驗
            </h2>
          </div>
          <div className="aboutContent eng-font">
            <div className="counter-container">
              <span className="material-symbols-outlined fs-1">
                {" "}
                account_circle{" "}
              </span>
              <div className="d-flex">
                <div className="counter" data-target="3000">
                  3000
                </div>
                <span className="fs-3">+</span>
              </div>
              <span className="fs-6 fw-bold">會員數</span>
            </div>
            <div className="counter-container">
              <span className="material-symbols-outlined fs-1"> wine_bar </span>
              <div className="d-flex">
                <div className="counter" data-target="200">
                  200
                </div>
                <span className="fs-3">+</span>
              </div>
              <span className="fs-6 fw-bold">酒譜</span>
            </div>
            <div className="counter-container">
              <span className="material-symbols-outlined fs-1">
                {" "}
                restaurant{" "}
              </span>
              <div className="d-flex">
                <div className="counter" data-target="500">
                  500
                </div>
                <span className="fs-3">+</span>
              </div>
              <span className="fs-6 fw-bold">酒吧</span>
            </div>
            <div className="counter-container">
              <span className="material-symbols-outlined fs-1">
                {" "}
                nightlife{" "}
              </span>
              <div className="d-flex">
                <div className="counter" data-target="100">
                  100+
                </div>
                <span className="fs-3">+</span>
              </div>
              <span className="fs-6 fw-bold">特色活動</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
