import React, { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import BarCard from "../components/BarCard";

const baseUrl = import.meta.env.VITE_BASE_URL;

function BarFinder() {
  const [allProducts, setAllProducts] = useState([]); // 存放所有資料
  const [products, setProducts] = useState([]); // 存放當前頁面資料
  const [searchTerm, setSearchTerm] = useState(""); //搜索
  const [sortType, setSortType] = useState("default"); //熱門排序
  const [activeSort, setActiveSort] = useState(""); // 排序的類型狀態切換
  const [selectedTags, setSelectedTags] = useState([]); //tag篩選
  const [currentPage, setCurrentPage] = useState(1); //分頁
  const cardsPerPage = 12;

  // 取得所有產品
  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/bars`); // 取得所有資料
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

  // tag篩選功能
  const handleTagSelect = (region) => {
    let updatedTags = [...selectedTags];
    if (updatedTags.includes(region)) {
      //存在移除
      updatedTags = updatedTags.filter((t) => t !== region); //t代表所有元素
    } else {
      //不存在新增
      updatedTags.push(region);
    }
    setSelectedTags(updatedTags);

    //當沒有選擇tag時，顯示所有產品
    if (updatedTags.length === 0) {
      setProducts(allProducts.slice(0, cardsPerPage));
    } else {
      const filteredProducts = allProducts.filter((product) =>
        updatedTags.every((region) => product.tags.includes(region))
      );
      setProducts(filteredProducts.slice(0, cardsPerPage));
    }
    setCurrentPage(1);
  };

  //熱門/按讚排序功能
  const handleSort = (type) => {
    setSortType(type);
    setActiveSort(type); //點擊後變色
    let sortedProducts = [...allProducts];
    if (type === "favoriteCount") {
      sortedProducts.sort((a, b) => b.favoriteCount - a.favoriteCount);
    } else if (type === "likeCount") {
      sortedProducts.sort((a, b) => b.likeCount - a.likeCount);
    } else {
      sortedProducts.sort((a, b) => a.id - b.id);
    }
    setAllProducts(sortedProducts);
    setProducts(sortedProducts.slice(0, cardsPerPage));
    setCurrentPage(1);
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
  };

  // 分頁功能
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  //   setProducts(
  //     allProducts.slice((page - 1) * cardsPerPage, page * cardsPerPage)
  //   );
  // };

  useEffect(() => {
    getAllProducts();
  }, []);

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
                          "臺北市",
                          "桃園市",
                          "新竹縣",
                          "新竹市",
                          "苗栗縣",
                          "苗栗市",
                          "臺中市",
                          "彰化縣",
                          "南投縣",
                          "雲林縣",
                          "嘉義縣",
                          "嘉義市",
                          "臺南市",
                          "高雄市",
                          "屏東縣",
                          "臺東縣",
                          "花蓮縣",
                          "宜蘭縣",
                        ].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${
                              selectedTags.includes(tag) ? "active" : ""
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
                        {["音樂", "特色", "日式", "複合", "運動"].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${
                              selectedTags.includes(tag) ? "active" : ""
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
                          "$300內",
                          "$300 ~ $400",
                          "$400 ~ $500",
                          "$500 ~ $600",
                          "$600以上",
                        ].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className={`wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 ${
                              selectedTags.includes(tag) ? "active" : ""
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
            <p className="fs-lg-7 text-primary-1 d-none d-md-block">12</p>
          </div>
          <div className="row row-cols-2 row-cols-lg-3 gy-lg-9 gy-6 ps-lg-11 mb-lg-9 mb-8">
          {products && products.length > 0 ? (
              products.map((bar) => (
                <BarCard key={bar.id} bar={bar} />
              ))
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
                    className="pageBtn btn btn-neutral-3 d-flex align-items-center justify-content-center"
                  >
                    <span className="material-symbols-outlined text-primary-1 fs-lg-8 fs-9 align-middle">
                      <a href="#"> arrow_forward_ios</a>
                    </span>
                  </button>
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
