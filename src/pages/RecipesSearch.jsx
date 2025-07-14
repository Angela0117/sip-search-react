import React, { useEffect, useState, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { Link, useSearchParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard"; // 匯入 RecipeCard 元件
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import useFavoriteRecipes from "../hooks/useFavoriteRecipes"; // 引入 hook


// const baseUrl = import.meta.env.VITE_BASE_URL;

function RecipesSearch() {
  const { dataAxios } = useUser(); // 添加 useUser hook
  const [allProducts, setAllProducts] = useState([]); // 存放所有資料
  const [products, setProducts] = useState([]); // 存放當前頁面資料
  const [searchTerm, setSearchTerm] = useState(""); //搜索
  // eslint-disable-next-line no-unused-vars
  const [sortType, setSortType] = useState("default"); //熱門排序
  const [activeSort, setActiveSort] = useState(""); // 排序的類型狀態切換
  const [selectedTags, setSelectedTags] = useState([]); //tag篩選
  const [currentPage, setCurrentPage] = useState(1); //分頁
  const cardsPerPage = 6;
  const [searchParams] = useSearchParams(); //取得首頁篩選tag的結果
  const [topRecipes, setTopRecipes] = useState({
    mostLiked: [],
    mostFavorites: [],
  });
  const { favoriteRecipes, toggleFavorite } = useFavoriteRecipes(); // ✅ 使用 hook

  const navigate = useNavigate();

  //首頁的tag篩選功能
  const tagFromUrl = searchParams.get("tag");
  useEffect(() => {
    if (tagFromUrl) {
      // 設置選中的標籤
      setSelectedTags((prev) =>
        prev.includes(tagFromUrl) ? prev : [...prev, tagFromUrl]
      );

      // 根據標籤篩選產品
      const filteredProducts = allProducts.filter((product) =>
        product.tags.includes(tagFromUrl)
      );

      // 更新顯示的產品
      setProducts(filteredProducts.slice(0, cardsPerPage));
    }
  }, [tagFromUrl, allProducts]);

  //首頁搜尋結果
  useEffect(() => {
    // 從 URL 獲取搜尋參數
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search); // 設置搜尋詞

      // 當資料載入後執行搜尋
      if (allProducts.length > 0) {
        const lowerSearch = search.toLowerCase();
        const filtered = allProducts.filter((product) =>
          [product.title, product.title_en, product.content]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(lowerSearch))
        );
        setProducts(filtered.slice(0, cardsPerPage));
      }
    }
  }, [searchParams, allProducts]);

  // 取得所有酒譜產品，修改 getAllProducts，移除可選的 tag 參數
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await dataAxios.get(`/recipes`);
        //console.log("取得所有產品成功", res.data);
        setAllProducts(res.data);

        // 如果有 tagFromUrl，就篩選產品
        if (tagFromUrl) {
          const filteredProducts = res.data.filter((product) =>
            product.tags.includes(tagFromUrl)
          );
          setProducts(filteredProducts.slice(0, cardsPerPage));
        } else {
          // 沒有 tag 時顯示所有產品
          setProducts(res.data.slice(0, cardsPerPage));
        }
        // 獲取熱門資料
        getTopRecipes(res.data);
      } catch (error) {
        console.error("取得產品失敗", error);
        alert("取得產品失敗");
      }
    };
    getAllProducts();
  }, []);

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

  // tag篩選功能
  const handleTagSelect = (tag) => {
    let updatedTags = [...selectedTags];
    if (updatedTags.includes(tag)) {
      //存在移除
      updatedTags = updatedTags.filter((t) => t !== tag); //t代表所有元素
    } else {
      //不存在新增
      updatedTags.push(tag);
    }
    setSelectedTags(updatedTags);

    //當沒有選擇tag時，顯示所有產品
    if (updatedTags.length === 0) {
      setProducts(allProducts.slice(0, cardsPerPage));
    } else {
      const filteredProducts = allProducts.filter((product) =>
        updatedTags.every((tag) => product.tags.includes(tag))
      );
      setProducts(filteredProducts.slice(0, cardsPerPage));
    }
    setCurrentPage(1);
  };

  //熱門/按讚排序功能
  const handleSort = (type) => {
    setSortType(type); // 設置排序類型
    setActiveSort(type);

    let sortedProducts = [...allProducts];
    if (type === "favorite") {
      sortedProducts.sort((a, b) => b.favorite - a.favorite);
    } else if (type === "likes") {
      sortedProducts.sort((a, b) => b.likes - a.likes);
    } else {
      // 使用 sortType 來判斷預設排序
      sortedProducts.sort((a, b) => a.id - b.id);
    }

    setAllProducts(sortedProducts);
    setProducts(sortedProducts.slice(0, cardsPerPage));
    setCurrentPage(1);

    // 清除 URL 查詢參數
    navigate("/recipessearch");
  };

  //清除排序功能
  const handleClearSort = () => {
    setSortType("default");
    setActiveSort("");
    let sortedProducts = [...allProducts];
    sortedProducts.sort((a, b) => a.id - b.id);
    setAllProducts(sortedProducts);
    setProducts(allProducts.slice(0, cardsPerPage));
    setCurrentPage(1);

    // 清除 URL 查詢參數
    navigate("/recipessearch");
  };

  // 分頁功能
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setProducts(
      allProducts.slice((page - 1) * cardsPerPage, page * cardsPerPage)
    );
  };

  // 為您推薦資料取得
  const getTopRecipes = (data) => {
    // 複製資料避免修改原始資料
    const sortedByLikes = [...data]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);
    const sortedByFavorites = [...data]
      .sort((a, b) => b.favorite - a.favorite)
      .slice(0, 6);

    setTopRecipes({
      mostLiked: sortedByLikes,
      mostFavorites: sortedByFavorites,
    });
  };



  //swiper
  useEffect(() => {
    new Swiper(".mySwiper-rs", {
      // slidesPerView: "auto",
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

  //tag bar左右滑動
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
      <title>找酒譜</title>
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
                          "白朗姆酒",
                        ].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${selectedTags.includes(tag) ? "active" : ""
                              }`}
                            onClick={() => handleTagSelect(tag)}
                          >
                            {tag}
                          </button>
                        ))}
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
                        {[
                          "啤酒",
                          "甜酒",
                          "葡萄酒",
                          "苦味橙酒",
                          "金酒",
                          "金巴利",
                        ].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${selectedTags.includes(tag) ? "active" : ""
                              }`}
                            onClick={() => handleTagSelect(tag)}
                          >
                            {tag}
                          </button>
                        ))}
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
                          "苦精",
                          "杏仁",
                        ].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${selectedTags.includes(tag) ? "active" : ""
                              }`}
                            onClick={() => handleTagSelect(tag)}
                          >
                            {tag}
                          </button>
                        ))}
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
                    {selectedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-1 fs-lg-8 fs-10 py-lg-2 py-1 px-lg-4 px-2 me-1 text-primary-1 text-nowrap"
                        onClick={() => handleTagSelect(tag)}
                      >
                        {tag}
                        <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-lg-3">
                          close
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="col-4 d-flex align-items-center justify-content-end text-nowrap">
                  <button
                    type="button"
                    className="text-primary-1 me-lg-6 me-3 ms-10 fs-lg-8 fs-10 btn-no-bg"
                    onClick={handleClearSort}
                  >
                    清除所有條件
                  </button>
                  <p className="text-white me-lg-4 d-none d-md-block">排序：</p>
                  <p className="text-white me-lg-4 me-3 d-none d-md-block">
                    <button
                      type="button"
                      className={`btn-no-bg ${activeSort === "favorite"
                        ? "text-primary-3"
                        : "text-primary-1"
                        }`}
                      onClick={() => handleSort("favorite")}
                    >
                      熱門程度
                    </button>
                  </p>
                  <p className="text-neutral-3 border-0 border-start border-neutral-3 ps-lg-4 d-none d-md-block">
                    <button
                      type="button"
                      className={`btn-no-bg ${activeSort === "likes"
                        ? "text-primary-3"
                        : "text-primary-1"
                        }`}
                      onClick={() => handleSort("likes")}
                    >
                      按讚數
                    </button>
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
                        <button
                          type="button"
                          className="dropdown-item text-white"
                          onClick={() => handleSort("favorite")}
                        >
                          熱門程度
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item text-white"
                          onClick={() => handleSort("likes")}
                        >
                          按讚數
                        </button>
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
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onFavorite={() => toggleFavorite(recipe.id)} //  用 hook 方法
                  isFavorite={favoriteRecipes.includes(recipe.id)} //  用 hook 狀態
                />
              ))
            ) : (
              <p className="text-primary-1">沒有找到產品</p>
            )}
          </div>

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
                        className={`pageBtn btn ${currentPage === page + 1
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
                <span className="material-symbols-outlined text-primary-1 fs-lg-3 pb-lg-11 px-3 px-md-0">
                  thumb_up
                </span>
                <Link
                  to="/"
                  className="btn-rs-primary-3 border-0 rounded-0 py-lg-3 py-1 px-lg-9 px-3 mt-lg-0 fs-lg-6 fs-8"
                >
                  探索更多
                </Link>
              </div>
            </div>

            <div className="col-lg-9 d-flex align-items-center rsbg-custom">
              <div className="swiper mySwiper-rs ms-lg-9 mx-5">
                <div className="swiper-wrapper eng-font">
                  {topRecipes.mostLiked.map((recipe) => (
                    <div key={recipe.id} className="swiper-slide">
                      <div className="img-container">
                        <Link to={`/wine/${recipe.id}`} className="h-100 w-100">
                          <img
                            className="card-img1 img-gradient-border d-block"
                            src={recipe.imagesUrl[1]}
                            alt={recipe.title}
                          />
                        </Link>
                      </div>
                      <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2">
                        {recipe.title}
                      </div>

                      <div className="likes text-white mt-md-4 mt-2 fs-9 fs-lg-7 text-nowrap">
                        <a href="#">
                          <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                            thumb_up
                          </span>
                        </a>
                        {recipe.likes}
                        <span className="px-lg-3">|</span>
                        <a href="#">
                          <span className="material-symbols-outlined align-top px-lg-2 fs-9 fs-lg-6">
                            favorite
                          </span>
                        </a>
                        {recipe.favorite}
                      </div>
                    </div>
                  ))}
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
                <span className="material-symbols-outlined text-primary-4 fs-lg-3 pb-lg-11 px-3 px-md-0">
                  forum
                </span>
                <Link
                  to="/"
                  className="btn-rs-primary-4 rounded-0 border-0 py-lg-3 px-lg-9 mt-lg-0 fs-lg-6 fs-8 px-3 "
                >
                  探索更多
                </Link>
              </div>
            </div>

            <div className="col-lg-9 d-flex align-items-center rsbg-custom">
              <div className="swiper mySwiper-rs ms-lg-9 mx-5">
                <div className="swiper-wrapper eng-font">
                  {topRecipes.mostFavorites.map((recipe) => (
                    <div key={recipe.id} className="swiper-slide">
                      <div className="img-container">
                        <Link to={`/wine/${recipe.id}`} className="h-100 w-100">
                          <img
                            className="card-img1 img-gradient-border d-block"
                            src={recipe.imagesUrl[0]}
                            alt={recipe.title}
                          />
                        </Link>
                      </div>
                      <div className="title text-white fs-lg-7 mt-lg-6 mt-md-4 mt-2">
                        {recipe.title}
                      </div>
                      <div className="commits text-white mt-lg-4 mt-md-4 mt-2 fs-9 fs-lg-7">
                        <span className="material-symbols-outlined text-white fs-lg-6 fs-9 align-middle">
                          forum
                        </span>
                        {recipe.favorite}
                      </div>
                    </div>
                  ))}
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
