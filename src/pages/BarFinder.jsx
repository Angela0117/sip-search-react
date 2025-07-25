import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BarCard from "../components/BarCard";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import useFavoriteBars from "../hooks/useFavoriteBars";

// const baseUrl = import.meta.env.VITE_BASE_URL;

function BarFinder() {
  const { dataAxios } = useUser(); // 添加 useUser hook
  const [allProducts, setAllProducts] = useState([]); // 存放所有資料
  const [products, setProducts] = useState([]); // 存放當前頁面資料
  const [searchTerm, setSearchTerm] = useState(""); //搜索
  const [sortType, setSortType] = useState("default"); //熱門排序
  const [activeSort, setActiveSort] = useState(""); // 排序的類型狀態切換
  const [currentPage, setCurrentPage] = useState(1); //分頁
  const cardsPerPage = 12;
  const [searchParams] = useSearchParams(); //取得url參數
  const [filteredProducts, setFilteredProducts] = useState([]); // 存放篩選後的資料
  const [selectedFilters, setSelectedFilters] = useState({
    region: [], // 陣列
    type: [],
    minimum_spend: null, //範圍值
  });

  const { favoriteBars, toggleFavoriteBars } = useFavoriteBars(); // 使用收藏酒吧的hook 

  const navigate = useNavigate();

  //每次跳轉都在頁面上方
  useEffect(() => {
    window.scrollTo(0, 0); // 轉跳到這個頁面時，視窗回到頂部
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  // 取得所有產品
  const getAllProducts = async () => {
    try {
      const res = await dataAxios.get(`/bars`); // 取得所有資料
      console.log("取得所有產品成功", res.data);
      setAllProducts(res.data);
      setFilteredProducts(res.data);
      setProducts(res.data.slice(0, cardsPerPage)); // 預設顯示第一頁
    } catch (error) {
      console.error("取得產品失敗", error);
      alert("取得產品失敗");
    }
  };

  // 整合搜尋和篩選功能
  const applyFiltersAndSearch = () => {
    let result = [...allProducts]; // 從所有產品開始篩選

    // 1. 先套用搜尋條件
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((product) =>
        [product.title, product.region, product.content]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(lowerSearch))
      );
    }

    // 2. 套用標籤篩選條件
    if (selectedFilters.region.length > 0) {
      result = result.filter((bar) =>
        selectedFilters.region.includes(bar.region)
      );
    }

    if (selectedFilters.type.length > 0) {
      result = result.filter((bar) => selectedFilters.type.includes(bar.type));
    }

    if (selectedFilters.minimum_spend) {
      result = result.filter(
        (bar) =>
          bar.minimum_spend >= selectedFilters.minimum_spend.min &&
          bar.minimum_spend < selectedFilters.minimum_spend.max
      );
    }

    // 3. 套用排序
    if (sortType === "favoriteCount") {
      result.sort((a, b) => b.favoriteCount - a.favoriteCount);
    } else if (sortType === "likeCount") {
      result.sort((a, b) => b.likeCount - a.likeCount);
    }

    // 4. 更新狀態
    setFilteredProducts(result);
    setCurrentPage(1);
    setProducts(result.slice(0, cardsPerPage));
  };

  // 搜尋功能處理
  const handleSearch = () => {
    applyFiltersAndSearch();
  };

  // tag篩選功能
  const handleTagSelect = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (filterType === "minimum_spend") {
        // 如果點擊的是相同範圍，則取消選擇
        newFilters[filterType] =
          prevFilters[filterType]?.min === value.min ? null : value;
      } else {
        // region 和 type 的處理保持不變
        if (!Array.isArray(prevFilters[filterType])) {
          newFilters[filterType] = [];
        }
        if (prevFilters[filterType].includes(value)) {
          newFilters[filterType] = prevFilters[filterType].filter(
            (item) => item !== value
          );
        } else {
          newFilters[filterType] = [...prevFilters[filterType], value];
        }
      }
      return newFilters;
    });
  };

  // 監聽所有篩選條件變化
  useEffect(() => {
    if (allProducts.length > 0) {
      applyFiltersAndSearch();
    }
  }, [selectedFilters, searchTerm, sortType, allProducts]);

  // 監聽搜尋條件變化 (Enter 鍵觸發或搜尋按鈕點擊)
  useEffect(() => {
    if (searchTerm === "") {
      applyFiltersAndSearch();
    }
  }, [searchTerm]);

  //熱門/按讚排序功能
  const handleSort = (type) => {
    setSortType(type);
    setActiveSort(type); //點擊後變色
    applyFiltersAndSearch(); // 使用統一的處理函數
  };

  //清除排序功能
  const handleClearSort = () => {
    // 重置所有狀態
    setSelectedFilters({
      region: [], // 改為空陣列
      type: [], // 改為空陣列
      minimum_spend: null,
    });
    setSortType("default");
    setActiveSort("");
    setSearchTerm("");

    // 重置為原始數據
    setFilteredProducts(allProducts);
    setCurrentPage(1);
    setProducts(allProducts.slice(0, cardsPerPage));

    navigate("/barfinder");
  };

  // 分頁功能
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    // 確保只設置新的分頁資料，而不是累積
    setProducts([...filteredProducts].slice(startIndex, endIndex));
  };

  //首頁tag篩選過來後的接收
  useEffect(() => {
    const tagsParam = searchParams.get("tags");
    if (tagsParam && allProducts.length > 0) {
      const tagArray = tagsParam.split(",");

      // 找出所有符合的地區標籤
      const regionTags = tagArray.filter((tag) =>
        [
          "基隆市",
          "新北市",
          "台北市",
          "桃園市",
          "新竹縣",
          "新竹市",
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
          "台東縣",
          "花蓮縣",
          "宜蘭縣",
        ].includes(tag)
      );

      // 找出所有符合的類型標籤
      const typeTags = tagArray.filter((tag) =>
        ["音樂", "特色", "日式", "複合", "運動", "熱門"].includes(tag)
      );

      // 更新篩選條件
      setSelectedFilters((prev) => ({
        ...prev,
        region: regionTags, // 直接使用陣列
        type: typeTags, // 直接使用陣列
      }));

      // 強制觸發篩選
      const filteredResults = allProducts.filter((bar) => {
        const matchRegion =
          regionTags.length === 0 || regionTags.includes(bar.region);
        const matchType = typeTags.length === 0 || typeTags.includes(bar.type);
        return matchRegion && matchType;
      });

      setFilteredProducts(filteredResults);
      setProducts(filteredResults.slice(0, cardsPerPage));
    }
  }, [searchParams, allProducts]);

  //首頁搜尋結果
  useEffect(() => {
    const search = searchParams.get("search");
    if (search && allProducts.length > 0) {
      setSearchTerm(search); // 設置搜尋詞

      // 當資料載入後執行搜尋
      const lowerSearch = search.toLowerCase();
      const filtered = allProducts.filter((product) =>
        [product.name, product.region, product.content]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(lowerSearch))
      );

      // 更新篩選後的結果
      setFilteredProducts(filtered);
      // 設置當前頁面顯示的資料
      setProducts(filtered.slice(0, cardsPerPage));
    }
  }, [searchParams, allProducts]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滾動
    });
  };

  //bar點擊左右滑動
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
      <title>找酒吧</title>
      <div className="section-bf1">
        <div className="container">
          <div className="banner-bf">
            <h6
              data-aos="fade-up"
              className="fw-bold text-primary-1 position-relative text-center z-3 fs-7 fs-md-5"
            >
              尋找你周圍最棒的酒吧
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
      <section className="section-bar-search-filter">
        <div className="container">
          <div className="row px-lg-0 px-6 mb-6">
            <div className="col-12 mt-lg-11 mt-10">
              <div className="row align-items-center justify-content-between mb-lg-9 mb-6">
                <div className="col-2 col-lg-1">
                  <h5 className="text-primary-1 fs-9 fs-lg-7 pe-lg-4">地點</h5>
                </div>
                <div className="col-10 col-lg-11 g-0">
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
                          "基隆市",
                          "新北市",
                          "台北市",
                          "桃園市",
                          "新竹縣",
                          "新竹市",
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
                          "台東縣",
                          "花蓮縣",
                          "宜蘭縣",
                        ].map((region) => (
                          <button
                            key={region}
                            type="button"
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${selectedFilters.region.includes(region)
                              ? "active"
                              : ""
                              }`}
                            onClick={() => handleTagSelect("region", region)}
                          >
                            {region}
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
                <div className="col-lg-1 col-3 mb-6">
                  <h5 className="text-primary-1 fs-9 fs-lg-7 text-nowrap">
                    酒吧類型
                  </h5>
                </div>
                <div className="col-lg-5 col-9 g-0 mb-6">
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
                        {["音樂", "特色", "日式", "複合", "運動", "熱門"].map(
                          (type) => (
                            <button
                              key={type}
                              type="button"
                              className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${selectedFilters.type.includes(type)
                                ? "active"
                                : ""
                                }`}
                              onClick={() => handleTagSelect("type", type)}
                            >
                              {type}
                            </button>
                          )
                        )}
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
                <div className="col-lg-1 col-3 mb-6">
                  <h5 className="text-primary-1 fs-9 fs-lg-7 text-nowrap">
                    單人均消
                  </h5>
                </div>
                <div className="col-lg-5 col-9 g-0 mb-6">
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
                          { min: 0, max: 300, label: "300以下" },
                          { min: 300, max: 400, label: "300-400" },
                          { min: 400, max: 500, label: "400-500" },
                          { min: 500, max: 600, label: "500-600" },
                          { min: 600, max: Infinity, label: "600以上" },
                        ].map((range) => (
                          <button
                            key={range.label}
                            type="button"
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${selectedFilters.minimum_spend &&
                              selectedFilters.minimum_spend.min === range.min &&
                              selectedFilters.minimum_spend.max === range.max
                              ? "active"
                              : ""
                              }`}
                            onClick={() =>
                              handleTagSelect("minimum_spend", {
                                min: range.min,
                                max: range.max,
                              })
                            }
                          >
                            {range.label}
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
                    {Object.entries(selectedFilters).map(
                      ([filterType, value]) => {
                        // 如果沒有值就不顯示
                        if (!value) return null;

                        // 處理地區和類型標籤
                        if (filterType === "region" || filterType === "type") {
                          const tags = Array.isArray(value) ? value : [value];
                          return tags.map((tag) => (
                            <button
                              key={`${filterType}-${tag}`}
                              type="button"
                              className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-1 fs-lg-8 fs-10 py-lg-2 py-1 px-lg-4 px-2 me-1 text-primary-1 text-nowrap"
                              onClick={() => handleTagSelect(filterType, tag)}
                            >
                              {tag}
                              <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-lg-3">
                                close
                              </span>
                            </button>
                          ));
                        }

                        // 處理價格範圍標籤
                        if (filterType === "minimum_spend" && value) {
                          return (
                            <button
                              key={`${filterType}-${value.min}-${value.max}`}
                              type="button"
                              className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-1 fs-lg-8 fs-10 py-lg-2 py-1 px-lg-4 px-2 me-1 text-primary-1 text-nowrap"
                              onClick={() => handleTagSelect(filterType, value)}
                            >
                              {value.max === Infinity
                                ? `${value.min}以上`
                                : `${value.min}-${value.max}`}
                              <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-lg-3">
                                close
                              </span>
                            </button>
                          );
                        }

                        return null;
                      }
                    )}
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
                      className={`btn-no-bg ${activeSort === "favoriteCount"
                        ? "text-primary-3"
                        : "text-primary-1"
                        }`}
                      onClick={() => handleSort("favoriteCount")}
                    >
                      熱門程度
                    </button>
                  </p>
                  <p className="text-neutral-3 border-0 border-start border-neutral-3 ps-lg-4 d-none d-md-block">
                    <button
                      type="button"
                      className={`btn-no-bg ${activeSort === "likeCount"
                        ? "text-primary-3"
                        : "text-primary-1"
                        }`}
                      onClick={() => handleSort("likeCount")}
                    >
                      按讚數
                    </button>
                  </p>
                </div>
                <div className="d-md-none d-flex justify-content-end">
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
                          onClick={() => handleSort("favoriteCount")}
                        >
                          熱門程度
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item text-white"
                          onClick={() => handleSort("likeCount")}
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
        </div>
      </section>
      <section className="section-bar-search-result">
        <div className="container mt-lg-11 pb-lg-11 pb-9">
          <div className="search-result mb-lg-11 mb-6 d-flex justify-content-start">
            <h5 className="text-primary-1 pe-lg-6 fs-8 fs-md-5">搜尋結果</h5>
            <p className="fs-lg-7 text-primary-1 d-none d-md-block">
              {filteredProducts.length}
            </p>
          </div>
          <div className="row row-cols-2 row-cols-lg-3 gy-lg-9 gy-6 ps-lg-11 mb-lg-9 mb-8">
            {products && products.length > 0 ? (
              products.map((bar) => (
                <BarCard
                  key={bar.id}
                  bar={bar}
                  onFavorite={() => toggleFavoriteBars(bar.id)} //  用 hook 方法
                  isFavorite={favoriteBars.includes(bar.id)} //  用 hook 狀態
                />))
            ) : (
              <p>沒有找到產品</p>
            )}
          </div>
          <div className="row mb-lg-11 mb-8">
            <div className="col d-flex justify-content-end me-lg-4">
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
                  {[
                    ...Array(
                      Math.ceil(filteredProducts.length / cardsPerPage)
                    ).keys(),
                  ].map((page) => (
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
                  ))}
                </div>
              </div>
            </div>
          </div>

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
      </section>
    </>
  );
}

export default BarFinder;
