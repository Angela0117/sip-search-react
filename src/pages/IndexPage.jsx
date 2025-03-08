import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function IndexPage() {

  useEffect(() => {
    // 初始化首頁熱門酒譜swiper
    new Swiper('.swiper-popular-recipe', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      speed: 1200,
      slidesOffsetBefore: 50,
      spaceBetween: 20,
      breakpoints: {
        320: {
          slidesOffsetBefore: 50,
        },
        576: {
          slidesOffsetBefore: 100,
        },
        768: {
          slidesOffsetBefore: 200,
          spaceBetween: 20,
        },
        1280: {
          slidesOffsetBefore: 300,
          spaceBetween: 72,
        },
      },
      mousewheel: true,
      mousewheel: {
        releaseOnEdges: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    // 初始化首頁熱門酒吧swiper
    new Swiper('.swiper-popular-bars', {
      loop: true,
      speed: 2000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);



  return (
    <>

      <div
        className="modal fade"
        id="ageVerificationModal"
        tabIndex="-1"
        aria-labelledby="ageVerificationModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered custom-modal-width">
          <div className="modal-content">
            <div className="modal-body modal-border-primary-1">
              <div className="decoration">
                <div className="wrap-1"></div>
              </div>
              <img
                className="modalImg mt-lg-9 mb-lg-10 mt-5 mb-6"
                src="/sip-search-react/assets/images/image-sip&search chi.png"
                alt="sip&search"
              />
              <div className="text-center mb-lg-10 mb-5">
                <h5
                  className="text-primary-1 mb-lg-10 mb-2 fs-9 fs-lg-6"
                  id="ageVerificationModalLabel"
                >
                  請問您是否已年滿18歲？
                </h5>
                <p className="text-primary-1 fs-lg-8 fs-10">未滿18歲禁止飲酒</p>
                <p className="text-primary-1 fs-lg-8 fs-10">禁止酒駕</p>
              </div>
              <div className="d-flex flex-column align-items-center mb-8">
                <button
                  type="button"
                  className="btn btn-index-primary1 fs-lg-6 py-lg-4 px-lg-5 mb-lg-6 fs-9 py-2 px-7 mb-3"
                  id="btnYes"
                >
                  是，我已滿18歲
                </button>
                <button
                  type="button"
                  className="btn btn-index-primaryl-transparent fs-lg-6 py-lg-4 px-lg-5 fs-9 py-2 px-7"
                  id="btnNo"
                >
                  否，我未滿18歲
                </button>
              </div>
              <div className="decoration">
                <div className="wrap-2 ms-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 第一區  */}
      <div className="banner">
        <div className="container">
          <div className="banner-content">
            <div data-aos="fade-down" data-aos-duration="1500">
              <h2 className="banner-title m-auto">探索微醺魅力，從這裡開始</h2>
            </div>
            <div className="d-flex mb-lg-6 mb-3 banner-selector-input justify-content-center align-items-center">
              <div className="d-flex text-nowrap me-lg-6 me-md-3 me-1">
                <button
                  type="button"
                  className="btn-index-primaryl-transparent banner-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop-2"
                >
                  酒譜
                </button>
                <button
                  type="button"
                  className="btn-index-primaryl-transparent banner-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  酒吧
                </button>
              </div>
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content pt-6">
                    <a
                      href="#"
                      className="d-flex justify-content-center ms-auto mb-6 me-5"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span className="material-symbols-outlined text-primary-1">
                        cancel
                      </span>
                    </a>
                    <div className="modal-body">
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">北部</p>
                        <ul className="row row-cols-4 gx-0 gy-4">
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              台北市
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              新北市
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              基隆市
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              桃園市
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              新竹市
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              新竹縣
                            </a>
                          </li>
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">中南部</p>
                        <ul className="row row-cols-4 gx-0 gy-4">
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              苗栗縣
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              台中市
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              彰化縣
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              南投縣
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              雲林縣
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              嘉義縣
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              台南市
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              高雄市
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              屏東縣
                            </a>
                          </li>
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">東部</p>
                        <ul className="row row-cols-4 gx-0 gy-4">
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              宜蘭縣
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              花蓮縣
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              台東縣
                            </a>
                          </li>
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">離島</p>
                        <ul className="row row-cols-4 gx-0 gy-4">
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              金門縣
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              澎湖縣
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              馬祖縣
                            </a>
                          </li>
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">其他</p>
                        <ul className="row row-cols-4 gx-0 gy-4">
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              可訂位
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              2~3人
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              4~6人
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              6人以上
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              有包廂
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              停車場
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              可刷卡
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              不限時
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="staticBackdrop-2"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content pt-6">
                    <a
                      href="#"
                      className="d-flex justify-content-center ms-auto mb-6 me-5"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span className="material-symbols-outlined text-primary-1">
                        cancel
                      </span>
                    </a>
                    <div className="modal-body">
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">基酒</p>
                        <ul className="row row-cols-4 gx-0 gy-4">
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              琴酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              伏特加
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              白蘭地
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              蘭姆酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              龍舌蘭
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              威士忌
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              苦艾酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              燒酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              苦酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              香艾酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              麗葉酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              茴香酒
                            </a>
                          </li>
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">果酒</p>
                        <ul className="row row-cols-4 gx-0 gy-4">
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              啤酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              甜酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              葡萄酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              利口酒
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              梅酒
                            </a>
                          </li>
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">點綴</p>
                        <ul className="row row-cols-4 gx-0 gy-4">
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              水果
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              果汁
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              可可粉
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              鮮奶油
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              調味飲品
                            </a>
                          </li>
                          <li className="col">
                            <a
                              href="#"
                              className="btn btn-outline-primary-1 rounded-pill fs-7"
                            >
                              糖漿
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-group boder-primary-1 d-flex">
                <label htmlFor="search" className="htmlform-label d-none">
                  搜尋
                </label>
                <input
                  type="text"
                  className="form-control fs-lg-7 fs-9"
                  id="search"
                  placeholder="立即搜尋"
                  aria-label="立即搜尋"
                  aria-describedby="button-addon2"
                />
                <a href="#" className="p-lg-3 p-md-2 p-1 text-align-center d-inline-flex">
                  <span
                    href="#"
                    className="material-symbols-outlined index-brightness align-middle fs-lg-5 fs-8"
                  >
                    search
                  </span>
                </a>
              </div>
            </div>

            <div className="search d-flex justify-content-lg-start justify-content-md-start justify-content-center align-items-center">
              <div className="search-empty me-lg-6 me-md-3 me-1"></div>
              <div className="search-result d-flex justify-content-between">
                <ul className="d-flex gap-6 m-0 text-nowrap" data-aos="fade-up">
                  <li className="rounded-pill index-rounded-btn">
                    <a
                      href="#"
                      className="d-flex fs-10 align-items-center text-primary-4"
                    >
                      台北市
                      <span className="material-symbols-outlined ms-2 fs-8">
                        close
                      </span>
                    </a>
                  </li>
                  <li className="rounded-pill index-rounded-btn">
                    <a
                      href="#"
                      className="d-flex fs-10 align-items-center text-primary-4"
                    >
                      停車場
                      <span className="material-symbols-outlined ms-2 fs-8">
                        close
                      </span>
                    </a>
                  </li>
                </ul>
                <div className="ms-auto text-primary-1 d-none d-md-block d-lg-block index-brightness">
                  <a
                    href="#"
                    className="text-center animate__animated animate__slideInUp fs-9"
                  >
                    清除所有條件
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 第二三區  */}
      <div className="webinfo-1 py-lg-11 py-10">

        <div className="container">
          <div className="content">
            <div
              data-aos="fade-down"
              data-aos-duration="1500"
              className="mb-lg-13 mb-6"
            >
              <h3 className="fs-lg-5 fs-md-6 fs-9 text-center text-primary-4 eng-font mb-lg-4 mb-1">
                Discover Recipes & Local Bars
              </h3>
              <h3 className="fs-lg-5 fs-md-6 fs-8 text-center text-primary-4">
                探索調酒與酒吧
              </h3>
            </div>
            <div
              className="discover-cocktail"
              data-aos="zoom-out-up"
              data-aos-duration="1500"
            >
              <div className="discover-container d-flex">
                <div className="img-ctrl">
                  <img
                    className="discover-img"
                    src="/sip-search-react/assets/images/webinfo-1.jpg"
                    alt="cocktail"
                  />
                </div>
                <div className="discover-text">
                  <p className="fs-lg-6 fs-md-8 fs-9 fw-normal text-primary-4 pb-lg-12 pb-4">
                    探索專屬調酒之旅，
                    <br />
                    輕鬆找尋酒譜，
                    <br />
                    每一杯都是放鬆時光！
                  </p>
                  <div className="btn-md">
                    <a
                      href="https://vicfirth5a.github.io/sip-search/recipessearch"
                      className="btn-search btn-index-primaryl-light d-flex"
                    >
                      我想找酒譜
                      <span className="material-symbols-outlined ms-3">
                        arrow_forward_ios
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="discover-bar"
              data-aos="zoom-out-up"
              data-aos-duration="1500"
            >
              <div className="discover-container d-flex">
                <div className="discover-text">
                  <p className="fs-lg-6 fs-md-8 fs-9 fw-normal text-primary-1 pb-lg-12 pb-4">
                    探索台灣隱藏酒吧，
                    <br />
                    從城市到鄉鎮，
                    <br />
                    發現喝酒的好去處！
                  </p>
                  <div className="btn-md">
                    <a
                      href="https://vicfirth5a.github.io/sip-search/barsearch"
                      className="btn-search btn-index-primary1 d-flex"
                    >
                      我想找酒吧
                      <span className="material-symbols-outlined ms-3">
                        arrow_forward_ios
                      </span>
                    </a>
                  </div>
                </div>
                <div className="img-ctrl">
                  <img
                    className="discover-img"
                    src="/sip-search-react/assets/images/webinfo-2.jpg"
                    alt="cocktail"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 第四區  */}
      <div className="webinfo-2 py-lg-11 py-10">
        <div className="container">
          <div className="content join-text">
            <div data-aos="fade-down" data-aos-duration="1500">
              <h2 className="h3 text-primary-1 text-center fs-lg-5 fs-7 mb-6">
                加入會員
                <br />
                解鎖每月專屬微醺體驗
              </h2>
            </div>
            <div className="text-center d-flex justify-content-center join-input m-auto">
              <div className="input-group join-input-text">
                <span className="input-group-text">
                  <span className="material-symbols-outlined text-primary-1 fs-lg-4 fs-8">
                    mail
                  </span>
                </span>
                <input
                  type="text"
                  placeholder="請輸入您的 Email"
                  className="form-control text-primary-1 eng-font mt-2"
                />
              </div>
              <a
                href="#"
                className="btn-rs-primary-4 join-input-btn fs-lg-7 fs-9 text-nowrap"
              >
                加入會員
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* 熱門酒譜  */}
      <section className="section section-popular-recipes bg-dark-brown">
        <div className="container-fluid">
          <div className="main-title text-primary-1 text-center mb-6 mb-md-13">
            <div data-aos="fade-down" data-aos-duration="1500">
              <h3 className="fs-9 fs-lg-5 mb-1 mb-md-4 eng-font">
                Popular Recipes
              </h3>
              <h2 className="fs-8 fs-lg-5">熱門酒譜</h2>
            </div>
          </div>

          <div className="main-content">
            <div className="swiper swiper-popular-recipe">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="wine-card p-6 p-lg-12">
                    <div className="decoration pb-5 mb-6">
                      <div className="wrap"></div>
                    </div>

                    <div className="wine-card-body d-flex flex-column flex-lg-row justify-content-lg-between gap-3 gap-lg-11">
                      <div className="txt d-flex flex-column text-primary-4">
                        <div className="wine-name">
                          <h3 className="fs-6 fs-lg-4 mb-1 mb-lg-3 eng-font">
                            Jungle Bird
                          </h3>
                          <h4 className="fs-7 fs-lg-5">叢林鳥</h4>
                        </div>
                        <div className="wine-tags d-flex mt-6 mt-lg-auto mb-6 gap-4">
                          <span className="d-block px-2 px-lg-4 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            琴酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            甜苦艾酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            鳳梨
                          </span>
                        </div>
                        <div className="wine-intro">
                          一款充滿熱帶風情的經典雞尾酒，以黑朗姆酒為基底，搭配鳳梨汁、萊姆汁、甘蔗糖漿及苦艾酒調製而成。酸甜的口感與豐富的層次感，讓人彷彿置身熱帶叢林。
                        </div>
                      </div>
                      <div className="pic position-relative">
                        <img
                          src="/sip-search-react/assets/images/index_wine/wine01.png"
                          alt="wine"
                        />
                        <div className="arrow position-absolute bottom-0 end-0">
                          <a
                            href="./wine-content.html"
                            className="d-flex align-items-center justify-content-center text-white rounded-circle"
                          >
                            <span className="material-symbols-outlined d-block">
                              arrow_forward
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="wine-card p-6 p-lg-12">
                    <div className="decoration pb-5 mb-6">
                      <div className="wrap"></div>
                    </div>

                    <div className="wine-card-body d-flex flex-column flex-lg-row justify-content-lg-between gap-3 gap-lg-11">
                      <div className="txt d-flex flex-column text-primary-4">
                        <div className="wine-name">
                          <h3 className="fs-6 fs-lg-4 mb-1 mb-lg-3 eng-font">
                            Negroni
                          </h3>
                          <h4 className="fs-7 fs-lg-5">尼格羅尼</h4>
                        </div>
                        <div className="wine-tags d-flex mt-6 mt-lg-auto mb-6 gap-4">
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            琴酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            甜苦艾酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            金巴利
                          </span>
                        </div>
                        <div className="wine-intro">
                          源自義大利的經典雞尾酒，風味濃郁、層次豐富又易調製。帶有明顯的草本與苦味，並以橙皮作為裝飾。適合喜愛苦中帶甘的飲酒愛好者。
                        </div>
                      </div>
                      <div className="pic position-relative">
                        <img
                          src="/sip-search-react/assets/images/index_wine/wine02.png"
                          alt="wine"
                        />
                        <div className="arrow position-absolute bottom-0 end-0">
                          <a
                            href="./wine-content.html"
                            className="d-flex align-items-center justify-content-center text-white rounded-circle"
                          >
                            <span className="material-symbols-outlined d-block fs-lg-4">
                              arrow_forward
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="wine-card p-6 p-lg-12">
                    <div className="decoration pb-5 mb-6">
                      <div className="wrap"></div>
                    </div>

                    <div className="wine-card-body d-flex flex-column flex-lg-row justify-content-lg-between gap-3 gap-lg-11">
                      <div className="txt d-flex flex-column text-primary-4">
                        <div className="wine-name">
                          <h3 className="fs-6 fs-lg-4 mb-1 mb-lg-3 eng-font">
                            Margarita
                          </h3>
                          <h4 className="fs-7 fs-lg-5">瑪格麗特</h4>
                        </div>
                        <div className="wine-tags d-flex mt-6 mt-lg-auto mb-6 gap-4">
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            琴酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            甜苦艾酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            金巴利
                          </span>
                        </div>
                        <div className="wine-intro">
                          經典的墨西哥雞尾酒，由龍舌蘭酒、萊姆汁和橙酒調製而成，並以鹽邊杯盛裝。酸甜適中的口感，結合龍舌蘭的獨特風味，成為夏日清爽解渴的最佳選擇。
                        </div>
                      </div>
                      <div className="pic position-relative">
                        <img
                          src="/sip-search-react/assets/images/index_wine/wine03.png"
                          alt="wine"
                        />
                        <div className="arrow position-absolute bottom-0 end-0">
                          <a
                            href="./wine-content.html"
                            className="d-flex align-items-center justify-content-center text-white rounded-circle"
                          >
                            <span className="material-symbols-outlined d-block fs-lg-4">
                              arrow_forward
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="wine-card p-6 p-lg-12">
                    <div className="decoration pb-5 mb-6">
                      <div className="wrap"></div>
                    </div>

                    <div className="wine-card-body d-flex flex-column flex-lg-row justify-content-lg-between gap-3 gap-lg-11">
                      <div className="txt d-flex flex-column text-primary-4">
                        <div className="wine-name">
                          <h3 className="fs-6 fs-lg-4 mb-1 mb-lg-3 eng-font">
                            Boulevardier
                          </h3>
                          <h4 className="fs-7 fs-lg-5">花花公子</h4>
                        </div>
                        <div className="wine-tags d-flex mt-6 mt-lg-auto mb-6 gap-4">
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            琴酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            甜苦艾酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            金巴利
                          </span>
                        </div>
                        <div className="wine-intro">
                          一款風格時尚的雞尾酒，通常以伏特加或龍舌蘭為基底，加入蔓越莓汁、橙酒與檸檬汁調製而成。酸甜清爽的口感，搭配鮮豔的顏色，為派對增添一抹活力和誘惑。
                        </div>
                      </div>
                      <div className="pic position-relative">
                        <img
                          src="/sip-search-react/assets/images/index_wine/wine04.png"
                          alt="wine"
                        />
                        <div className="arrow position-absolute bottom-0 end-0">
                          <a
                            href="./wine-content.html"
                            className="d-flex align-items-center justify-content-center text-white rounded-circle"
                          >
                            <span className="material-symbols-outlined d-block fs-lg-4">
                              arrow_forward
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="wine-card p-6 p-lg-12">
                    <div className="decoration pb-5 mb-6">
                      <div className="wrap"></div>
                    </div>

                    <div className="wine-card-body d-flex flex-column flex-lg-row justify-content-lg-between gap-3 gap-lg-11">
                      <div className="txt d-flex flex-column text-primary-4">
                        <div className="wine-name">
                          <h3 className="fs-6 fs-lg-4 mb-1 mb-lg-3 eng-font">
                            Aperol Spritz
                          </h3>
                          <h4 className="fs-7 fs-lg-5">阿佩羅雞尾酒</h4>
                        </div>
                        <div className="wine-tags d-flex mt-6 mt-lg-auto mb-6 gap-4">
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            琴酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            甜苦艾酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            金巴利
                          </span>
                        </div>
                        <div className="wine-intro">
                          一款清爽的義大利經典雞尾酒，由阿佩羅苦味酒、氣泡酒（通常是普羅賽克）和蘇打水調製而成。其橙色外觀與微苦的果香口感，完美適合作為夏日午後的輕飲選擇。
                        </div>
                      </div>
                      <div className="pic position-relative">
                        <img
                          src="/sip-search-react/assets/images/index_wine/wine05.png"
                          alt="wine"
                        />
                        <div className="arrow position-absolute bottom-0 end-0">
                          <a
                            href="./wine-content.html"
                            className="d-flex align-items-center justify-content-center text-white rounded-circle"
                          >
                            <span className="material-symbols-outlined d-block fs-lg-4">
                              arrow_forward
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="wine-card p-6 p-lg-12">
                    <div className="decoration pb-5 mb-6">
                      <div className="wrap"></div>
                    </div>

                    <div className="wine-card-body d-flex flex-column flex-lg-row justify-content-lg-between gap-3 gap-lg-11">
                      <div className="txt d-flex flex-column text-primary-4">
                        <div className="wine-name">
                          <h3 className="fs-6 fs-lg-4 mb-1 mb-lg-3 eng-font">
                            Olympic
                          </h3>
                          <h4 className="fs-7 fs-lg-5">奧林匹克</h4>
                        </div>
                        <div className="wine-tags d-flex mt-6 mt-lg-auto mb-6 gap-4">
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            琴酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            甜苦艾酒
                          </span>
                          <span className="d-block px-2 px-lg-6 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">
                            金巴利
                          </span>
                        </div>
                        <div className="wine-intro">
                          優雅的經典雞尾酒，由白蘭地、橙酒和新鮮橙汁調製而成。口感圓潤，融合了果香和濃郁的酒體，讓人感受到層次分明的滋味，是一款適合各種場合的經典選擇。
                        </div>
                      </div>
                      <div className="pic position-relative">
                        <img
                          src="/sip-search-react/assets/images/index_wine/wine06.png"
                          alt="wine"
                        />
                        <div className="arrow position-absolute bottom-0 end-0">
                          <a
                            href="./wine-content.html"
                            className="d-flex align-items-center justify-content-center text-white rounded-circle"
                          >
                            <span className="material-symbols-outlined d-block fs-lg-4">
                              arrow_forward
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="swiper-pagination"></div>  */}
            </div>
          </div>
        </div>
      </section>
      {/* 熱門酒吧  */}
      <section className="section section-popular-bars bg-dark-brown">
        <div className="container">
          <div className="main-title text-center mb-lg-11 mb-6">
            <div data-aos="fade-down" data-aos-duration="1500">
              <h3 className="fs-9 fs-lg-5 mb-1 mb-md-4 eng-font">
                Popular Bars
              </h3>
              <h2 className="fs-8 fs-lg-5">熱門酒吧</h2>
            </div>
          </div>

          <div className="button-row d-flex justify-content-end">
            <div className="d-flex justify-content-center me-3 me-md-8">
              <a href="#" className="swiper-button-prev swiper-button">
                <span className="material-symbols-outlined fs-7 fs-lg-4 inherit">
                  arrow_back
                </span>
              </a>
            </div>
            <div className="d-flex justify-content-center">
              <a href="#" className="swiper-button-next swiper-button">
                <span className="material-symbols-outlined d-block fs-7 fs-lg-4">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          {/* Slider main container  */}
          <div className="row" data-aos="fade-up" data-aos-duration="3000">
            <div className="col">
              <div className="swiper swiper-popular-bars">
                {/* Additional required wrapper  */}
                <div className="swiper-wrapper">
                  {/* Slides  */}
                  <div className="swiper-slide position-relative">
                    <img
                      src="/sip-search-react/assets/images/index_bar/bar01.png"
                      alt="bar"
                      className="bar-pic"
                    />

                    <div className="content d-flex position-absolute top-0 bottom-0 w-100 flex-column flex-lg-row">
                      <div className="main-content d-flex flex-column justify-content-between flex-grow-1">
                        <h2 className="title fs-6 fs-lg-5">
                          貓下去敦北俱樂部
                        </h2>

                        <div className="txt mt-auto d-flex flex-column">
                          <div className="tag rounded-pill mb-4 mb-lg-6 d-flex align-items-center">
                            最多人按讚
                          </div>

                          <div className="txt-content d-flex flex-column flex-lg-row justify-content-lg-between">
                            <div className="introduce fs-8 fs-lg-6">
                              結合復古風情與現代創意，提供精緻調酒與特別氛圍，是品味夜晚的絕佳去處！
                            </div>

                            <div className="btn-md mt-6">
                              <a
                                href="./barcontent.html"
                                className="btn-search btn-index-primaryl-light d-flex justify-content-between"
                              >
                                查看更多
                                <span className="material-symbols-outlined fs-lg-6 fs-7">
                                  chevron_right
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide position-relative">
                    <img
                      src="/sip-search-react/assets/images/index_bar/bar02.jpg"
                      alt="bar"
                      className="bar-pic"
                    />

                    <div className="content d-flex position-absolute top-0 bottom-0 w-100 flex-column flex-lg-row">
                      <div className="main-content d-flex flex-column justify-content-between flex-grow-1">
                        <h2 className="title fs-6 fs-lg-5s eng-font">
                          Indulge Experimental Bistro
                        </h2>

                        <div className="txt mt-auto d-flex flex-column">
                          <div className="tag rounded-pill mb-4 mb-lg-6 d-flex align-items-center">
                            最多人按讚
                          </div>

                          <div className="txt-content d-flex flex-column flex-lg-row justify-content-lg-between">
                            <div className="introduce fs-8 fs-lg-6">
                              以創新調酒聞名，曾獲亞洲50最佳酒吧獎，結合在地風味與前衛概念，提供獨特的品飲體驗。
                            </div>

                            <div className="btn-md mt-6">
                              <a
                                href="./barcontent.html"
                                className="btn-search btn-index-primaryl-light d-flex justify-content-between"
                              >
                                查看更多
                                <span className="material-symbols-outlined fs-lg-6 fs-7">
                                  chevron_right
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide position-relative">
                    <img
                      src="/sip-search-react/assets/images/index_bar/bar03.jpg"
                      alt="bar"
                      className="bar-pic"
                    />

                    <div className="content d-flex position-absolute top-0 bottom-0 w-100 flex-column flex-lg-row">
                      <div className="main-content d-flex flex-column justify-content-between flex-grow-1">
                        <h2 className="title fs-6 fs-lg-5">
                          酒客 <span className="eng-font"> Bar Pun</span>
                        </h2>

                        <div className="txt mt-auto d-flex flex-column">
                          <div className="tag rounded-pill mb-4 mb-lg-6 d-flex align-items-center">
                            最多人按讚
                          </div>

                          <div className="txt-content d-flex flex-column flex-lg-row justify-content-lg-between">
                            <div className="introduce fs-8 fs-lg-6">
                              提供多元風味的調酒，結合輕鬆氛圍與創意調飲，是下班放鬆的好去處。
                            </div>

                            <div className="btn-md mt-6">
                              <a
                                href="./barcontent.html"
                                className="btn-search btn-index-primaryl-light d-flex justify-content-between"
                              >
                                查看更多
                                <span className="material-symbols-outlined fs-lg-6 fs-7">
                                  chevron_right
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide position-relative">
                    <img
                      src="/sip-search-react/assets/images/index_bar/bar04.jpg"
                      alt="bar"
                      className="bar-pic"
                    />

                    <div className="content d-flex position-absolute top-0 bottom-0 w-100 flex-column flex-lg-row">
                      <div className="main-content d-flex flex-column justify-content-between flex-grow-1">
                        <h2 className="title fs-6 fs-lg-5 eng-font">
                          Bar Mood
                        </h2>

                        <div className="txt mt-auto d-flex flex-column">
                          <div className="tag rounded-pill mb-4 mb-lg-6 d-flex align-items-center">
                            最多人按讚
                          </div>

                          <div className="txt-content d-flex flex-column flex-lg-row justify-content-lg-between">
                            <div className="introduce fs-8 fs-lg-6">
                              風格獨特的調酒酒吧，注重細膩口感與美學呈現，調酒師的創意調飲常令人耳目一新。
                            </div>

                            <div className="btn-md mt-6">
                              <a
                                href="./barcontent.html"
                                className="btn-search btn-index-primaryl-light d-flex justify-content-between"
                              >
                                查看更多
                                <span className="material-symbols-outlined fs-lg-6 fs-7">
                                  chevron_right
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide position-relative">
                    <img
                      src="/sip-search-react/assets/images/index_bar/bar05.jpg"
                      alt="bar"
                      className="bar-pic"
                    />

                    <div className="content d-flex position-absolute top-0 bottom-0 w-100 flex-column flex-lg-row">
                      <div className="main-content d-flex flex-column justify-content-between flex-grow-1">
                        <h2 className="title fs-6 fs-lg-5">迷霧調酒所</h2>

                        <div className="txt mt-auto d-flex flex-column">
                          <div className="tag rounded-pill mb-4 mb-lg-6 d-flex align-items-center">
                            最多人按讚
                          </div>

                          <div className="txt-content d-flex flex-column flex-lg-row justify-content-lg-between">
                            <div className="introduce fs-8 fs-lg-6">
                              以濃烈煙霧效果和創意調酒聞名，店內裝潢充滿神秘感，吸引眾多愛好新奇體驗的酒客。
                            </div>

                            <div className="btn-md mt-6">
                              <a
                                href="./barcontent.html"
                                className="btn-search btn-index-primaryl-light d-flex justify-content-between"
                              >
                                查看更多
                                <span className="material-symbols-outlined fs-lg-6 fs-7">
                                  chevron_right
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- If we need pagination --> */}
                {/* <!-- <div className="swiper-pagination"></div> --> */}

                {/* <!-- If we need navigation buttons --> */}
                {/* <!-- <div className="swiper-button-prev"></div> */}
                {/* <div className="swiper-button-next"></div> --> */}

                {/* <!-- If we need scrollbar --> */}
                {/* <!-- <div className="swiper-scrollbar"></div> --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 最新活動 --> */}
      <div className="container">
        <section className="event">
          <div
            className="event-title text-center"
            data-aos="fade-down"
            data-aos-duration="1500"
          >
            <p className="eng-font fs-9 fs-lg-5 text-primary-1 mb-md-4 mb-1">
              Latest Events
            </p>
            <h2 className="fs-8 fs-lg-5 text-primary-1">最新活動</h2>
          </div>

          <div
            className="event-content"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className="event-bg">
              <div className="event-theme">
                <h2 className="fs-7 fs-md-6 fs-lg-5 text-primary-1">換友俱樂部</h2>
              </div>
            </div>

            <div className="event-list bg-primary-4">
              <div className="event-list-title mb-6 mb-md-11">
                <h3 className="fs-8 fs-md-6 fs-lg-5 text-primary-1 border-bottom pb-4">
                  近期酒吧活動
                </h3>
              </div>

              <ul className="event-list-content  fw-medium">
                <li className="event-list-card">
                  {/* <!-- 會員專區暫存連結 --> */}
                  <a className="event-list-a border p-5" href="barcontent.html">
                    <div className="event-list-card-date fs-9 fs-lg-7 d-flex justify-content-center align-items-center bg-primary-1 text-primary-4">
                      <p>
                        週三
                        <span className="eng-font ms-2 ms-lg-4">9/11</span>
                      </p>
                    </div>
                    <div className="list-card-name d-flex justify-content-between align-items-center text-neutral-1">
                      <p className="fs-8 fs-lg-6">
                        台北＿<span className="eng-font">Fuzzy April</span>
                        四月餐酒館
                      </p>
                      <span className="material-symbols-outlined">
                        arrow_forward_ios
                      </span>
                    </div>
                  </a>
                </li>

                <li className="event-list-card">
                  <a className="event-list-a border p-5" href="barcontent.html">
                    <div className="event-list-card-date fs-9 fs-lg-7 d-flex justify-content-center align-items-center bg-primary-1 text-primary-4">
                      <p>
                        週五
                        <span className="eng-font ms-2 ms-lg-4">9/13</span>
                      </p>
                    </div>
                    <div className="list-card-name d-flex justify-content-between align-items-center text-neutral-1">
                      <p className="fs-8 fs-lg-6">
                        台北＿<span className="eng-font">Mono Mono</span>
                      </p>
                      <span className="material-symbols-outlined">
                        arrow_forward_ios
                      </span>
                    </div>
                  </a>
                </li>

                <li className="event-list-card">
                  <a className="event-list-a border p-5" href="barcontent.html">
                    <div className="event-list-card-date fs-9 fs-lg-7 d-flex justify-content-center align-items-center bg-primary-1 text-primary-4">
                      <p>
                        週二
                        <span className="eng-font ms-2 ms-lg-4">9/17</span>
                      </p>
                    </div>
                    <div className="list-card-name mt-1 d-flex justify-content-between align-items-center text-neutral-1">
                      <p className="fs-8 fs-lg-6">新竹＿隱士餐酒館</p>
                      <span className="material-symbols-outlined">
                        arrow_forward_ios
                      </span>
                    </div>
                  </a>
                </li>

                <li className="event-list-card">
                  <a className="event-list-a border p-5" href="barcontent.html">
                    <div className="event-list-card-date fs-9 fs-lg-7 d-flex justify-content-center align-items-center bg-primary-1 text-primary-4">
                      <p>
                        週六
                        <span className="eng-font ms-2 ms-lg-4">9/21</span>
                      </p>
                    </div>
                    <div className="list-card-name mt-1 d-flex justify-content-between align-items-center text-neutral-1">
                      <p className="fs-8 fs-lg-6">
                        台中＿
                        <span className="eng-font">P.S. I LOVE YOU BAR</span>
                      </p>
                      <span className="material-symbols-outlined">
                        arrow_forward_ios
                      </span>
                    </div>
                  </a>
                </li>
              </ul>

              <a className="d-block" href="barcontent.html">
                <div className="event-btn d-flex justify-content-end align-items-center">
                  <p className="fs-8 fs-lg-7 me-6">查看更多</p>
                  <span className="material-symbols-outlined">
                    arrow_forward_ios
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
        <section className="comments text-primary-4">
          <div
            className="comments-title text-center"
            data-aos="fade-down"
            data-aos-duration="1500"
          >
            <p className="eng-font fs-9 fs-lg-5 text-primary-1 mb-md-4 mb-1">
              Top Comments
            </p>
            <h2 className="fs-8 fs-lg-5 text-primary-1">熱門留言</h2>
          </div>

          <ul className="comments-list bg-primary-1 d-flex">
            <li className="comments-list-item" data-aos="zoom-in-right">
              <div className="comments-list-item-title d-flex mb-lg-8 mb-6">
                <img src="/sip-search-react/assets/images/Ellipse 6.png" alt="user-1" />
                <div className="comments-list-item-name ms-5 d-flex flex-column">
                  <h3 className="eng-font fs-7 fs-lg-5 text-primary-3">
                    eilloee
                  </h3>
                  <div className="d-flex align-items-center mt-auto">
                    <span className="material-symbols-outlined comments-icon">
                      location_on
                    </span>
                    <p className="eng-font fs-8 fs-lg-7 ms-2">
                      The Whiskey House
                    </p>
                  </div>
                </div>
              </div>
              <p className="comments-list-item-text fs-9 fs-lg-7 mb-lg-8 mb-6">
                第一次來，這裡提供高雅的氛圍，柔軟的座椅與昏暗的燈光非常適合私密對話。調酒單獨具創意，經典與現代完美融合。服務人員周到且細心。對於喜愛精緻飲品和舒適環境的人來說，這是一個不容錯過的好地方！
              </p>
              <a
                href="barcontent.html"
                className="comments-list-item-btn d-flex justify-content-between"
              >
                <p className="fs-9 fs-lg-6">查看更多</p>
                <span className="material-symbols-outlined fs-9 fs-lg-6">
                  arrow_forward_ios
                </span>
              </a>
            </li>

            <div className="comments-divider"></div>
            {/* <!-- 中間的間隔線 --> */}

            <li
              className="comments-list-item"
              data-aos="zoom-in-left"
              data-aos-delay="300"
            >
              <div className="comments-list-item-title d-flex mb-lg-8 mb-6">
                <img src="/sip-search-react/assets/images/Ellipse 2.png" alt="user-2" />
                <div className="comments-list-item-name ms-5 d-flex flex-column">
                  <h3 className="eng-font fs-7 fs-md-5 text-primary-3">
                    Mindy Lo
                  </h3>
                  <div className="d-flex align-items-center mt-auto">
                    <span className="material-symbols-outlined comments-icon">
                      location_on
                    </span>
                    <p className="fs-8 fs-lg-7 ms-2">絨夜酒吧</p>
                  </div>
                </div>
              </div>
              <p className="comments-list-item-text fs-9 fs-lg-7 mb-lg-8 mb-6">
                以異國風情裝潢與熱帶氛圍帶你進入另一個世界。充滿熱帶風情的雞尾酒不僅外觀精美，口感也令人驚豔。調酒師技藝高超，每杯飲品都精雕細琢。這裡是與朋友共度歡樂夜晚的絕佳去處，每一刻都充滿驚喜。
              </p>
              <a
                href="barcontent.html"
                className="comments-list-item-btn d-flex justify-content-between"
              >
                <p className="fs-9 fs-lg-6">查看更多</p>
                <span className="material-symbols-outlined fs-9 fs-lg-6">
                  arrow_forward_ios
                </span>
              </a>
            </li>

            <div className="comments-divider-2"></div>
            {/* <!-- 中間的間隔線 行動版時出現 --> */}

            <li className="comments-list-item" data-aos="zoom-in-right">
              <div className="comments-list-item-title d-flex mb-lg-8 mb-6">
                <img src="/sip-search-react/assets/images/Ellipse 7.png" alt="user-3" />
                <div className="comments-list-item-name ms-5 d-flex flex-column">
                  <h3 className="eng-font fs-7 fs-lg-5 text-primary-3 mb-2">
                    bboyhaha
                  </h3>
                  <div className="d-flex align-items-center mt-auto">
                    <span className="material-symbols-outlined comments-icon">
                      location_on
                    </span>
                    <p className="eng-font fs-8 fs-lg-7 ms-2">Speakeasy</p>
                  </div>
                </div>
              </div>
              <p className="comments-list-item-text fs-9 fs-lg-7 mb-lg-8 mb-6">
                超推！！溫暖的色調和舒適的氛圍成為下班後放鬆的好去處。這裡的調酒師用心創作，每杯飲品都帶來驚喜。特別推薦這裡的經典調酒，既保持傳統風味，又增添了獨特的現代感。非常適合喜歡經典與創新的飲酒愛好者。
              </p>
              <a
                href="barcontent.html"
                className="comments-list-item-btn d-flex justify-content-between"
              >
                <p className="fs-9 fs-lg-6">查看更多</p>
                <span className="material-symbols-outlined fs-9 fs-lg-6">
                  arrow_forward_ios
                </span>
              </a>
            </li>

            <div className="comments-divider"></div>
            {/* <!-- 中間的間隔線 --> */}

            <li
              className="comments-list-item"
              data-aos="zoom-in-left"
              data-aos-delay="300"
            >
              <div className="comments-list-item-title d-flex mb-lg-8 mb-6">
                <img src="/sip-search-react/assets/images/Ellipse 5.png" alt="user-4" />
                <div className="comments-list-item-name ms-5 d-flex flex-column">
                  <h3 className="eng-font fs-7 fs-lg-5 text-primary-3">
                    xxxcindysss
                  </h3>
                  <div className="d-flex align-items-center mt-auto">
                    <span className="material-symbols-outlined comments-icon">
                      location_on
                    </span>
                    <p className="eng-font fs-8 fs-lg-7 ms-2">MoMo Lane</p>
                  </div>
                </div>
              </div>
              <p className="comments-list-item-text fs-9 fs-lg-7 mb-lg-8 mb-6">
                隱藏在都市的一角，以其溫馨的氛圍和獨特的調酒風格吸引了眾多愛酒之人。這裡的酒單精挑細選，從經典到創新一應俱全。服務生親切且專業，讓你感受到家的溫暖。非常適合與好友一同來此小酌，度過一個愉快的夜晚。
              </p>

              <a
                href="barcontent.html"
                className="comments-list-item-btn d-flex justify-content-between"
              >
                <p className="fs-9 fs-lg-6">查看更多</p>
                <span className="material-symbols-outlined fs-9 fs-lg-6">
                  arrow_forward_ios
                </span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

export default IndexPage;
