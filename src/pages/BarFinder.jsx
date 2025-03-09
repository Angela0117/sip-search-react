import React, { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BarCard from "../components/BarCard";

const baseUrl = import.meta.env.VITE_BASE_URL;

function BarFinder() {
  const [allProducts, setAllProducts] = useState([]); // 存放所有資料
  const [products, setProducts] = useState([]); // 存放當前頁面資料
  const [searchTerm, setSearchTerm] = useState(""); //搜索
  const [sortType, setSortType] = useState("default"); //熱門排序
  const [activeSort, setActiveSort] = useState(""); // 排序的類型狀態切換
  const [currentPage, setCurrentPage] = useState(1); //分頁
  const cardsPerPage = 12;
  const [searchParams] = useSearchParams();  //取得url參數
  const [filteredProducts, setFilteredProducts] = useState([]); // 存放篩選後的資料
  const [selectedFilters, setSelectedFilters] = useState({
    region: "",
    type: "",
    minimum_spend: null,
  });

  //每次跳轉都在頁面上方
  useEffect(() => {
    window.scrollTo(0, 0); // 轉跳到這個頁面時，視窗回到頂部
  }, []);

   // 加入初始數據加載
   useEffect(() => {
    getAllProducts();
  }, []);

  // 取得所有產品
  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/bars`); // 取得所有資料
      console.log("取得所有產品成功", res.data);
      setAllProducts(res.data);
      setFilteredProducts(res.data);
      setProducts(res.data.slice(0, cardsPerPage)); // 預設顯示第一頁
    } catch (error) {
      console.error("取得產品失敗", error);
      alert("取得產品失敗");
    }
  };

  // 更新頁面資料，處理分頁邏輯
  const updateDisplayedProducts = (dataSource, page = 1) => {
    setCurrentPage(page);
    setProducts(
      dataSource.slice((page - 1) * cardsPerPage, page * cardsPerPage)
    );
  };

  // 整合搜尋和篩選功能
  const applyFiltersAndSearch = () => {
    let result = [...allProducts]; // 創建新的數組

  // 套用篩選條件
  if (selectedFilters.region) {
    result = result.filter(bar => bar.region === selectedFilters.region);
  }
  if (selectedFilters.type) {
    result = result.filter(bar => bar.type === selectedFilters.type);
  }
  if (selectedFilters.minimum_spend) {
    result = result.filter(bar => bar.minimum_spend <= selectedFilters.minimum_spend);
  }

  // 套用搜尋條件
  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    result = result.filter((bar) =>
      [bar.name, bar.description, bar.type, bar.region]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(lowerSearch))
    );
  }

  // 套用當前的排序
  if (sortType === "favoriteCount") {
    result.sort((a, b) => b.favoriteCount - a.favoriteCount);
  } else if (sortType === "likeCount") {
    result.sort((a, b) => b.likeCount - a.likeCount);
  } else {
    // 預設按 id 排序
    result.sort((a, b) => a.id - b.id);
  }

  setFilteredProducts(result);
  setProducts(result.slice(0, cardsPerPage));
  setCurrentPage(1);
  };

  // 搜尋功能處理
  const handleSearch = () => {
    applyFiltersAndSearch();
  };

  // tag篩選功能
  const handleTagSelect = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        // 如果該條件已經選取，再點一次則清除；否則就更新成新的值
        [filterType]: prevFilters[filterType] === value ? "" : value,
      };
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
    region: "",
    type: "",
    minimum_spend: null,
  });
  setSortType("default");
  setActiveSort("");
  setSearchTerm("");
  
  // 重置為原始數據
  const originalOrderProducts = [...allProducts].sort((a, b) => a.id - b.id);
  setFilteredProducts(originalOrderProducts);
  setProducts(originalOrderProducts.slice(0, cardsPerPage));
  setCurrentPage(1);
  
  // 強制觸發重新渲染
  applyFiltersAndSearch();
};


  // 分頁功能
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = page * cardsPerPage;
    setProducts(filteredProducts.slice(startIndex, endIndex)); 
  };

  //首頁tag篩選過來後的接收
  useEffect(() => {
    const tagsParam = searchParams.get("tags");
    if (tagsParam && allProducts.length > 0) {  // 確保有數據後再處理
      const tagArray = tagsParam.split(',');
      const tag = tagArray[0]?.trim();  // 先只處理第一個標籤
      if (tag) {
        setSelectedFilters(prev => ({
          ...prev,
          region: tag
        }));
      }
    }
  }, [searchParams, allProducts]); 

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
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${
                              selectedFilters.region === region ? "active" : ""
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
                              className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${
                                selectedFilters.type === type ? "active" : ""
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
                        {[300, 400, 500, 600].map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${
                              selectedFilters.minimum_spend === amount
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handleTagSelect("minimum_spend", amount)
                            }
                          >
                            {amount} 元內
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
                      ([filterType, value]) =>
                        value ? (
                          <button
                            key={filterType}
                            type="button"
                            className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-1 fs-lg-8 fs-10 py-lg-2 py-1 px-lg-4 px-2 me-1 text-primary-1 text-nowrap"
                            onClick={() => handleTagSelect(filterType, value)}
                          >
                            {value}
                            <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-lg-3">
                              close
                            </span>
                          </button>
                        ) : null
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
                      className={`btn-no-bg ${
                        activeSort === "favoriteCount"
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
                      className={`btn-no-bg ${
                        activeSort === "likeCount"
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
              products.map((bar) => <BarCard key={bar.id} bar={bar} />)
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
                  {[...Array(Math.ceil(14 / cardsPerPage)).keys()].map(
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

          <div className="d-flex justify-content-end custom-padding">
            <div className="cardBtn-primary-4 btn btn-size rounded-circle">
              <span className="material-symbols-outlined align-middle">
                arrow_upward
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BarFinder;
