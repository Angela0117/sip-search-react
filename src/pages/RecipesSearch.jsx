import React, { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

function RecipesSearch() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;


  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(`${baseUrl}/recipes?_page=${page}&_limit=${cardsPerPage}`);
      console.log("取得產品成功",res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("取得產品失敗", error);
      alert("取得產品失敗");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    new Swiper(".mySwiper-rs", {
      slidesPerView: "auto",
      spaceBetween: 24,
      slidesPerView: 2,
      slidesPerGroup: 1,
      pagination: {
        el: ".swiper-pagination-custom",
        type: "fraction",
      },
      navigation: {
        nextEl: ".custom-button-next",
        prevEl: null,
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 48,
        },
      },
    });
  }, []);

  return (
    <>
      <div className="section-rs1">
        <div className="container">
          <div className="banner-rs">
            <h6
              data-aos="fade-up"
              className="fw-bold text-primary-1 position-relative text-center z-3 fs-lg-1 fs-md-4 mb-md-11 mb-6"
            >
              在家調出酒吧級質感，品味專屬調酒
            </h6>

            <div
              data-aos="fade-up"
              className="input-group boder-primary-1 d-flex align-items-center mt-lg-8"
            >
              <label htmlFor="search" className="form-label d-none">
                搜尋
              </label>
              <input
                type="text"
                className="form-control fs-lg-6 fs-md-8 fs-9"
                id="search"
                placeholder="立即搜尋"
                aria-label="立即搜尋"
                aria-describedby="button-addon2"
              />
              <a href="#" className="p-lg-3 p-md-2 p-1">
                <span
                  href="#"
                  className="material-symbols-outlined text-primary-1 align-middle fs-lg-5 fs-md-7 fs-8"
                >
                  search
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="section-rs2 pb-lg-15 pb-10">
        {/* <!-- card的gx-13間隔太大(72px)，所以在父層設定overflow-hidden --> */}

        <div className="container overflow-x-hidden overflow-y-hidden">
          <div className="row px-lg-0 px-6 mb-6">
            <div className="col-12 mt-lg-15 mt-10">
              <h2
                data-aos="fade-up"
                className="fw-bold text-primary-1 text-center fs-lg-2 fs-7 mb-lg-15 mb-6"
              >
                輕鬆篩選，找到你的完美調酒
              </h2>
              <div className="row align-items-center mb-lg-9 mb-6">
                <div className="col-lg-1 col-2">
                  <h5 className="text-primary-1 fs-8 fs-lg-5">基酒</h5>
                </div>
                <div className="col-lg-11 col-10 g-0">
                  <div className="border-lg py-lg-6 d-flex justify-content-between align-items-center">
                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-left-btn"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-10 fs-lg-4 fs-6">
                        arrow_back_ios
                      </span>
                    </a>

                    <div
                      className="overflow-x-scroll scrollBar scroll-container"
                      id="scroll-container"
                    >
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          琴酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          伏特加
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          白蘭地
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          蘭姆酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          龍舌蘭
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          威士忌
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          苦艾酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          琴酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          伏特加
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          白蘭地
                        </button>
                      </div>
                    </div>

                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-right-btn"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-lg-4 fs-6">
                        arrow_forward_ios
                      </span>
                    </a>
                  </div>
                  {/* <!-- <div
                  className="border-lg py-lg-6 d-flex justify-content-between align-items-center"
                >
                  <a
                    href="javascript:void(0);"
                    className="scroll-control"
                    id="scroll-left-btn"
                  >
                    <span
                      className="material-symbols-outlined text-primary-3 ps-lg-10 fs-lg-4 fs-6"
                    >
                      arrow_back_ios
                    </span>
                  </a>

                  <div
                    className="overflow-x-scroll scrollBar scroll-container"
                    id="scroll-container"
                  >
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <button
                        type="button"
                        className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6"
                      >
                        琴酒
                      </button>
                      <button
                        type="button"
                        className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6"
                      >
                        伏特加
                      </button>
                      <button
                        type="button"
                        className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6"
                      >
                        白蘭地
                      </button>
                      <button
                        type="button"
                        className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6"
                      >
                        蘭姆酒
                      </button>
                      <button
                        type="button"
                        className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6"
                      >
                        龍舌蘭
                      </button>
                      <button
                        type="button"
                        className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6"
                      >
                        威士忌
                      </button>
                      <button
                        type="button"
                        className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6"
                      >
                        苦艾酒
                      </button>
                      <button
                        type="button"
                        className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6"
                      >
                        苦艾酒
                      </button>
                    </div>
                  </div>

                  <a
                    href="javascript:void(0);"
                    className="scroll-control"
                    id="scroll-right-btn"
                    ><span
                      className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-lg-4 fs-6"
                      >arrow_forward_ios
                    </span></a
                  >
                </div> --> */}
                </div>
              </div>
              <div className="row align-items-center mb-lg-9 mb-3">
                <div className="col-lg-1 col-2 mb-6">
                  <h5 className="text-primary-1 fs-8 fs-lg-5">果酒</h5>
                </div>
                <div className="col-lg-5 col-10 g-0 mb-6">
                  <div className="border-lg py-lg-6 d-flex justify-content-between align-items-center">
                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-left-btn-1"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-10 fs-lg-4 fs-6">
                        arrow_back_ios
                      </span>
                    </a>

                    <div
                      className="overflow-x-scroll scrollBar scroll-container"
                      id="scroll-container-1"
                    >
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          啤酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          甜酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          葡萄酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          蘭姆酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          龍舌蘭
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          威士忌
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          苦艾酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          苦艾酒
                        </button>
                      </div>
                    </div>

                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-right-btn-1"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-lg-4 fs-6">
                        arrow_forward_ios
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-lg-1 col-2 mb-6">
                  <h5 className="text-primary-1 fs-8 fs-lg-5">點綴</h5>
                </div>
                <div className="col-lg-5 col-10 g-0 mb-6">
                  <div className="border-lg py-lg-6 d-flex justify-content-between align-items-center">
                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-left-btn-2"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-10 fs-lg-4 fs-6">
                        arrow_back_ios
                      </span>
                    </a>

                    <div
                      className="overflow-x-scroll scrollBar scroll-container"
                      id="scroll-container-2"
                    >
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          水果
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          果汁
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          可可粉
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          蘭姆酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          龍舌蘭
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          威士忌
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          苦艾酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-6 py-lg-3 px-lg-6 me-1"
                        >
                          苦艾酒
                        </button>
                      </div>
                    </div>

                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-right-btn-2"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-lg-4 fs-6">
                        arrow_forward_ios
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="row mb-lg-13 justify-content-between">
                <div className="col ms-lg-14">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-3 fs-lg-6 fs-10 py-lg-3 px-lg-5 text-primary-1 text-nowrap"
                    >
                      琴酒
                      <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-3">
                        close
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-3 fs-lg-6 fs-10 py-lg-3 px-lg-5 text-primary-1 text-nowrap"
                    >
                      甜酒
                      <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-3">
                        close
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn active btn-outline-primary-3 rounded-pill me-lg-6 fs-lg-6 fs-10 py-lg-3 px-lg-5 text-primary-1 text-nowrap"
                    >
                      水果
                      <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-3">
                        close
                      </span>
                    </button>
                  </div>
                </div>

                <div className="col d-flex align-items-center justify-content-end">
                  <p className="text-primary-1 me-lg-6 me-3 ms-10 fs-lg-8 fs-10">
                    清除所有條件
                  </p>
                  <p className="text-white me-lg-4 d-none d-md-block">
                    {" "}
                    排序：
                  </p>
                  <p className="text-white me-lg-4 me-3 d-none d-md-block">
                    <a href="#">熱門程度</a>
                  </p>
                  <p className="text-neutral-3 border-0 border-start border-neutral-3 ps-lg-4 d-none d-md-block">
                    <a href="#">按讚數</a>
                  </p>
                </div>
                <div className="custom-list-rs d-md-none d-flex justify-content-end">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      排序
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item text-white" href="#">
                          熱門程度
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="#">
                          按讚數
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row gx-lg-13 gy-lg-13 gy-md-10 gy-0 gx-md-6 mb-lg-13 flex-md-wrap flex-nowrap overflow-x-scroll scrollBar">
            {products && products.length > 0 ? (
              products.map((recipes) => (
                <div
                  key={recipes.id}
                  className="col-lg-4 col-md-6 col-9 overflow-hidden"
                >
                  <div data-aos="fade-up" className="card-container">
                    <div className="card position-relative">
                      <div className="card-content mt-6 mt-md-9 mt-lg-0">
                        <div className="cross-container">
                          <div className="cross-1">
                            <div className="cross-line horizontal"></div>
                            <div className="cross-line vertical"></div>
                          </div>
                          <div className="cross-2">
                            <div className="cross-line horizontal"></div>
                            <div className="cross-line vertical"></div>
                          </div>
                        </div>
                        <div className="card-body mt-lg-5 text-center">
                          <h5 className="card-title text-primary-4 mb-lg-3">
                            {recipes.title}
                          </h5>
                          <img
                            src={recipes.image}
                            className="card-img-bottom cardImg"
                            alt={recipes.title}
                          />
                          <div className="">
                            <a
                              href="#"
                              className="cardBtn btn btn-primary-4 rounded-circle"
                            >
                              <span className="material-symbols-outlined align-baseline">
                                arrow_forward
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-hover">
                      <div className="card-hover-content mt-8">
                        <div className="cross-container">
                          <div className="cross-1">
                            <div className="cross-line horizontal"></div>
                            <div className="cross-line vertical"></div>
                          </div>
                          <div className="cross-2">
                            <div className="cross-line horizontal"></div>
                            <div className="cross-line vertical"></div>
                          </div>
                        </div>
                        <div className="card-body m-lg-6 m-4">
                          <h4 className="text-primary-4 fs-lg-4 fs-6 eng-font">
                            {recipes.title_en}
                          </h4>
                          <h6 className="text-primary-4 mt-lg-1 fs-lg-6 fs-8">
                            {recipes.title}
                          </h6>
                          <div className="col my-lg-6 my-3">
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic outlined example"
                            >
                              {recipes.tags.map((tag, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </div>
                          <p className="fs-lg-9 fs-10">{recipes.content}</p>
                          <div className="d-flex justify-content-between">
                            <img
                              className="cardImg-hover card-hoverImg mb-lg-3"
                              src={recipes.image}
                              alt={recipes.title}
                            />
                            <a
                              href="wine-content.html"
                              className="cardBtn cardBtn-primary-4 rounded-circle eng-font"
                            >
                              <span className="material-symbols-outlined align-middle">
                                arrow_forward
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>沒有找到產品</p>
            )}
            {/* <div className="col-lg-4 col-md-6 col-9 overflow-hidden">
              <div data-aos="fade-up" className="card-container">
                <div className="card">
                  <div className="card-content mt-6 mt-md-9 mt-lg-0">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>
                    <div className="card-body mt-lg-5 text-center">
                      <h5 className="card-title text-primary-4 mb-lg-3">
                        阿佩羅雞尾酒
                      </h5>
                      <img
                        src="/assets/images/image-AperolSpritz.png"
                        className="card-img-bottom cardImg"
                        alt="image-AperolSpritz"
                      />

                      <div className="d-flex justify-content-end me-lg-9">
                        <a
                          href="#"
                          className="cardBtn btn btn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-hover">
                  <div className="card-hover-content mt-8">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>

                    <div className="card-body m-lg-6 m-4">
                      <h4 className="text-primary-4 fs-lg-4 fs-6 eng-font">
                        Aperol Spritz
                      </h4>
                      <h6 className="text-primary-4 mt-lg-1 fs-lg-6 fs-8">
                        阿佩羅雞尾酒
                      </h6>
                      <div className="col my-lg-6 my-3">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            琴酒
                          </button>
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            甜苦艾酒
                          </button>

                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10"
                          >
                            金巴利
                          </button>
                        </div>
                      </div>
                      <p className="fs-lg-9 fs-10">
                        一款清爽的義大利經典雞尾酒，由阿佩羅苦味酒、氣泡酒（通常是普羅賽克）和蘇打水調製而成。其橙色外觀與微苦的果香口感，完美適合作為夏日午後的輕飲選擇。
                      </p>
                      <div className="d-flex justify-content-between">
                        <img
                          className="cardImg-hover card-hoverImg mb-lg-3"
                          src="/assets/images/image-AperolSpritz.png"
                          alt="image-junglebird"
                        />
                        <a
                          href="wine-content.html"
                          className="cardBtn cardBtn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-9 overflow-hidden">
              <div data-aos="fade-up" className="card-container">
                <div className="card">
                  <div className="card-content mt-6 mt-md-9 mt-lg-0">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>
                    <div className="card-body mt-lg-5 text-center">
                      <h5 className="card-title text-primary-4 mb-lg-3">
                        奧林匹克
                      </h5>
                      <img
                        src="/assets/images/image-olympic.png"
                        className="card-img-bottom cardImg"
                        alt="image-olympic"
                      />
                      <div className="d-flex justify-content-end me-lg-9">
                        <a
                          href="#"
                          className="cardBtn btn btn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-hover">
                  <div className="card-hover-content mt-8">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>

                    <div className="card-body m-lg-6 m-4">
                      <h4 className="text-primary-4 fs-lg-4 fs-6 eng-font">
                        Olympic
                      </h4>
                      <h6 className="text-primary-4 mt-lg-1 fs-lg-6 fs-8">
                        奧林匹克
                      </h6>
                      <div className="col my-lg-6 my-3">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            琴酒
                          </button>
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            甜苦艾酒
                          </button>
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10"
                          >
                            鳳梨
                          </button>
                        </div>
                      </div>
                      <p className="fs-lg-9 fs-10">
                        優雅的經典雞尾酒，由白蘭地、橙酒和新鮮橙汁調製而成。口感圓潤，融合了果香和濃郁的酒體，讓人感受到層次分明的滋味，是一款適合各種場合的經典選擇。
                      </p>
                      <div className="d-flex justify-content-between">
                        <img
                          className="cardImg-hover card-hoverImg mb-lg-3 mt-3 mt-lg-0"
                          src="/assets/images/image-olympic.png"
                          alt="image-junglebird"
                        />
                        <a
                          href="wine-content.html"
                          className="cardBtn cardBtn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-9 overflow-hidden">
              <div data-aos="fade-up" className="card-container">
                <div className="card">
                  <div className="card-content mt-6 mt-md-9 mt-lg-0">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>
                    <div className="card-body mt-lg-5 text-center">
                      <h5 className="card-title text-primary-4 mb-lg-3">
                        叢林鳥
                      </h5>
                      <img
                        src="/assets/images/image-junglebird.png"
                        className="card-img-bottom cardImg"
                        alt="image-junglebird"
                      />

                      <div className="d-flex justify-content-end me-lg-9">
                        <a
                          href="#"
                          className="cardBtn btn btn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-hover">
                  <div className="card-hover-content mt-8">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>

                    <div className="card-body m-lg-6 m-4">
                      <h4 className="text-primary-4 fs-lg-4 fs-6 eng-font">
                        Jungle Bird
                      </h4>
                      <h6 className="text-primary-4 mt-lg-1 fs-lg-6 fs-8">
                        叢林鳥
                      </h6>
                      <div className="col my-lg-6 my-3">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            琴酒
                          </button>
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            甜苦艾酒
                          </button>
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10"
                          >
                            鳳梨
                          </button>
                        </div>
                      </div>
                      <p className="fs-lg-9 fs-10">
                        一款充滿熱帶風情的經典雞尾酒，以黑朗姆酒為基底，搭配鳳梨汁、萊姆汁、甘蔗糖漿及苦艾酒調製而成。酸甜的口感與豐富的層次感，讓人彷彿置身熱帶叢林。
                      </p>
                      <div className="d-flex justify-content-between">
                        <img
                          className="cardImg-hover card-hoverImg mb-lg-3"
                          src="/assets/images/image-junglebird.png"
                          alt="image-junglebird"
                        />
                        <a
                          href="wine-content.html"
                          className="cardBtn cardBtn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-9 overflow-hidden">
              <div data-aos="fade-up" className="card-container">
                <div className="card">
                  <div className="card-content mt-6 mt-md-9 mt-lg-0">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>
                    <div className="card-body mt-lg-5 text-center">
                      <h5 className="card-title text-primary-4 mb-lg-3">
                        尼格羅尼
                      </h5>
                      <img
                        src="/assets/images/image- Negroni.png"
                        className="card-img-bottom cardImg"
                        alt="image-Negroni"
                      />

                      <div className="d-flex justify-content-end me-lg-9">
                        <a
                          href="#"
                          className="cardBtn btn btn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-hover">
                  <div className="card-hover-content mt-8">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>

                    <div className="card-body m-lg-6 m-4">
                      <h4 className="text-primary-4 fs-lg-4 fs-6 eng-font">
                        Negroni
                      </h4>
                      <h6 className="text-primary-4 mt-lg-1 fs-lg-6 fs-8">
                        尼格羅尼
                      </h6>
                      <div className="col my-lg-6 my-3">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            琴酒
                          </button>
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            甜苦艾酒
                          </button>
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10"
                          >
                            鳳梨
                          </button>
                        </div>
                      </div>
                      <p className="fs-lg-9 fs-10">
                        源自義大利的經典雞尾酒，風味濃郁、層次豐富又易調製。帶有明顯的草本與苦味，並以橙皮作為裝飾。適合喜愛苦中帶甘的飲酒愛好者。
                      </p>
                      <div className="d-flex justify-content-between">
                        <img
                          className="cardImg-hover card-hoverImg mb-lg-3"
                          src="/assets/images/image- Negroni.png"
                          alt="image-junglebird"
                        />
                        <a
                          href="wine-content.html"
                          className="cardBtn cardBtn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-9 overflow-hidden">
              <div data-aos="fade-up" className="card-container">
                <div className="card">
                  <div className="card-content mt-6 mt-md-9 mt-lg-0">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>
                    <div className="card-body mt-lg-5 text-center">
                      <h5 className="card-title text-primary-4 mb-lg-3">
                        瑪格麗特
                      </h5>
                      <img
                        src="/assets/images/image- Margarita.png"
                        className="card-img-bottom cardImg"
                        alt="image-margarita"
                      />

                      <div className="d-flex justify-content-end me-lg-9">
                        <a
                          href="#"
                          className="cardBtn btn btn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-hover">
                  <div className="card-hover-content mt-8">
                    <div className="cross-container">
                      <div className="cross-1">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                      <div className="cross-2">
                        <div className="cross-line horizontal"></div>
                        <div className="cross-line vertical"></div>
                      </div>
                    </div>

                    <div className="card-body m-lg-6 m-4">
                      <h4 className="text-primary-4 fs-lg-4 fs-6 eng-font">
                        Margarita
                      </h4>
                      <h6 className="text-primary-4 mt-lg-1 fs-lg-6 fs-8">
                        瑪格麗特
                      </h6>
                      <div className="col my-lg-6 my-3">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            琴酒
                          </button>
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                          >
                            甜苦艾酒
                          </button>
                          <button
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10"
                          >
                            鳳梨
                          </button>
                        </div>
                      </div>
                      <p className="fs-lg-9 fs-10">
                        經典的墨西哥雞尾酒，由龍舌蘭酒、萊姆汁和橙酒調製而成，並以鹽邊杯盛裝。酸甜適中的口感，結合龍舌蘭的獨特風味，成為夏日清爽解渴的最佳選擇。
                      </p>
                      <div className="d-flex justify-content-between">
                        <img
                          className="cardImg-hover card-hoverImg mb-lg-3"
                          src="/assets/images/image- Margarita.png"
                          alt="image-junglebird"
                        />
                        <a
                          href="wine-content.html"
                          className="cardBtn cardBtn-primary-4 rounded-circle eng-font"
                        >
                          <span className="material-symbols-outlined align-middle">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="row mt-11 mt-lg-0">
            <div className="col d-flex justify-content-end">
              <div
                className="btn-toolbar"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    className="pageBtn btn btn-primary-3 text-primary-1 fs-lg-6 me-lg-2 me-2"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="pageBtn btn btn-neutral-3 text-primary-1 fs-lg-6 me-lg-2 me-2"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="pageBtn btn btn-neutral-3 text-primary-1 fs-lg-6 me-lg-2 me-2"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="pageBtn btn btn-neutral-3 text-primary-1 fs-lg-6 me-lg-2 me-2"
                  >
                    4
                  </button>
                  <button type="button" className="pageBtn btn btn-neutral-3">
                    <span className="material-symbols-outlined text-primary-1 fs-lg-6 align-middle">
                      <a href="#"> arrow_forward_ios</a>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-rs3 mt-lg-15 mt-10 pb-lg-15">
        <div className="container">
          <div className="rs3-text">
            <h5 className="text-primary-1 text-center mb-lg-4 mb-2 fs-lg-5 fs-8 eng-font">
              Every sip tells a story
            </h5>
            <h2 className="fw-bold text-primary-1 text-center mb-lg-15 mb-6 fs-7 fs-lg-2">
              每一杯，都有故事
            </h2>
          </div>
          <div
            data-aos="fade-right"
            className="row gx-0 mb-lg-14 mb-9 gradient-border"
          >
            <div className="col-lg-3 col bg-primary-4 pb-lg-0 pb-10">
              <div className="cross-container">
                <div className="cross-1">
                  <div className="cross-line horizontal"></div>
                  <div className="cross-line vertical"></div>
                </div>
                <div className="cross-2">
                  <div className="cross-line horizontal"></div>
                  <div className="cross-line vertical"></div>
                </div>
              </div>
              <div className="rs-content d-flex flex-lg-column align-items-center justify-content-around">
                <h4 className="text-primary-1 fs-6 fs-lg-4">深受好評</h4>
                <span className="material-symbols-outlined text-primary-1 fs-lg-3">
                  thumb_up
                </span>
                <button className="btn-rs-primary-3 border-0 rounded-0 py-lg-3 py-1 px-lg-9 mt-lg-0 fs-lg-6 fs-8">
                  探索更多
                </button>
              </div>
            </div>

            <div className="col-lg-9 d-flex align-items-center rsbg-custom">
              <div className="swiper mySwiper-rs ms-lg-9 mx-5">
                <div className="swiper-wrapper eng-font">
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-daiquiri.png"
                          alt="image-daiquiri"
                        />
                      </a>
                    </div>
                    <div className="title text-white fs-lg-6 mt-lg-6 mt-md-4 mt-2">
                      奧綸莉 Daiquiri
                    </div>

                    <div className="likes text-white mt-md-4 mt-2 fs-9 fs-lg-7 text-nowrap">
                      <a href="#">
                        <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                          thumb_up
                        </span>
                      </a>
                      118
                      <span className="px-lg-3">|</span>
                      <a href="#">
                        <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                          favorite
                        </span>
                      </a>
                      99
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-holdwine.png"
                          alt="image-holdwine"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 mt-lg-6 mt-md-4 mt-2">
                      琴湯尼 Gin Tonic
                    </div>

                    <div className="likes text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7 text-nowrap">
                      <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                        thumb_up
                      </span>
                      132
                      <span className="px-lg-3">|</span>
                      <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                        favorite
                      </span>
                      49
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-manhattam.png"
                          alt="image-manhattam"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 mt-lg-6 mt-md-4 mt-2 fs-8">
                      曼哈頓 Manhattam
                    </div>

                    <div className="likes text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7 text-nowrap">
                      <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                        thumb_up
                      </span>
                      112
                      <span className="px-lg-3">|</span>
                      <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                        favorite
                      </span>
                      29
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-daiquiri.png"
                          alt="image-daiquiri"
                        />
                      </a>
                    </div>
                    <div className="title text-white fs-lg-6 mt-lg-6 mt-md-4 mt-2">
                      奧綸莉 Daiquiri
                    </div>

                    <div className="likes text-white mt-md-4 mt-2 fs-9 fs-lg-7 text-nowrap">
                      <a href="#">
                        <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                          thumb_up
                        </span>
                      </a>
                      118
                      <span className="px-lg-3">|</span>
                      <a href="#">
                        <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                          favorite
                        </span>
                      </a>
                      99
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-holdwine.png"
                          alt="image-holdwine"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 mt-lg-6 mt-md-4 mt-2">
                      琴湯尼 Gin Tonic
                    </div>

                    <div className="likes text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7 text-nowrap">
                      <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                        thumb_up
                      </span>
                      132
                      <span className="px-lg-3">|</span>
                      <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                        favorite
                      </span>
                      49
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-manhattam.png"
                          alt="image-manhattam"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 mt-lg-6 mt-md-4 mt-2 fs-8">
                      曼哈頓 Manhattam
                    </div>

                    <div className="likes text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7 text-nowrap">
                      <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                        thumb_up
                      </span>
                      112
                      <span className="px-lg-3">|</span>
                      <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                        favorite
                      </span>
                      29
                    </div>
                  </div>
                </div>

                <div className="custom-button-next cardBtn-primary-4 rounded-circle text-center">
                  <span className="material-symbols-outlined pt-6">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-right"
            className="row gx-0 mb-lg-14 mb-13 gradient-border"
          >
            <div className="col-lg-3 col bg-primary-1 pb-lg-0 pb-10">
              <div className="cross-container">
                <div className="cross-1">
                  <div className="cross-line horizontal"></div>
                  <div className="cross-line vertical"></div>
                </div>
                <div className="cross-2">
                  <div className="cross-line horizontal"></div>
                  <div className="cross-line vertical"></div>
                </div>
              </div>

              <div className="rs-content d-flex flex-lg-column align-items-center justify-content-around">
                <h4 className="text-primary-4 fs-6 fs-lg-4">熱門話題</h4>
                <span className="material-symbols-outlined text-primary-4 fs-lg-3">
                  forum
                </span>
                <button className="btn-rs-primary-4 rounded-0 border-0 py-lg-3 px-lg-9 mt-lg-0 fs-lg-6 fs-8">
                  探索更多
                </button>
              </div>
            </div>

            <div className="col-lg-9 d-flex align-items-center rsbg-custom">
              <div className="swiper mySwiper-rs ms-lg-9 mx-5">
                <div className="swiper-wrapper eng-font">
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-margarita.png"
                          alt="image-margarita"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 fs-8 mt-lg-6 mt-md-4 mt-2">
                      瑪格麗特 Margarita
                    </div>
                    <div className="commits text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7">
                      <span className="material-symbols-outlined text-white fs-lg-6 fs-9 align-middle">
                        forum
                      </span>
                      318
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-vieux carre.png"
                          alt="image-vieux"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 fs-8 mt-lg-6 mt-md-4 mt-2">
                      老廣場 Vieux Carre
                    </div>
                    <div className="commits text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7">
                      <span className="material-symbols-outlined text-white fs-lg-6 fs-9 align-middle">
                        forum
                      </span>
                      1218
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-godfather.png"
                          alt="image-godfather"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 mt-lg-6 mt-md-4 mt-2">
                      教父 Godfather
                    </div>

                    <div className="commits text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7">
                      <span className="material-symbols-outlined text-white fs-lg-6 fs-9 align-middle">
                        forum
                      </span>
                      418
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-margarita.png"
                          alt="image-margarita"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 fs-8 mt-lg-6 mt-md-4 mt-2">
                      瑪格麗特 Margarita
                    </div>
                    <div className="commits text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7">
                      <span className="material-symbols-outlined text-white fs-lg-6 fs-9 align-middle">
                        forum
                      </span>
                      318
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-vieux carre.png"
                          alt="image-vieux"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 fs-8 mt-lg-6 mt-md-4 mt-2">
                      老廣場 Vieux Carre
                    </div>
                    <div className="commits text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7">
                      <span className="material-symbols-outlined text-white fs-lg-6 fs-9 align-middle">
                        forum
                      </span>
                      1218
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="img-container">
                      <a href="wine-content.html" className="h-100 w-100">
                        <img
                          className="card-img1 img-gradient-border d-block"
                          src="/assets/images/image-godfather.png"
                          alt="image-godfather"
                        />
                      </a>
                    </div>

                    <div className="title text-white fs-lg-6 mt-lg-6 mt-md-4 mt-2">
                      教父 Godfather
                    </div>

                    <div className="commits text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7">
                      <span className="material-symbols-outlined text-white fs-lg-6 fs-9 align-middle">
                        forum
                      </span>
                      418
                    </div>
                  </div>
                </div>

                <div className="custom-button-next cardBtn-primary-4 rounded-circle text-center">
                  <span className="material-symbols-outlined pt-6">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipesSearch;
