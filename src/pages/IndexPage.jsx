import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper/bundle";
import axios from "axios";
import "swiper/css/bundle";
import { Link, Links, useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import HotRecipeCard from "../components/HotRecipeCard";
import HotBarCard from "../components/HotBarCard";

const baseUrl = import.meta.env.VITE_BASE_URL;

function IndexPage() {
  //跳轉頁面
  const navigate = useNavigate();
  //跳轉前移除backdrop
  const handleTagSelect = (tag) => {
    // 移除 modal backdrop
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }

    // 移除 body 上的 modal 相關 class
    document.body.classList.remove("modal-open");
    document.body.style.overflow = ""; // 重置 overflow
    document.body.style.paddingRight = ""; // 重置 padding-right

    navigate(`/recipesSearch?tag=${tag}`);
  };

  const [selectedBarTags, setSelectedBarTags] = useState([]); // 選擇的酒吧標籤
  // 處理酒吧 tag 的多選功能
  const handleBarTagSelect = (tag) => {
    setSelectedBarTags((prev) => {
      // 如果已經選中，則移除
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      // 如果未選中，則添加
      return [...prev, tag];
    });
  };

  // 處理酒吧搜尋跳轉
  const handleBarSearch = () => {
    // 移除 modal backdrop
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }

    // 移除 body 上的 modal 相關 class
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    // 將多個標籤組合成查詢字符串
    const tagQuery = selectedBarTags.join(",");
    navigate(`/barfinder?tags=${tagQuery}`);
  };



  //modal的開關
  const recipeModalRef = useRef(null);
  const barModalRef = useRef(null);

  useEffect(() => {
    new Modal(recipeModalRef.current);
    new Modal(barModalRef.current);
  }, []);

  const handleRecipeModalOpen = () => {
    const modalInstance = Modal.getInstance(recipeModalRef.current);
    modalInstance.show();
  };

  const handleBarModalOpen = () => {
    const modalInstance = Modal.getInstance(barModalRef.current);
    modalInstance.show();
  };

  const handleRecipeModalClose = () => {
    const modalInstance = Modal.getInstance(recipeModalRef.current);
    modalInstance.hide();
  };

  const handleBarModalClose = () => {
    const modalInstance = Modal.getInstance(barModalRef.current);
    modalInstance.hide();
  };

  useEffect(() => {
    // 初始化首頁熱門酒譜swiper
    new Swiper(".swiper-popular-recipe", {
      direction: "horizontal",
      slidesPerView: "auto",
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
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    // 初始化首頁熱門酒吧swiper
    new Swiper(".swiper-popular-bars", {
      loop: true,
      speed: 2000,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  // 熱門酒譜

  const [allRecipes, setAllRecipes] = useState([]); // 存所有酒譜
  const [hotRecipes, setHotRecipes] = useState([]); // 存熱門酒譜（按 likes 排序）

  // 取得所有酒譜
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`${baseUrl}/recipes`);
      // console.log("API 回傳的全部酒譜:", res.data);
      setAllRecipes(res.data);
    } catch (error) {
      console.error("取得酒譜失敗:", error);
    }
  };

  // 根據 likes 排序並篩選前 6 名
  const sortHotRecipes = () => {
    const sorted = [...allRecipes]
      // .filter((recipe) => recipe && recipe.likes !== undefined) // 過濾無效資料
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);

    setHotRecipes(sorted);
  };

  // 熱門酒吧

  const [allBars, setAllBars] = useState([]);
  const [hotBars, setHotBars] = useState([]);

  const fetchBars = async () => {
    try {
      const res = await axios.get(`${baseUrl}/bars`);
      // console.log("API 回傳的全部酒吧:", res.data);
      setAllBars(res.data);
    } catch (error) {
      console.error("取得酒吧失敗:", error);
    }
  };

  // 根據 likes 排序並篩選前 6 名
  const sortHotBars = () => {
    const sorted = [...allBars]
      // .filter((bar) => bar && bar.likes !== undefined) // 過濾無效資料
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 6);

    setHotBars(sorted);
  };


  // 在組件載入時取得所有酒譜和酒吧
  useEffect(() => {
    fetchRecipes();
    fetchBars();
  }, []);

  // 當 allRecipes & allBars 更新時，自動排序
  useEffect(() => {
    sortHotRecipes();
    sortHotBars();

  }, [allRecipes, allBars]);

  useEffect(() => {
    console.log("更新後的 hotBars:", hotBars);
  }, [hotBars]);



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
                  className="btn-index-primaryl-transparent banner-btn fs-lg-6 fs-md-8 fs-9"
                  onClick={handleRecipeModalOpen}
                >
                  酒譜
                </button>
                <button
                  type="button"
                  className="btn-index-primaryl-transparent banner-btn fs-lg-6 fs-md-8 fs-9"
                  onClick={handleBarModalOpen}
                >
                  酒吧
                </button>
              </div>
              <div
                className="modal fade"
                ref={barModalRef}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content pt-6">
                    <a
                      className="d-flex justify-content-center ms-auto mb-6 me-5"
                      onClick={handleBarModalClose}
                      aria-label="Close"
                    >
                      <span className="material-symbols-outlined text-primary-1">
                        cancel
                      </span>
                    </a>
                    <div className="modal-body">
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">北部</p>
                        <ul className="d-flex flex-wrap">
                          {[
                            "台北市",
                            "新北市",
                            "基隆市",
                            "桃園市",
                            "新竹市",
                            "新竹縣",
                          ].map((tag) => (
                            <li key={tag} className="w-25">
                              <button
                                type="button"
                                className={`btn btn-outline-primary-1 rounded-pill fs-7 mb-4 ${selectedBarTags.includes(tag) ? "active" : ""
                                  }`}
                                onClick={() => handleBarTagSelect(tag)}
                              >
                                {tag}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">中南部</p>
                        <ul className="d-flex flex-wrap">
                          {[
                            "苗栗縣",
                            "苗栗市",
                            "台中市",
                            "彰化縣",
                            "南投縣",
                            "雲林縣",
                            "嘉義縣",
                            "嘉義市",
                            "台南市",
                            "高雄市",
                            "屏東縣",
                          ].map((tag) => (
                            <li key={tag} className="w-25">
                              <button
                                type="button"
                                className={`btn btn-outline-primary-1 rounded-pill fs-7 mb-4 ${selectedBarTags.includes(tag) ? "active" : ""
                                  }`}
                                onClick={() => handleBarTagSelect(tag)}
                              >
                                {tag}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">東部</p>
                        <ul className="d-flex flex-wrap">
                          {["台東縣", "花蓮縣", "宜蘭縣"].map((tag) => (
                            <li key={tag} className="w-25">
                              <button
                                type="button"
                                className={`btn btn-outline-primary-1 rounded-pill fs-7 mb-4 ${selectedBarTags.includes(tag) ? "active" : ""
                                  }`}
                                onClick={() => handleBarTagSelect(tag)}
                              >
                                {tag}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">離島</p>
                        <ul className="d-flex flex-wrap">
                          {["金門縣", "澎湖縣", "馬祖縣"].map((tag) => (
                            <li key={tag} className="w-25">
                              <button
                                type="button"
                                className={`btn btn-outline-primary-1 rounded-pill fs-7 mb-4 ${selectedBarTags.includes(tag) ? "active" : ""
                                  }`}
                                onClick={() => handleBarTagSelect(tag)}
                              >
                                {tag}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                      {/* 新增確認按鈕區域 */}
                      <div className="text-center mt-6">
                        <button
                          type="button"
                          className="btn btn-primary-1 px-6 py-2 rounded-pill"
                          onClick={handleBarSearch}
                          disabled={selectedBarTags.length === 0}
                        >
                          確認搜尋
                        </button>
                      </div>

                      {/* <section className="banner-selector-section">
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
                      </section> */}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                ref={recipeModalRef}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content pt-6">
                    <a
                      className="d-flex justify-content-center ms-auto mb-6 me-5"
                      aria-label="Close"
                      onClick={handleRecipeModalClose}
                    >
                      <span className="material-symbols-outlined text-primary-1">
                        cancel
                      </span>
                    </a>
                    <div className="modal-body">
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">基酒</p>
                        <ul className="d-flex flex-wrap">
                          {[
                            "琴酒",
                            "伏特加",
                            "白蘭地",
                            "蘭姆酒",
                            "龍舌蘭",
                            "威士忌",
                            "苦艾酒",
                            "金酒",
                            "金巴利",
                          ].map((tag) => (
                            <li key={tag} className="w-25">
                              <button
                                type="button"
                                className="btn btn-outline-primary-1 rounded-pill fs-7 mb-4"
                                onClick={() => handleTagSelect(tag)}
                              >
                                {tag}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">果酒</p>
                        <ul className="d-flex flex-wrap">
                          {[
                            "啤酒",
                            "甜酒",
                            "葡萄酒",
                            "苦味橙酒",
                            "金酒",
                            "金巴利",
                          ].map((tag) => (
                            <li key={tag} className="w-25">
                              <button
                                type="button"
                                className="btn btn-outline-primary-1 rounded-pill fs-7 mb-4"
                                onClick={() => handleTagSelect(tag)}
                              >
                                {tag}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                      <section className="banner-selector-section">
                        <p className="banner-category mb-5">點綴</p>
                        <ul className="d-flex flex-wrap">
                          {[
                            "鳳梨",
                            "果汁",
                            "檸檬",
                            "桃子",
                            "可可粉",
                            "玫瑰",
                            "蜂蜜",
                            "水果",
                            "葡萄",
                            "葡萄柚",
                            "熱情果",
                          ].map((tag) => (
                            <li key={tag} className="w-25">
                              <button
                                type="button"
                                className="btn btn-outline-primary-1 rounded-pill fs-7 mb-4"
                                onClick={() => handleTagSelect(tag)}
                              >
                                {tag}
                              </button>
                            </li>
                          ))}
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
                <a
                  href="#"
                  className="p-lg-3 p-md-2 p-1 text-align-center d-inline-flex"
                >
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
                <ul
                  className="d-flex gap-6 m-0 text-nowrap"
                  data-aos="fade-up"
                ></ul>
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
                    <Link
                      to="/recipessearch"
                      className="btn-search btn-index-primaryl-light d-flex"
                    >
                      我想找酒譜
                      <span className="material-symbols-outlined ms-3">
                        arrow_forward_ios
                      </span>
                    </Link>
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
                    <Link
                      to="/barsearch"
                      className="btn-search btn-index-primary1 d-flex"
                    >
                      我想找酒吧
                      <span className="material-symbols-outlined ms-3">
                        arrow_forward_ios
                      </span>
                    </Link>
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
              <Link
                to="/membersignup"
                className="btn-rs-primary-4 join-input-btn fs-lg-7 fs-9 text-nowrap"
              >
                加入會員
              </Link>
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
                {hotRecipes.map((recipe) => (
                  <HotRecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
            {/* <div className="swiper-pagination"></div>  */}
          </div>
        </div>

      </section >
      {/* 熱門酒吧  */}
      < section className="section section-popular-bars bg-dark-brown" >
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
                  {hotBars.map((bar) => (
                    <HotBarCard key={bar.id} bar={bar} />
                  ))}
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
      </section >
      {/* <!-- 最新活動 --> */}
      < div className="container" >
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
                <h2 className="fs-7 fs-md-6 fs-lg-5 text-primary-1">
                  換友俱樂部
                </h2>
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
      </div >
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
              <div className="comments-list-item-title d-flex mb-8">
                <img
                  src="/sip-search-react/assets/images/Ellipse 6.png"
                  alt="user-1"
                />
                <div className="comments-list-item-name ms-5">
                  <h3 className="eng-font fs-7 fs-md-5 text-primary-3 mb-2">
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
              <div className="comments-list-item-title d-flex mb-8">
                <img
                  src="/sip-search-react/assets/images/Ellipse 2.png"
                  alt="user-2"
                />
                <div className="comments-list-item-name ms-5">
                  <h3 className="eng-font fs-7 fs-md-5 text-primary-3 mb-2">
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
              <div className="comments-list-item-title d-flex mb-8">
                <img
                  src="/sip-search-react/assets/images/Ellipse 7.png"
                  alt="user-3"
                />
                <div className="comments-list-item-name ms-5">
                  <h3 className="eng-font fs-7 fs-md-5 text-primary-3 mb-2">
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
              <div className="comments-list-item-title d-flex mb-8">
                <img
                  src="/sip-search-react/assets/images/Ellipse 5.png"
                  alt="user-4"
                />
                <div className="comments-list-item-name ms-5">
                  <h3 className="eng-font fs-7 fs-md-5 text-primary-3 mb-2">
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
