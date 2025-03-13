import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper/bundle";
import axios from "axios";
import "swiper/css/bundle";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import images from "../images";
import HotRecipeCard from "../components/HotRecipeCard";
import HotBarCard from "../components/HotBarCard";

const baseUrl = import.meta.env.VITE_BASE_URL;

function IndexPage() {
  const [events, setEvents] = useState([]);
  const [latestEvents, setLatestEvents] = useState([]);

  //取得所有活動
  const getAllEvents = async () => {
    try {
      const res = await axios.get(`${baseUrl}/events`);
      console.log("取得活動成功", res.data);
      setEvents(res.data);
      filterLatestEvents(res.data); // 直接傳入取得的資料
    } catch (error) {
      console.error("取得活動失敗", error);
    }
  };
  //取得最新的活動
  const filterLatestEvents = (eventsData) => {
    const today = new Date();

    // 篩選未來的活動
    const futureEvents = eventsData.filter((event) => {
      const eventDate = new Date(event.startDate);
      return eventDate >= today;
    });

    // 根據日期排序
    const sortedEvents = futureEvents.sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    });

    // 只取前4筆資料
    setLatestEvents(sortedEvents.slice(0, 4));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  // 分開管理酒吧和酒譜評論的 state
  const [barComments, setBarComments] = useState([]);
  const [recipeComments, setRecipeComments] = useState([]);

  // 分別取得酒吧評論和酒譜評論
  const getBarComments = async () => {
    try {
      // 1. 先取得評論
      const commentRes = await axios.get(`${baseUrl}/barcomments`);

      // 2. 針對每個評論取得對應的酒吧資訊
      const commentsWithBarInfo = await Promise.all(
        commentRes.data.map(async (comment) => {
          const barRes = await axios.get(`${baseUrl}/bars/${comment.barId}`);
          return {
            ...comment,
            type: "bar",
            date: new Date(comment.createdAt),
            barName: barRes.data.name, // 加入酒吧名稱
          };
        })
      );

      // 3. 排序並只取前兩筆
      const sortedComments = commentsWithBarInfo
        .sort((a, b) => b.date - a.date)
        .slice(0, 2);

      setBarComments(sortedComments);
    } catch (error) {
      console.error("取得酒吧評論失敗", error);
    }
  };

  const getRecipeComments = async () => {
    try {
      // 1. 先取得評論
      const commentRes = await axios.get(`${baseUrl}/recipscomments`);

      // 2. 針對每個評論取得對應的酒譜資訊
      const commentsWithRecipeInfo = await Promise.all(
        commentRes.data.map(async (comment) => {
          const recipeRes = await axios.get(
            `${baseUrl}/recipes/${comment.recipeId}`
          );
          return {
            ...comment,
            type: "recipe",
            date: new Date(comment.date),
            recipeName: recipeRes.data.title, // 加入酒譜名稱
          };
        })
      );

      // 3. 排序並只取前兩筆
      const sortedComments = commentsWithRecipeInfo
        .sort((a, b) => b.date - a.date)
        .slice(0, 2);

      setRecipeComments(sortedComments);
    } catch (error) {
      console.error("取得酒譜評論失敗", error);
    }
  };

  useEffect(() => {
    getBarComments();
    getRecipeComments();
  }, []);

  const [signupEmail, setSignupEmail] = useState(""); //會員信箱

  //跳轉頁面
  const navigate = useNavigate();
  //註冊的跳轉
  const handleSignup = (e) => {
    e.preventDefault();
    if (signupEmail) {
      navigate(`/membersignup?email=${encodeURIComponent(signupEmail)}`);
    }
  };
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

  // 處理酒吧tag跳轉
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

  const [searchTerm, setSearchTerm] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  //首頁搜尋功能
  const handleSearch = async () => {
    const term = searchTerm.trim();
    if (!term) return;

    try {
      const [recipeRes, barRes] = await Promise.all([
        axios.get(`${baseUrl}/recipes?search=${term}`),
        axios.get(`${baseUrl}/bars?search=${term}`),
      ]);

      const recipeResults = recipeRes.data;
      const barResults = barRes.data;

      // 修改判斷邏輯
      if (barResults.length > 0 && recipeResults.length === 0) {
        // 只有酒吧有結果
        navigate(`/barfinder?search=${term}`);
      } else if (recipeResults.length > 0 && barResults.length === 0) {
        // 只有酒譜有結果
        navigate(`/recipesSearch?search=${term}`);
      } else if (recipeResults.length > 0 && barResults.length > 0) {
        // 如果兩邊都有結果，根據相關性決定跳轉目標
        const barRelevance = barResults.some(
          (bar) =>
            bar.title?.toLowerCase().includes(term.toLowerCase()) ||
            bar.region?.toLowerCase().includes(term.toLowerCase())
        );

        if (barRelevance) {
          navigate(`/barfinder?search=${term}`);
        } else {
          navigate(`/recipesSearch?search=${term}`);
        }
      } else {
        alert("很抱歉，沒有搜尋到相關結果。");
      }
    } catch (error) {
      console.error("搜尋失敗：", error);
    }
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
      // loop: true,
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
  const [swiperInitialized, setSwiperInitialized] = useState(false);
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

  useEffect(() => {
    // 確保有資料且還沒初始化過
    if (hotBars.length > 0 && !swiperInitialized) {
      const barSwiper = new Swiper(".swiper-popular-bars", {
        loop: true,
        speed: 2000,
        slidesPerView: 1,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

      });

      setSwiperInitialized(true);
      console.log('Bar Swiper initialized with', hotBars.length, 'slides');
    }
  }, [hotBars]);

  // 根據 likes 排序並篩選前 6 名
  const sortHotBars = () => {
    if (allBars.length === 0) {
      console.log('No bars data available');
      return;
    }

    console.log('Sorting bars from:', allBars.length, 'total bars');
    const sorted = [...allBars]
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 6);

    console.log('Sorted hot bars:', sorted.length, 'bars');
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滾動
    });
  };


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
                src={images["image-sip-search-chi"]}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="p-lg-3 p-md-2 p-1 text-align-center d-inline-flex btn-no-bg"
                >
                  <span className="material-symbols-outlined index-brightness align-middle fs-lg-5 fs-8">
                    search
                  </span>
                </button>
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
                    src={images["webinfo-1"]}
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
                      to={`/recipessearch`}
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
                      to={`/ barsearch`}
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
                    src={images["webinfo-2"]}
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
            <form className="text-center d-flex justify-content-center join-input m-auto">
              <div className="input-group join-input-text">
                <span className="input-group-text">
                  <span className="material-symbols-outlined text-primary-1 fs-lg-4 fs-8">
                    mail
                  </span>
                </span>
                <input
                  type="email"
                  placeholder="請輸入您的 Email"
                  className="form-control text-primary-1 eng-font mt-2"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleSignup}
                className="btn-rs-primary-4 join-input-btn fs-lg-7 fs-9 text-nowrap"
              >
                加入會員
              </button>
            </form>
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
                {latestEvents.map((event) => (
                  <li key={event.id} className="event-list-card">
                    {/* <!-- 會員專區暫存連結 --> */}
                    <Link
                      to={`/ bar / ${event.barId}`}
                      className="event-list-a border p-5"
                    >
                      <div className="event-list-card-date fs-9 fs-lg-7 d-flex justify-content-center align-items-center bg-primary-1 text-primary-4">
                        <p>
                          {new Date(event.startDate).toLocaleDateString(
                            "zh-TW",
                            {
                              weekday: "short",
                            }
                          )}
                          <span className="eng-font ms-2 ms-lg-4">
                            {new Date(event.startDate).toLocaleDateString(
                              "zh-TW",
                              {
                                month: "numeric",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </p>
                      </div>
                      <div className="list-card-name d-flex justify-content-between align-items-center text-neutral-1">
                        <p className="fs-8 fs-lg-6">
                          {event.area}_{event.name}
                        </p>
                        <span className="material-symbols-outlined">
                          arrow_forward_ios
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link to="/barsearch" className="d-block">
                <div className="event-btn d-flex justify-content-end align-items-center">
                  <p className="fs-8 fs-lg-7 me-6">查看更多</p>
                  <span className="material-symbols-outlined">
                    arrow_forward_ios
                  </span>
                </div>
              </Link>
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
            {barComments.map((comment, index) => (
              <React.Fragment key={`bar-${comment.id}`}>
                <li
                  className="comments-list-item"
                  data-aos={index === 0 ? "zoom-in-right" : "zoom-in-left"}
                >
                  <div className="comments-list-item-title d-flex mb-8">
                    <img src={images["Ellipse 7"]} alt="" />
                    <div className="comments-list-item-name ms-5">
                      <h3 className="eng-font fs-7 fs-md-5 text-primary-3 mb-2">
                        {comment.userName}
                      </h3>
                      <div className="d-flex align-items-center mt-auto">
                        <span className="material-symbols-outlined comments-icon">
                          location_on
                        </span>
                        <p className="eng-font fs-8 fs-lg-7 ms-2">
                          {comment.barName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="comments-list-item-text fs-9 fs-lg-7 mb-lg-8 mb-6">
                    {comment.content}
                  </p>
                  <Link
                    to={`/bar/${comment.barId}`}
                    className="comments-list-item-btn d-flex justify-content-between"
                  >
                    <p className="fs-9 fs-lg-6">查看更多</p>
                    <span className="material-symbols-outlined fs-9 fs-lg-6">
                      arrow_forward_ios
                    </span>
                  </Link>
                </li>
                {index === 0 && <div className="comments-divider"></div>}
              </React.Fragment>
            ))}

            {recipeComments.map((comment, index) => (
              <React.Fragment key={`recipe-${comment.id}`}>
                <li
                  className="comments-list-item"
                  data-aos={index === 0 ? "zoom-in-right" : "zoom-in-left"}
                >
                  <div className="comments-list-item-title d-flex mb-8">
                    <img src={images["Ellipse 5"]} alt="" />
                    <div className="comments-list-item-name ms-5">
                      <h3 className="eng-font fs-7 fs-md-5 text-primary-3 mb-2">
                        {comment.userName}
                      </h3>
                      <div className="d-flex align-items-center mt-auto">
                        <span className="material-symbols-outlined comments-icon">
                          local_bar
                        </span>
                        <p className="eng-font fs-8 fs-lg-7 ms-2">
                          {comment.recipeName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="comments-list-item-text fs-9 fs-lg-7 mb-lg-8 mb-6">
                    {comment.content}
                  </p>
                  <Link
                    to={`/recipe/${comment.recipeId}`}
                    className="comments-list-item-btn d-flex justify-content-between"
                  >
                    <p className="fs-9 fs-lg-6">查看更多</p>
                    <span className="material-symbols-outlined fs-9 fs-lg-6">
                      arrow_forward_ios
                    </span>
                  </Link>
                </li>
                {index === 0 && <div className="comments-divider"></div>}
              </React.Fragment>
            ))}
          </ul>
        </section>
      </div>
      <div className="container">
        <div className="d-flex justify-content-end custom-padding">
          <button
            className="cardBtn-primary-4 btn btn-size rounded-circle"
            onClick={scrollToTop}
          >
            <span className="material-symbols-outlined align-middle">
              arrow_upward
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default IndexPage;
