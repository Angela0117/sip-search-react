import React, { useEffect, useState, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import axios from "axios";
import RecipeCard from "../components/RecipeCard"; // 匯入 RecipeCard 元件

const baseUrl = import.meta.env.VITE_BASE_URL;

function RecipesSearch() {
  const [allProducts, setAllProducts] = useState([]); // 存放所有資料
const [products, setProducts] = useState([]); // 存放當前頁面資料
const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const cardsPerPage = 6;

// 取得所有產品（不分頁）
const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseUrl}/recipes`); // 取得所有資料
    console.log("取得所有產品成功", res.data);
    setAllProducts(res.data);
    setProducts(res.data.slice(0, cardsPerPage)); // 預設顯示第一頁
  } catch (error) {
    console.error("取得產品失敗", error);
    alert("取得產品失敗");
  }
};

// 搜尋功能
const handleSearch = () => {
  if (!searchTerm) {
    setProducts(allProducts.slice(0, cardsPerPage)); // 沒搜尋時回復原始分頁
    setCurrentPage(1);
    return;
  }
  const lowerSearch = searchTerm.toLowerCase();
  const filtered = allProducts.filter((product) =>
    [product.title, product.title_en, product.content]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(lowerSearch))
  );

  setProducts(filtered.slice(0, cardsPerPage)); // 先顯示第一頁
  setCurrentPage(1);
 
};

// 分頁功能
const handlePageChange = (page) => {
  setCurrentPage(page);
  setProducts(allProducts.slice((page - 1) * cardsPerPage, page * cardsPerPage));
};

useEffect(() => {
  getAllProducts();
}, []);

  //swiper
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

  //bar左右滑動
  const scrollContainerRef1 = useRef(null);
  const scrollContainerRef2 = useRef(null);
  const scrollContainerRef3 = useRef(null);
  const scrollAmount = 150;
  const scrollLeft = (ref) => {
    ref.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = (ref) => {
    ref.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="section-rs1">
        <div className="container">
          <div className="banner-rs">
            <h6
              data-aos="fade-up"
              className="fw-bold text-primary-1 position-relative text-center z-3 fs-7 fs-md-5"
            >
              在家調出酒吧級質感，品味專屬調酒
            </h6>

            <div
              data-aos="fade-up"
              className="input-group boder-primary-1 d-flex align-items-center mt-lg-8 mt-3"
            >
              <label htmlFor="search" className="form-label d-none">
                搜尋
              </label>
              <input
                type="text"
                className="form-control p-2 py-md-3 px-md-6 search-input"
                id="search"
                placeholder="立即搜尋"
                aria-label="立即搜尋"
                aria-describedby="button-addon2"
                value={searchTerm}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="p-lg-3 p-md-2 p-1 btn-no-bg "
                type="button"
                onClick={handleSearch}
              >
                <span className="material-symbols-outlined text-primary-1 align-middle fs-lg-5 fs-md-7 fs-8">
                  search
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="section-rs2  pb-10">
        {/* <!-- card的gx-13間隔太大(72px)，所以在父層設定overflow-hidden --> */}

        <div className="container overflow-x-hidden overflow-y-hidden">
          <div className="row px-lg-0 px-6 mb-6">
            <div className="col-12 mt-lg-11 mt-10">
              <h2
                data-aos="fade-up"
                className="fw-bold text-primary-1 text-center fs-lg-5 fs-7 mb-lg-12 mb-6"
              >
                輕鬆篩選，找到你的完美調酒
              </h2>
              <div className="row align-items-center mb-lg-9 mb-6">
                <div className="col-lg-1 col-2">
                  <h5 className="text-primary-1 fs-9 fs-lg-7 pe-lg-4">基酒</h5>
                </div>
                <div className="col-lg-11 col-10 g-0">
                  <div className="border-lg py-lg-3 d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      onClick={() => scrollLeft(scrollContainerRef1)}
                      className="scroll-control"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-10 fs-8 d-flex align-items-center">
                        arrow_back_ios
                      </span>
                    </button>
                    <div
                      ref={scrollContainerRef1}
                      className="overflow-x-scroll scrollBar"
                      id="scroll-container"
                      style={{ overflowX: "auto" }}
                    >
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          琴酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          伏特加
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          白蘭地
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          蘭姆酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          龍舌蘭
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          威士忌
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          苦艾酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          琴酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          伏特加
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          白蘭地
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          白蘭地
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollRight(scrollContainerRef1)}
                      className="scroll-control"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-8 d-flex align-items-center">
                        arrow_forward_ios
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row align-items-center mb-lg-9 mb-3">
                <div className="col-lg-1 col-2 mb-6">
                  <h5 className="text-primary-1 fs-9 fs-lg-7 text-nowrap">
                    果酒
                  </h5>
                </div>
                <div className="col-lg-5 col-10 g-0 mb-6">
                  <div className="border-lg py-lg-3 d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      onClick={() => scrollLeft(scrollContainerRef2)}
                      className="scroll-control"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-10 fs-8 d-flex align-items-center">
                        arrow_back_ios
                      </span>
                    </button>

                    <div
                      ref={scrollContainerRef2}
                      className="overflow-x-scroll scrollBar"
                      id="scroll-container"
                      style={{ overflowX: "auto" }}
                    >
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          啤酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          甜酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          葡萄酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          蘭姆酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          龍舌蘭
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          威士忌
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          苦艾酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          苦艾酒
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollRight(scrollContainerRef2)}
                      className="scroll-control"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-8 d-flex align-items-center">
                        arrow_forward_ios
                      </span>
                    </button>
                  </div>
                </div>
                <div className="col-lg-1 col-2 mb-6">
                  <h5 className="text-primary-1 fs-9 fs-lg-7 text-nowrap ps-3">
                    點綴
                  </h5>
                </div>
                <div className="col-lg-5 col-10 g-0 mb-6">
                  <div className="border-lg py-lg-3 d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      onClick={() => scrollLeft(scrollContainerRef3)}
                      className="scroll-control"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-10 fs-8 d-flex align-items-center">
                        arrow_back_ios
                      </span>
                    </button>

                    <div
                      ref={scrollContainerRef3}
                      className="overflow-x-scroll scrollBar"
                      id="scroll-container"
                      style={{ overflowX: "auto" }}
                    >
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          水果
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          果汁
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          可可粉
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          蘭姆酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          龍舌蘭
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          威士忌
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          苦艾酒
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          苦艾酒
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollRight(scrollContainerRef3)}
                      className="scroll-control"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-8 d-flex align-items-center">
                        arrow_forward_ios
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mb-lg-11 justify-content-between">
                <div className="col-8 col-lg-7 ms-lg-14 d-flex">
                  <div role="group" aria-label="Basic outlined example">
                    <button
                      type="button"
                      className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-1 fs-lg-8 fs-10 py-lg-2 py-1 px-lg-4 px-2 me-1 text-primary-1 text-nowrap"
                    >
                      琴酒
                      <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-lg-3">
                        close
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-1 fs-lg-8 fs-10 py-lg-2 py-1 px-lg-4 px-2 me-1 text-primary-1 text-nowrap"
                    >
                      甜酒
                      <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-lg-3">
                        close
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-1 fs-lg-8 fs-10 py-lg-2 py-1 px-lg-4 px-2 me-1 text-primary-1 text-nowrap"
                    >
                      水果
                      <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-lg-3">
                        close
                      </span>
                    </button>
                  </div>
                </div>

                <div className="col-4 d-flex align-items-center justify-content-end text-nowrap">
                  <p className="text-primary-1 me-lg-6 me-3 ms-10 fs-lg-8 fs-10">
                    清除所有條件
                  </p>
                  <p className="text-white me-lg-4 d-none d-md-block">排序：</p>
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

          <div className="row gx-lg-11 gy-lg-11 gy-md-6 gy-0 gx-md-6 mb-lg-3 mx-lg-12 flex-md-wrap flex-nowrap overflow-x-scroll scrollBar">
            {products && products.length > 0 ? (
              products.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
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
          {/* <div className="row  mb-8 mt-lg-11">
            <div className="col d-flex justify-content-end mt-lg-0 mt-4 me-lg-4">
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
                    className="pageBtn btn btn-primary-3 text-primary-1 fs-lg-8 fs-9 me-lg-2 me-2 d-flex align-items-center"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="pageBtn btn btn-neutral-3 text-primary-1 fs-lg-8 fs-9 me-lg-2 me-2 d-flex align-items-center"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="pageBtn btn btn-neutral-3 text-primary-1 fs-lg-8 fs-9 me-lg-2 me-2 d-flex align-items-center"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="pageBtn btn btn-neutral-3 text-primary-1 fs-lg-8 fs-9 me-lg-2 me-2 d-flex align-items-center"
                  >
                    4
                  </button>
                  <button
                    type="button"
                    className="pageBtn btn btn-neutral-3 d-flex align-items-center justify-content-center"
                  >
                    <span className="material-symbols-outlined text-primary-1 fs-lg-8 fs-9 align-middle">
                      <a href="#"> arrow_forward_ios</a>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="row mb-8 mt-lg-11">
            <div className="col d-flex justify-content-end mt-lg-0 mt-4 me-lg-4">
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
                  {[...Array(Math.ceil(18 / cardsPerPage)).keys()].map(
                    (page) => (
                      <button
                        key={page + 1}
                        type="button"
                        className={`pageBtn btn ${
                          currentPage === page + 1
                            ? "btn-primary-3"
                            : "btn-neutral-3"
                        } text-primary-1 fs-lg-8 fs-9 me-lg-2 me-2 d-flex align-items-center`}
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-rs3  mt-10 ">
        <div className="container">
          <div className="rs3-text">
            <h5 className="text-primary-1 text-center mb-lg-4 mb-2 fs-lg-5 fs-8 eng-font">
              Every sip tells a story
            </h5>
            <h2 className="fw-bold text-primary-1 text-center mb-lg-11 mb-6 fs-8 fs-lg-5">
              每一杯，都有故事
            </h2>
          </div>
          <div
            data-aos="fade-right"
            className="row gx-0 mb-lg-11 mb-9 gradient-border mx-lg-11"
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
              <div className="rs-content d-flex flex-lg-column align-items-center justify-content-center">
                <h4 className="text-primary-1 fs-6 fs-lg-5 pb-lg-6">
                  深受好評
                </h4>
                <span className="material-symbols-outlined text-primary-1 fs-lg-3 pb-lg-11">
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
                    <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2">
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

                    <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2">
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

                    <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2 fs-8">
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
                    <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2">
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

                    <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2">
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

                    <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2 fs-8">
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
            className="row gx-0 mb-lg-14 mb-13 gradient-border mx-lg-11"
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

              <div className="rs-content d-flex flex-lg-column align-items-center justify-content-center">
                <h4 className="text-primary-4 fs-6 fs-lg-4 pb-lg-6">
                  熱門話題
                </h4>
                <span className="material-symbols-outlined text-primary-4 fs-lg-3 pb-lg-11">
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

                    <div className="title text-white fs-lg-7 fs-8 mt-lg-6 mt-md-4 mt-2">
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

                    <div className="title text-white fs-lg-7 fs-8 mt-lg-6 mt-md-4 mt-2">
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

                    <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2">
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

                    <div className="title text-white fs-lg-7 fs-8 mt-lg-6 mt-md-4 mt-2">
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

                    <div className="title text-white fs-lg-7 fs-8 mt-lg-6 mt-md-4 mt-2">
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

                    <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2">
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
