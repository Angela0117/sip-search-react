import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Outlet, Link, useParams } from "react-router-dom";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";


function MemberArea() {
  const [activeItem, setActiveItem] = useState('profile');//預設頁面為個人檔案
  const { user, } = useUser();
  const { id } = useParams();


  //左側選單陣列 
  const menuItems = [
    { id: 'profile', label: '個人檔案', link: "" },
    { id: 'favorite_recipes', label: '收藏酒譜', count: `${user?.favorite_recipes?.length || 0}`, link: 'recipes' },
    { id: 'favorite_bars', label: '收藏酒吧', count: `${user?.favorite_bars?.length || 0}`, link: 'bars' },
    { id: 'comments', label: '歷史評論', count: "", link: 'comments' },
    { id: 'coupon', label: '生日優惠券', count: "", link: 'coupons' },
    //user?.favorite_recipes?.length || 0
    //如果還沒拿到會員資料 ➜ 回傳 0，拿到資料 ➜ 顯示正確數量

  ];

  //取得會員資訊
  useEffect(() => {
    const fetcUserInfo = async () => {
      try {
        //const res = await dataAxios.get(`/users/${id}`);
        //setUserDetail(res.data);
      } catch (error) {
        console.error("取得用戶資料失敗", error);
      }
    };
    fetcUserInfo();

  }, [id])


  //Swiper 設定

  useEffect(() => {

    new Swiper(".member-nav-swiper", {
      slidesPerView: 3,//預設顯示3個預設
      //spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        // 當螢幕寬度大於等於 480px 時，顯示4個項目
        480: {
          slidesPerView: 4,
        },
      },
    });

  }, []);

  return (
    <>
      <title>會員專區</title>
      <div
        className="container title-bg text-primary-1 d-flex align-items-center gap-2 gap-lg-3"
      >
        <span className="material-symbols-outlined fs-7 fs-lg-2"> person </span>
        <h1 className="fs-8 fs-md-6 fs-lg-4">會員專區</h1>
      </div>

      <section className="section-member-content text-neutral-white">
        <div className="container">
          <div className="row d-flex justify-content-between">
            {/*左側功能選單*/}
            <div className="col-lg-2">
              <ul className="member-nav-list text-primary-1 fs-9 fs-md-8 fs-lg-7 ">

                {menuItems.map(item => (
                  <li
                    key={item.id}
                    className={`member-nav-item d-none d-md-none d-lg-block ${activeItem === item.id ? 'nav-item-active' : ''}`}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <Link to={`/users/${id}/${item.link}`} className="d-flex gap-2 gap-lg-3">
                      <p>{item.label}</p>
                      {item.count && <span className="member-noti-count">{item.count}</span>}
                    </Link>
                  </li>
                ))}

                {/* 行動板使用Swiper切換欄位*/}
                <div className="swiper mySwiper member-nav-swiper ps-3 d-block d-lg-none" >
                  <div className="swiper-wrapper">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className={`swiper-slide member-nav-item ${activeItem === item.id ? 'nav-item-active' : ''}`}
                        onClick={() => setActiveItem(item.id)}
                      >
                        <Link to={`/users/${id}/${item.link}`} className="d-flex gap-2 gap-lg-3">
                          <p>{item.label}</p>
                          {item.count && <span className="member-noti-count">{item.count}</span>}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Swiper 導覽箭頭 */}
                  <div className="swiper-button-next">
                    <span className="material-symbols-outlined ms-8 nav-icon-next">arrow_forward_ios</span>
                  </div>
                  <div className="swiper-button-prev">
                    <span className="material-symbols-outlined me-6 nav-icon-prev">arrow_back_ios</span>
                  </div>
                </div>

                {/* 手機版顯示swiper
              <div className="swiper mySwiper ps-3 d-block d-lg-none" ref={swiperRef} >
                <div className="swiper-wrapper ">
                  <div className="swiper-slide"> 
                    <li className="member-nav-item ">
                      <Link to="/memberarea"  className="d-flex  gap-2 gap-lg-3">
                        <p>個人檔案</p>
                      </Link>            
                    </li>
                  </div>
                  <div className="swiper-slide">
                      <li className="member-nav-item">
                        <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                          <p>收藏酒譜</p>
                          <span className="member-noti-count">{userDetail.favorite_recipes?.length ?? 0}</span>
                        </Link>            
                      </li>
                  </div>
                  <div className="swiper-slide">
                      <li className="member-nav-item">
                        <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                          <p>收藏酒吧</p>
                          <span className="member-noti-count">{userDetail.favorite_bars?.length ?? 0}</span>
                        </Link>            
                      </li>
                  </div>
                  <div className="swiper-slide">
                      <li className="member-nav-item">
                        <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                          <p>歷史評論</p>
                          <span className="member-noti-count">5</span>
                        </Link>            
                      </li>
                  </div>
                  <div className="swiper-slide"> 
                      <li className="member-nav-item">
                        <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                          <p>生日優惠券</p>
                        </Link>            
                      </li>
                  </div>
                </div>
                  <div className="swiper-button-next">
                    <span className="material-symbols-outlined ms-8 nav-icon-next">
                    arrow_forward_ios
                    </span>
                  </div>
                  <div className="swiper-button-prev">
                    <span className="material-symbols-outlined me-6 nav-icon-prev">
                    arrow_back_ios
                    </span>
                  </div>
                  <div className="swiper-scrollbar member-nav-swiper-scrollbar"></div>
              </div> */}

                <li className="member-nav-item member-logout-link  d-none d-lg-block">
                  <Link to="/">
                    <p>登出</p>
                  </Link>
                </li>
              </ul>
            </div>
            <Outlet />

            {/* 手機版時出現：右側內容的最底部登出按鈕 */}
            <div className="logout-mobile-btn d-block d-lg-none">
              <button className="btn btn-logout">登出</button>
            </div>
          </div>
        </div>
      </section >

    </>
  )
}

export default MemberArea;