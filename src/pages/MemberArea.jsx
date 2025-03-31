import React from "react";
import { Link } from "react-router";


function MemberArea(){
  return(
    <>
    <title>會員專區</title>
    <div
        className="container title-bg text-primary-1 d-flex align-items-center  gap-2 gap-lg-3"
      >
        <span className="material-symbols-outlined fs-7 fs-lg-2"> person </span>
        <h1 className="fs-8 fs-md-6 fs-lg-4">會員專區</h1>
    </div>

    
    <section className="section-member-content text-neutral-white">
      <div className="container">
        <div className="row">
          {/*左側功能選單*/}
          <div className="col-lg-3">
            <ul className="member-nav-list text-primary-1 fs-9 fs-lg-7 ">
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>個人檔案</p>
                  <span className="member-notification-count">5</span>
                </Link>            
              </li>
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>收藏酒譜</p>
                  <span className="member-notification-count">5</span>
                </Link>            
              </li>
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>收藏酒吧</p>
                  <span className="member-notification-count">5</span>
                </Link>            
              </li>
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>歷史評論</p>
                  <span className="member-notification-count">5</span>
                </Link>            
              </li>
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>生日優惠券</p>
                  <span className="member-notification-count">5</span>
                </Link>            
              </li>
              <li className="member-nav-item member-logout-link">
                <Link to="/">
                  <p>登出</p>
                </Link>            
              </li>
            </ul>
          </div>
          
          {/*右側功能內容*/}
          <div className="col-lg-9">
            <h2 className=" text-primary-1 fs-9 fs-md-8 fs-lg-6">個人檔案</h2>
            <div className="profile-header d-flex justify-content-between  align-items-center">
              {/*頭像編輯icon絕對定位 */}

              <div className="profile-avatar d-flex align-items-center position-relative">
                <img src="/assets/images/Ellipse 5.png" alt="profile-avatar-img" className="profile-avatar-img" />
                <Link to="/" className="profile-img-icon position-absolute">
                  <span className="material-symbols-outlined d-block">
                    edit_square
                  </span>
                </Link>
                
                <h3 className="profile-name fs-9 fs-md-8 fs-lg-6 ms-3 ms-lg-5">emma</h3>
                
              </div>        
              <Link className="profile-edit-btn">
                <p>編輯檔案</p>
              </Link>
            </div>

            <ul className="profile-section">

            </ul>

          </div>
        </div>
        

        {/* <div className="account-settings">
          <h2>帳號管理</h2>
          <ul>
            <li className="setting-item">
              <h3>信箱</h3>
              <p className="value">123456@gmail.com</p>
            </li>

            <li className="setting-item">
              <h3>密碼</h3>
              <p className="value">******** <a href="#" className="action text-primary-1">變更密碼</a></p>
            </li>

            <li className="setting-item">
              <h3>停用帳號</h3>
              <p className="desc">停用帳號後，團隊將無法使用你的帳號內容。</p>
              <button className="action-btn">停用帳號</button>
            </li>

            <li className="setting-item">
              <h3>刪除帳號</h3>
              <p className="desc">刪除帳號後資料將永久刪除，無法復原。</p>
              <button className="action-btn">刪除帳號</button>
            </li>
          </ul>

          <h2>通知</h2>
          <ul>
            <li className="setting-item">
              <h3>電子郵件通知</h3>
              <label className="toggle-switch">
                <input type="checkbox" checked />
                <span className="slider"></span>
              </label>
            </li>
          </ul>
        </div> */}


      </div>
    </section >

    </>
  )
}

export default MemberArea;