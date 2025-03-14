import React, { useEffect, useState } from "react";
import bannerImage from "../../assets/images/barsearch/bar-search-banner.png";
import popularBar01 from "../../assets/images/barsearch/popularBar01.png";
import popularBar02 from "../../assets/images/barsearch/popularBar02.png";
import popularBar03 from "../../assets/images/barsearch/popularBar03.png";
import popularBar04 from "../../assets/images/barsearch/popularBar04.png";
import popularBar05 from "../../assets/images/barsearch/popularBar05.png";
import uniqueBar01 from "../../assets/images/barsearch/uniquebar01.png";
import uniqueBar02 from "../../assets/images/barsearch/uniquebar02.png";
import uniqueBar03 from "../../assets/images/barsearch/uniquebar03.png";
import barNearby01 from "../../assets/images/bar-nearby-1.jpg";
import barNearby02 from "../../assets/images/bar-nearby-2.jpg";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function BarSearch() {
  useEffect(() => {
    let popularBarsSwiper = new Swiper(".popularBarsSwiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,

      breakpoints: {
        768: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        992: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
      },
    });
  }, []);
  useEffect(() => {
    const swiper = new Swiper(".nearby-event-swipe", {
      loop: true,
      watchSlidesProgress: true,
      slidesPerView: "auto",
      slidesPerGroup: 1,
      spaceBetween: 30,
      breakpoints: {
        992: {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <>
      <section
        className="section section-bar-search-banner text-center text-primary-1"
        style={{
          backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.6)
  ), 
  url(${bannerImage})`,
        }}
      >
        <div className="container">
          <div className="main-title mb-6 mb-md-11">
            <h1 className="fs-7 fs-md-5">尋找你周圍最棒的酒吧</h1>
          </div>
          <div className="main-content text-primary-1">
            <div className="input-group mx-auto mb-5">
              <input
                type="text"
                class="form-control p-2 p-md-6 search-input"
                placeholder="立即搜尋"
                aria-label="Search"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              />
              <span className="d-flex input-group-text material-symbols-outlined fs-8 fs-md-5">
                search
              </span>
            </div>
            <div id="selected-tags" className="d-flex flex-wrap mx-auto"></div>
          </div>

          {/* Modal  */}
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    你想找哪兒的酒吧
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-primary-1">
                  <div className="region mb-6">
                    <div className="area text-start mb-5">北部</div>
                    <div className="city-list">
                      <span className="city-item">台北市</span>
                      <span className="city-item">新北市</span>
                      <span className="city-item">基隆市</span>
                      <span className="city-item">桃園市</span>
                      <span className="city-item">新竹市</span>
                      <span className="city-item">新竹縣</span>
                    </div>
                  </div>
                  <div className="region mb-6">
                    <div className="area text-start mb-5">中南部</div>
                    <div className="city-list">
                      <span className="city-item">台中市</span>
                      <span className="city-item">苗栗縣</span>
                      <span className="city-item">彰化縣</span>
                      <span className="city-item">南投縣</span>
                      <span className="city-item">雲林縣</span>
                      <span className="city-item">台南市</span>
                      <span className="city-item">高雄市</span>
                      <span className="city-item">嘉義市</span>
                      <span className="city-item">屏東縣</span>
                    </div>
                  </div>
                  <div className="region mb-6">
                    <div className="area text-start mb-5">東部</div>
                    <div className="city-list">
                      <span className="city-item">宜蘭縣</span>
                      <span className="city-item">花蓮縣</span>
                      <span className="city-item">台東縣</span>
                    </div>
                  </div>
                  <div className="region mb-6">
                    <div className="area text-start mb-5">其他</div>
                    <div className="other-list">
                      <span className="other-item">可訂位</span>
                      <span className="other-item">2~3人</span>
                      <span className="other-item">4~6人</span>
                      <span className="other-item">6人以上</span>
                      <span className="other-item">有包廂</span>
                      <span className="other-item">停車場</span>
                      <span className="other-item">可刷卡</span>
                      <span className="other-item">不限時</span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-light fs-7 rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    關閉
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-light fs-7 rounded-pill"
                    data-bs-dismiss="modal"
                    id="addTagsBtn"
                  >
                    儲存變更
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 全台熱門酒吧 */}
      <section
        className="section sectionPopularBars"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="container">
          <div className="main-title">
            <div className="main-title text-center mb-6 mb-md-12 mb-lg-15">
              <h3 className="fs-8 fs-md-5 mb-1 mb-md-4 eng-font">
                Discover Popular Bars
              </h3>
              <h2 className="fs-7 fs-md-5">全台熱門酒吧 Top6</h2>
            </div>
          </div>

          <div className="main-content">
            {/* Swiper  */}
            <div className="swiper popularBarsSwiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <a href=" barcontent.html" className="d-block">
                    <div
                      className="popularBarsItem d-flex flex-column"
                      style={{
                        backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.6)
  ), 
  url(${popularBar01})`,
                      }}
                    >
                      <div className="title text-neutral-white d-flex mb-auto">
                        <h4 className="fs-7 fs-md-4 eng-font">Indulge</h4>
                        <span className="material-symbols-outlined fs-7 fs-md-4 text-neutral-white ms-auto">
                          favorite
                        </span>
                      </div>
                      <p className="barIntro text-neutral-white fs-8 fs-md-6 mt-auto mb-8 mb-md-6">
                        以創新調酒聞名，曾獲亞洲50最佳酒吧獎，結合在地風味與前衛概念，提供獨特的品飲體驗。
                      </p>
                      <div className="tags text-primary-4 d-flex flex-wrap gap-4">
                        <div className="tag bg-primary-1">可供訂位</div>
                        <div className="tag bg-primary-1">台北市</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="barcontent.html" className="d-block">
                    <div
                      className="popularBarsItem d-flex flex-column"
                      style={{
                        backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.6)
  ), 
  url(${popularBar02})`,
                      }}
                    >
                      <div className="title text-neutral-white d-flex mb-auto">
                        <h4 className="fs-7 fs-md-4 eng-font">Bar Mood</h4>
                        <span className="material-symbols-outlined fs-7 fs-md-4 text-neutral-white ms-auto">
                          favorite
                        </span>
                      </div>
                      <p className="barIntro text-neutral-white fs-8 fs-md-6 mt-auto mb-8 mb-md-6">
                        風格獨特的調酒酒吧，注重細膩口感與美學呈現，調酒師的創意調飲常令人耳目一新。
                      </p>
                      <div className="tags text-primary-4 d-flex flex-wrap gap-4">
                        <div className="tag bg-primary-1">可供訂位</div>
                        <div className="tag bg-primary-1">台北市</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="barcontent.html" className="d-block">
                    <div
                      className="popularBarsItem d-flex flex-column"
                      style={{
                        backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.6)
  ), 
  url(${popularBar03})`,
                      }}
                    >
                      <div className="title text-neutral-white d-flex mb-auto">
                        <h4 className="fs-7 fs-md-4 eng-font">AHA Saloon</h4>
                        <span className="material-symbols-outlined fs-7 fs-md-4 text-neutral-white ms-auto">
                          favorite
                        </span>
                      </div>
                      <p className="barIntro text-neutral-white fs-8 fs-md-6 mt-auto mb-8 mb-md-6">
                        位於東區的隱密酒吧，以復古工業風格和精緻調酒為特色，是當地年輕人聚會的熱點。
                      </p>
                      <div className="tags text-primary-4 d-flex flex-wrap gap-4">
                        <div className="tag bg-primary-1">可供訂位</div>
                        <div className="tag bg-primary-1">台北市</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="barcontent.html" className="d-block">
                    <div
                      className="popularBarsItem d-flex flex-column"
                      style={{
                        backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.6)
  ), 
  url(${popularBar04})`,
                      }}
                    >
                      <div className="title text-neutral-white d-flex mb-auto">
                        <h4 className="fs-7 fs-md-4 eng-font">Ounce Taipei</h4>
                        <span className="material-symbols-outlined fs-7 fs-md-4 text-neutral-white ms-auto">
                          favorite
                        </span>
                      </div>
                      <p className="barIntro text-neutral-white fs-8 fs-md-6 mt-auto mb-8 mb-md-6">
                        隱藏於咖啡廳內的Speakeasy酒吧，提供精緻的經典調酒，氣氛低調私密。
                      </p>
                      <div className="tags text-primary-4 d-flex flex-wrap gap-4">
                        <div className="tag bg-primary-1">可供訂位</div>
                        <div className="tag bg-primary-1">台北市</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="barcontent.html" className="d-block">
                    <div
                      className="popularBarsItem d-flex flex-column"
                      style={{
                        backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.6)
  ), 
  url(${popularBar05})`,
                      }}
                    >
                      <div className="title text-neutral-white d-flex mb-auto">
                        <h4 className="fs-7 fs-md-4 eng-font">Draft Land</h4>
                        <span className="material-symbols-outlined fs-7 fs-md-4 text-neutral-white ms-auto">
                          favorite
                        </span>
                      </div>
                      <p className="barIntro text-neutral-white fs-8 fs-md-6 mt-auto mb-8 mb-md-6">
                        以現拉調酒聞名，創意將調酒如啤酒般從酒桶直接供應，提供快速且高品質的飲品。
                      </p>
                      <div className="tags text-primary-4 d-flex flex-wrap gap-4">
                        <div className="tag bg-primary-1">可供訂位</div>
                        <div className="tag bg-primary-1">台北市</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="swiper-slide">
                  <a href="barcontent.html" className="d-block">
                    <div
                      className="popularBarsItem d-flex flex-column"
                      style={{
                        backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.6)
  ), 
  url(${popularBar01})`,
                      }}
                    >
                      <div className="title text-neutral-white d-flex mb-auto">
                        <h4 className="fs-7 fs-md-4 eng-font">Bar Pun</h4>
                        <span className="material-symbols-outlined fs-7 fs-md-4 text-neutral-white ms-auto">
                          favorite
                        </span>
                      </div>
                      <p className="barIntro text-neutral-white fs-8 fs-md-6 mt-auto mb-8 mb-md-6">
                        以幽默與雙關命名，提供多元風味的調酒，結合輕鬆氛圍與創意調飲，是下班放鬆的好去處。
                      </p>
                      <div className="tags text-primary-4 d-flex flex-wrap gap-4">
                        <div className="tag bg-primary-1">可供訂位</div>
                        <div className="tag bg-primary-1">台北市</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="swiper-button-prev">
                <a href="" className="swiperButton">
                  <span className="material-symbols-outlined">
                    {" "}
                    arrow_back{" "}
                  </span>
                </a>
              </div>
              <div className="swiper-button-next">
                <a href="" className="swiperButton">
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 獨特酒吧  */}
      <section
        className="section section-unique-bars text-primary-1"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="main-title text-center mb-6 mb-md-12 mb-lg-15">
                <h3 className="fs-8 fs-md-5 mb-1 mb-md-4 eng-font">
                  Discover Unique Bars
                </h3>
                <h2 className="fs-7 fs-md-5">全新體驗，台灣獨特酒吧</h2>
              </div>

              <div className="main-content">
                <div className="unique-bar-list mb-11 mb-lg-13">
                  <div className="unique-bar-item d-flex flex-column">
                    <div className="pic">
                      <img src={uniqueBar01} alt="bar" />
                    </div>
                    <div className="txt text-white">
                      <h4 className="fs-6 fs-md-5 my-3 my-md-6">
                        貓下去敦北俱樂部
                      </h4>
                      <div className="tags mb-3 mb-md-5 d-flex flex-wrap gap-3">
                        <span className="tag">可供訂位</span>
                        <span className="tag">台北市</span>
                      </div>
                      <p className="fs-9 fs-md-6 mb-6 mb-md-11">
                        令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                      </p>
                      <div className="more text-primary-1 mt-auto d-flex gap-6 align-items-center">
                        <a
                          href="barcontent.html"
                          className="d-inline-block fs-8 fs-md-6"
                        >
                          查看更多
                        </a>
                        <span className="material-symbols-outlined fs-md-4">
                          chevron_right
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="unique-bar-item d-flex flex-column">
                    <div className="pic">
                      <img src={uniqueBar02} alt="bar" />
                    </div>
                    <div className="txt text-white">
                      <h4 className="fs-6 fs-md-5 my-3 my-md-6">隱士酒吧</h4>
                      <div className="tags mb-3 mb-md-5 d-flex flex-wrap gap-3">
                        <span className="tag">可供訂位</span>
                        <span className="tag">台北市</span>
                      </div>
                      <p className="fs-9 fs-md-6 mb-6 mb-md-11">
                        隱匿於巷弄中的神祕酒吧，擁有獨特的古典氛圍與精緻手工調酒，適合追求低調品味的客人。
                      </p>
                      <div className="more text-primary-1 mt-auto d-flex gap-6 align-items-center">
                        <a
                          href="barcontent.html"
                          className="d-block fs-8 fs-md-6"
                        >
                          查看更多
                        </a>
                        <span className="material-symbols-outlined fs-md-4">
                          chevron_right
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="unique-bar-item d-flex flex-column">
                    <div className="pic">
                      <img src={uniqueBar03} alt="bar" />
                    </div>
                    <div className="txt text-white">
                      <h4 className="fs-6 fs-md-5 my-3 my-md-6">迷霧調酒所</h4>
                      <div className="tags mb-3 mb-md-5 d-flex flex-wrap gap-3">
                        <span className="tag">可供訂位</span>
                        <span className="tag">台中市</span>
                      </div>
                      <p className="fs-9 fs-md-6 mb-6 mb-md-11">
                        以濃烈煙霧效果和創意調酒聞名，店內裝潢充滿神秘感，吸引眾多愛好新奇體驗的酒客。
                      </p>
                      <div className="more text-primary-1 mt-auto d-flex gap-6 align-items-center">
                        <a
                          href="barcontent.html"
                          className="d-block fs-8 fs-md-6"
                        >
                          查看更多
                        </a>
                        <span className="material-symbols-outlined fs-md-4">
                          chevron_right
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="btn-more text-center">
                  <a
                    href="#"
                    className="d-inline-block fs-9 fs-md-6 py-2 py-md-6 px-3 px-10"
                  >
                    了解更多特色酒吧
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 周圍酒吧活動  */}
      <div
        className="nearby-event bg-primary-4"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="container py-lg-15 py-10">
          <div className="nearby-event-title mb-lg-15 mb-6">
            <h3 className="fs-lg-5 fs-md-5 fs-8 text-center text-primary-1 mb-4 eng-font">
              Latest Events Around You
            </h3>
            <h3 className="fs-lg-5 fs-md-4 fs-7 text-center text-primary-1">
              你周圍的最新活動
            </h3>
          </div>
          <div className="nearyby-event-swiper">
            <div className="swiper mySwipe nearby-event-swipe">
              <div className="swiper-wrapper">
                <div className="swiper-slide nearby-card">
                  <img src={barNearby01} alt="bar" />
                  <div className="card-body d-flex py-lg-12 px-lg-10 px-6 py-10 flex-column">
                    <h5 className="fs-lg-5 fs-6 text-neutral-1 eng-font">
                      Mono Mono
                    </h5>
                    <div className="mt-auto">
                      <section className="event-date bg-primary-1 py-lg-3 px-lg-5 py-2 px-3 text-primary-4 mb-5 fs-lg-6 fs-9">
                        <p>週五</p>
                        <p>9/13</p>
                      </section>
                      <p className="card-text text-neutral-1 mb-11 fs-md-6 fs-9 eng-font">
                        TGIF!! 邀請世界知名 DJ
                        Anderson和多位饒舌歌手一起迎接假日，還享限定優惠！
                      </p>
                      <a
                        href="barcontent.html"
                        className="d-flex fs-md-6 fs-8 text-primary-1 align-items-center event-more"
                      >
                        查看更多
                        <span className="material-symbols-outlined fs-lg-5 fs-8 inherit ps-lg-4 ps-2">
                          arrow_forward_ios
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide nearby-card">
                  <img src={barNearby02} alt="bar" />
                  <div className="card-body d-flex py-lg-12 px-lg-10 px-6 py-10 flex-column">
                    <h5 className="fs-lg-5 fs-6 text-neutral-1">隱士餐酒館</h5>
                    <div className="mt-auto">
                      <section className="event-date bg-primary-1 py-lg-3 px-lg-5 py-2 px-3 text-primary-4 mb-5 fs-lg-6 fs-9">
                        <p>週二</p>
                        <p>9/17</p>
                      </section>
                      <p className="card-text text-neutral-1 mb-11 fs-md-6 fs-9">
                        週二夜限定！來餐酒館享受特調雞尾酒買一送一，讓週中夜晚更愉快！
                      </p>
                      <a
                        href="barcontent.html"
                        className="d-flex fs-md-6 fs-8 text-primary-1 align-items-center event-more"
                      >
                        查看更多
                        <span className="material-symbols-outlined fs-lg-5 fs-8 inherit ps-lg-4 ps-2">
                          arrow_forward_ios
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide nearby-card text-start">
                  <img src={barNearby01} alt="bar" />
                  <div className="card-body d-flex py-lg-12 px-lg-10 px-6 py-10 flex-column">
                    <h5 className="fs-lg-5 fs-6 text-neutral-1">隱士餐酒館</h5>
                    <div className="mt-auto">
                      <section className="event-date bg-primary-1 py-lg-3 px-lg-5 py-2 px-3 text-primary-4 mb-5 fs-lg-6 fs-9">
                        <p>週二</p>
                        <p>9/17</p>
                      </section>
                      <p className="card-text text-neutral-1 mb-11 fs-md-6 fs-9">
                        週二夜限定！來餐酒館享受特調雞尾酒買一送一，讓週中夜晚更愉快！
                      </p>
                      <a
                        href="barcontent.html"
                        className="d-flex fs-md-6 fs-8 text-primary-1 align-items-center event-more"
                      >
                        查看更多
                        <span className="material-symbols-outlined fs-lg-5 fs-8 inherit ps-lg-4 ps-2">
                          arrow_forward_ios
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide nearby-card text-start">
                  <img src={barNearby02} alt="bar" />
                  <div className="card-body d-flex py-lg-12 px-lg-10 px-6 py-10 flex-column">
                    <h5 className="fs-lg-5 fs-6 text-neutral-1 eng-font">
                      Mono Mono
                    </h5>
                    <div className="mt-auto">
                      <section className="event-date bg-primary-1 py-lg-3 px-lg-5 py-2 px-3 text-primary-4 mb-5 fs-lg-6 fs-9">
                        <p>週五</p>
                        <p>9/13</p>
                      </section>
                      <p className="card-text text-neutral-1 mb-11 fs-md-6 fs-9 eng-font">
                        TGIF!! 邀請世界知名 DJ
                        Anderson和多位饒舌歌手一起迎接假日，還享限定優惠！
                      </p>
                      <a
                        href="barcontent.html"
                        className="d-flex fs-md-6 fs-8 text-primary-1 align-items-center event-more"
                      >
                        查看更多
                        <span className="material-symbols-outlined fs-lg-5 fs-8 inherit ps-lg-4 ps-2">
                          arrow_forward_ios
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="swiper-button-next">
                <a
                  href=""
                  className="swiperButton d-block d-flex align-items-center"
                >
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="swiper-button-prev">
                <a
                  href=""
                  className="swiperButton d-block d-flex a;ign-items-center"
                >
                  <span className="material-symbols-outlined">
                    {" "}
                    arrow_back{" "}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
