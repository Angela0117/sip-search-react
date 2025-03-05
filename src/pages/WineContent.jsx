import React from "react";

function WineContent() {

  return (
    <>
    {/* 第一區 */}
      <div className="container">
        <section className="wine-content-intro">
          <ol className="breadcrumb fs-8 fs-lg-7 text-primary-1 pages-box section-breadcrumb" >
            <li className="breadcrumb-item"><a href="#">酒譜區</a></li>
            <li className="breadcrumb-item active">
              <a href="#">{recipes[0].flavor}</a>
            </li>
          </ol>

          <div className="wine-content-title text-primary-1 text-center" data-aos="fade-down">
            <h1 className="fs-6 fs-md-5 fs-lg-3 " data-aos="zoom-in-up">
              <span className="me-6">{recipes[0].title}</span>
              <span className="eng-font">{recipes[0]._en}</span>
            </h1>
          </div>

          <div className="wine-content-methods d-flex pb-lg-10">
            <div className="methods-item-1 ms-lg-11" data-aos="flip-right" data-aos-duration="1000">
              <img
                className="methods-item-1-img"
                src="../assets/images/winecontent-negroni.png"
                alt="Negroni"
              />

              <ul
                className="methods-icon fs-9 fs-md-8 bg-primary-3 text-neutral-1 d-flex"
              >
                <li className="methods-icon-item d-flex">
                  <a className="material-symbols-outlined methods-icon-btn" href="#">
                    thumb_up
                  </a>
                  <p>{recipes[0].likes}</p>
                </li>

                <li className="methods-icon-item d-flex">
                  <a className="material-symbols-outlined methods-icon-btn" href="#">
                    favorite
                  </a>
                  <p>{recipes[0].favorite}</p>
                </li>

                <li className="methods-icon-item d-flex">
                  <a className="material-symbols-outlined methods-icon-btn" href="#">
                    share
                  </a>
                  <p>分享</p>
                </li>
              </ul>
            </div>

            <div className="methods-item-2 me-lg-11" data-aos="fade-up-left" data-aos-duration="1000">
              <div className="methods-item-2-text">
                <div className="methods-tags fs-10 fs-md-8 text-primary-3 d-flex mt-md-10">
                  <a href="#" className="btn-tags">{recipes[0].tags}</a>
                  <a href="#" className="btn-tags">{recipes[0].tags}</a>
                  <a href="#" className="btn-tags">{recipes[0].tags}</a>
                </div>
                <p className="fs-9 fs-md-8 text-neutral-1 mt-2 mt-md-10">
                {recipes[0].content}
                </p>
              </div>

              <div className="methods-item-2-step text-neutral-1 mt-6 mt-md-11">
                <div className="methods-item-2-step-title px-8 px-md-11 py-2 py-md-4">
                  <h5 className="fs-8 fs-md-6">調酒作法</h5>
                </div>
                <ul
                  className="methods-item-2-step-content  fs-9 fs-md-8 ps-12 pe-10 pt-5 pb-5"
                >
                  <li>
                    <p>
                      材料比例：
                      <br />
                      {recipes[0].ingredients[0].ingredient} <span className="eng-font">{recipes[0].ingredients[0].amount}</span>、{recipes[0].ingredients[0].ingredient} <span className="eng-font">{recipes[0].ingredients[0].amount}</span> 、{recipes[0].ingredients[0].ingredient}  <span className="eng-font">{recipes[0].ingredients[0].amount}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      步驟：
                      <br />
                      {recipes[0].instructions}
                    </p>
                  </li>
                  <li>
                    <p>{recipes[0].garnish}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    {/* 第二區 */}
    <div className="container">
      <section className="wine-comments" data-aos="zoom-in-up">
        <div className="text-center m-13">
          <h2 className="fs-6 fs-md-5 fs-lg-3 text-primary-1" data-aos="zoom-in-up">品酒討論</h2>
        </div>

        <div class="wine-comments-section bg-primary-1 px-6 px-md-15 py-10 py-md-11 mx-md-11">
          <div className="user-info" data-aos="fade-right">
            <img
              src="../assets/images/Ellipse 9.png"
              alt="Angela's avatar"             
            />
            <span className="eng-font fs-8 fs-md-7 text-primary-4 fw-bold">Angela</span>
            <span className="fs-9 fs-md-9 text-neutral-3">09-23-2024</span>
          </div>
          <div className="comments-box" data-aos="fade-right">
            <textarea placeholder="分享你調酒的經驗、喜好和看法吧！"maxLength="500"></textarea>
            <div className="comments-box-footer">
              <span className="comments-box-char-count">0/500</span>
              <button className="comments-box-submit-btn">
                <span className="material-symbols-outlined"> send </span>
              </button>
            </div>
          </div>

          <ul className="wine-comments-list mt-6 mb-10 my-md-11 d-flex">
            <li className="wine-comments-list-item d-flex" data-aos="fade-right">
              <div className="wine-comments-list-info d-flex align-items-center">
                <img
                  src="/assets/images/Ellipse 11.png"
                  alt="Nate's avatar"                 
                />
                <span className="eng-font fs-8 fs-md-7 text-primary-4 fw-bold pt-1"
                  >Nate</span>
                <span
                  className="wine-comments-list-date fs-9 fs-md-8 text-neutral-3"
                  >09-23-2024</span>
              </div>
              <div className="wine-comments-list-area">
                <p className="fs-9 fs-md-8">酸甜好滋味！！喝起來很順口</p>
              </div>
            </li>
            <li className="wine-comments-list-item d-flex" data-aos="fade-right">
              <div className="wine-comments-list-info d-flex align-items-center">
                <img
                  src="/assets/images/Ellipse 8.png"
                  alt="Chris's avatar"                 
                />
                <span className="eng-font fs-8 fs-md-7 text-primary-4 fw-bold pt-1"
                  >Chris</span>
                <span
                  className="wine-comments-list-date fs-9 fs-md-8 text-neutral-3"
                  >09-23-2024</span>
              </div>
              <div className="wine-comments-list-area">
                <p className="fs-9 fs-md-8">
                  適合新手的酒譜，上手容易，味道和專業酒吧差不多
                </p>
              </div>
            </li>
            <li className="wine-comments-list-item d-flex" data-aos="fade-right">
              <div className="wine-comments-list-info d-flex align-items-center">
                <img
                  src="/assets/images/Ellipse 10.png"
                  alt="Kasie's avatar"                  
                />
                <span className="eng-font fs-8 fs-md-7 text-primary-4 fw-bold pt-1"
                  >Kasie</span>
                <span
                  className="wine-comments-list-date fs-9 fs-md-8 text-neutral-3"
                  >09-23-2024</span>
              </div>
              <div className="wine-comments-list-area">
                <p className="fs-9 fs-md-8">材料準備容易，適合夏天晚上小酌</p>
              </div>
            </li>
          </ul>
          <a className="d-block" href="#">
            <div
              className="wine-comments-btn d-flex justify-content-center align-items-center">
              <p className="fs-8 fs-md-7 me-2 me-md-3">查看更多</p>
              <span className="material-symbols-outlined fs-8 fs-md-7 ">
                arrow_forward_ios
              </span>
            </div>
          </a>
        </div>    
      </section>
    </div>
    
    {/* 第三區 */}

    <div className="container special-list">
        <div className="text-center mb-6 mb-lg-11 pt-10 pt-lg-13" data-aos="zoom-in-up">
          <p className="eng-font fs-8 fs-md-5 text-primary-1 mb-4">Specials</p>
          <h2 className="fs-6 fs-md-5 fs-lg-3 text-primary-1">還想來點特別的</h2>
        </div>

        <a className="d-block mb-6 mb-md-10" href="#">
          <div
            className="special-list-btn d-flex justify-content-end align-items-center"
          >
            <p className="fs-8 fs-md-7 me-2 me-md-6">查看更多</p>
            <span className="material-symbols-outlined fs-8 fs-md-5 me-6">
              arrow_forward_ios
            </span>
          </div>
        </a>

    {/* 酒譜卡片 此處需套用emma的卡片元件 尚未修改*/}

    <div className="row gx-lg-13 gy-lg-13 gy-md-10 gx-md-6 flex-md-wrap flex-nowrap overflow-x-scroll scrollBar pb-10 pb-lg-13" data-aos="zoom-in">
      <div className="col-lg-4 col-md-6 col-9 overflow-hidden">
        <div className="card-container">
          <div className="card special-list-card-bg position-relative">
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
                <h5 className="card-title text-primary-1 fs-6 fs-md-5 mb-lg-3 ">花花公子</h5>

                <img
                  src="/assets/images/image-Boulevardier.png"
                  className="card-img-bottom cardImg"
                  alt="image-Boulevardier"
                />
                <div className="d-flex justify-content-end me-lg-9 me-6">
                  <a
                    href="#"
                    className="cardBtn btn btn-primary-1 rounded-circle"
                    ><span className="material-symbols-outlined align-baseline text-primary-4">
                      arrow_forward
                    </span></a>
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
                <h4 className="eng-font text-primary-4 fs-lg-4 fs-6">Boulevardier</h4>
                <h6 className="text-primary-4 mt-lg-1 fs-lg-6 fs-8">
                  花花公子
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
                  一款風格時尚的雞尾酒，通常以伏特加或龍舌蘭為基底，加入蔓越莓汁、橙酒與檸檬汁調製而成。酸甜清爽的口感，搭配鮮豔的顏色，為派對增添一抹活力和誘惑。
                </p>
                <div className="d-flex justify-content-between">
                  <img
                    className="cardImg-hover card-hoverImg mb-lg-3"
                    src="/assets/images/image-Boulevardier.png"
                    alt="image-Boulevardier"
                  />
                  <a
                    href="#"
                    className="cardBtn cardBtn-primary-4 rounded-circle mt-auto"
                    ><span className="material-symbols-outlined align-baseline">
                      arrow_forward
                    </span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-9 overflow-hidden">
        <div className="card-container">
          <div className="card special-list-card-bg">
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
                <h5 className="card-title text-primary-1 fs-6 fs-md-5 mb-lg-3">阿佩羅雞尾酒</h5>

                <img
                  src="/assets/images/image-AperolSpritz.png"
                  className="card-img-bottom cardImg"
                  alt="image-Boulevardier"
                />
                <div className="d-flex justify-content-end me-lg-9 me-6">
                  <a
                    href="#"
                    className="cardBtn btn btn-primary-1 rounded-circle"
                    ><span className="material-symbols-outlined align-baseline text-primary-4">
                      arrow_forward
                    </span></a>
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
                <h4 className="eng-font text-primary-4 fs-lg-4 fs-6">Aperol Spritz</h4>
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
                      鳳梨
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
                    alt="image-Boulevardier"
                  />
                  <a
                    href="#"
                    className="cardBtn cardBtn-primary-4 rounded-circle mt-auto"
                    ><span className="material-symbols-outlined align-baseline">
                      arrow_forward
                    </span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-9 overflow-hidden">
        <div className="card-container">
          <div className="card special-list-card-bg">
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
                <h5 className="card-title text-primary-1 fs-6 fs-md-5 mb-lg-3">奧林匹克</h5>

                <img
                  src="/assets/images/image-olympic.png"
                  className="card-img-bottom cardImg"
                  alt="image-Boulevardier"
                />
                <div className="d-flex justify-content-end me-lg-9 me-6">
                  <a
                    href="#"
                    className="cardBtn btn btn-primary-1 rounded-circle"
                    ><span className="material-symbols-outlined align-baseline text-primary-4">
                      arrow_forward
                    </span></a>
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
                <h4 className="eng-font text-primary-4 fs-lg-4 fs-6">Olympic</h4>
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
                    className="cardImg-hover card-hoverImg mb-lg-3"
                    src="/assets/images/image-olympic.png"
                    alt="image-Boulevardier"
                  />
                  <a
                    href="#"
                    className="cardBtn cardBtn-primary-4 rounded-circle mt-auto"
                    ><span className="material-symbols-outlined align-baseline">
                      arrow_forward
                    </span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    
    </>
  )
}



export default WineContent; 
