import React from "react";

function BarFinder() {
  return (
    <>
      <section
        className="section section-bar-search-banner text-center text-primary-1"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.6)
          ), url(../assets/images/barsearch/bar-search-banner.png)`,
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
                className="form-control p-2 py-md-3 px-md-6 search-input"
                placeholder="立即搜尋"
                aria-label="Search"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              />
              <span className="input-group-text material-symbols-outlined fs-8 fs-md-5">
                search
              </span>
            </div>
            <div id="selected-tags" className="d-flex flex-wrap mx-auto"></div>
          </div>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
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
                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-left-btn"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-10 fs-8 d-flex align-items-center">
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
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          基隆市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          新北市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          臺北市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          桃園市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          新竹縣
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          新竹市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          苗栗縣
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          苗栗市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          臺中市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          彰化縣
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          南投縣
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          雲林縣
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          嘉義縣
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          嘉義市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          臺南市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          高雄市
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          屏東縣
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          臺東縣
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          花蓮縣
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          宜蘭縣
                        </button>
                      </div>
                    </div>

                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-right-btn"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-8 d-flex align-items-center">
                        arrow_forward_ios
                      </span>
                    </a>
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
                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-left-btn-1"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-10 fs-8 d-flex align-items-center">
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
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          音樂
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          特色
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          日式
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          複合
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          運動
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          運動
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          運動
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          運動
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          運動
                        </button>
                      </div>
                    </div>

                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-right-btn-1"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-8 d-flex align-items-center">
                        arrow_forward_ios
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-lg-1 col-3 mb-6">
                  <h5 className="text-primary-1 fs-9 fs-lg-7 text-nowrap">
                    單人均消
                  </h5>
                </div>
                <div className="col-lg-5 col-9 g-0 mb-6">
                  <div className="border-lg py-lg-3 d-flex justify-content-between align-items-center">
                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-left-btn-2"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-10 fs-8 d-flex align-items-center">
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
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          $300內
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          $300 ~ $400
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          $400 ~ $500
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          $500 ~ $600
                        </button>
                        <button
                          type="button"
                          className="wineBtn wineBtn-outline rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1"
                        >
                          $600以上
                        </button>
                      </div>
                    </div>

                    <a
                      href="javascript:void(0);"
                      className="scroll-control"
                      id="scroll-right-btn-2"
                    >
                      <span className="material-symbols-outlined text-primary-3 ps-lg-4 pe-lg-10 fs-8 d-flex align-items-center">
                        arrow_forward_ios
                      </span>
                    </a>
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
                      臺北市
                      <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-lg-3">
                        close
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-1 fs-lg-8 fs-10 py-lg-2 py-1 px-lg-4 px-2 me-1 text-primary-1 text-nowrap"
                    >
                      特色
                      <span className="material-symbols-outlined align-middle fs-10 fs-lg-6 ms-lg-3">
                        close
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn active btn-outline-primary-3 rounded-pill me-lg-6 me-1 fs-lg-8 fs-10 py-lg-2 py-1 px-lg-4 px-2 me-1 text-primary-1 text-nowrap"
                    >
                      $300內
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
                        <a className="dropdown-item text-primary-1" href="#">
                          熱門程度
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-primary-1" href="#">
                          按讚數
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- <div className="d-md-none">
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
                      <li><a className="dropdown-item" href="#">熱門程度</a></li>
                      <li><a className="dropdown-item" href="#">按讚數</a></li>
                    </ul>
                  </div>
                </div> --> */}
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
            <p className="fs-lg-7 text-primary-1 d-none d-md-block">共39筆</p>
          </div>
          <div className="row row-cols-2 row-cols-lg-3 gy-lg-9 gy-6 ps-lg-11 mb-lg-9 mb-8">
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <a className="card-title fs-lg-7 text-neutral-1" href="google.com">
                    貓下去敦北俱樂部
                  </a>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
            <div className="col bar-card">
              <img src="/assets/images/barfinder/image1.png" alt="img1" />
              <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-title fs-lg-7 text-neutral-1">
                    貓下去敦北俱樂部
                  </p>
                  <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                    令人放鬆的餐館，供應麵食與台式牛排等在地美食，以及葡萄酒和啤酒。
                  </p>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    臺北市
                  </button>
                  <button
                    type="button"
                    className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
                  >
                    可供訂位
                  </button>
                </div>
              </div>
            </div>
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
