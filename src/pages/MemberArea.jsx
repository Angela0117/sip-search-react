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
        <div className="row d-flex justify-content-between">
          {/*左側功能選單*/}
          <div className="col-lg-3">
            <ul className="member-nav-list text-primary-1 fs-9 fs-md-8 fs-lg-7 ">
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>個人檔案</p>
                </Link>            
              </li>
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>收藏酒譜</p>
                  <span className="member-noti-count">5</span>
                </Link>            
              </li>
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>收藏酒吧</p>
                  <span className="member-noti-count">5</span>
                </Link>            
              </li>
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>歷史評論</p>
                  <span className="member-noti-count">5</span>
                </Link>            
              </li>
              <li className="member-nav-item">
                <Link to="/"  className="d-flex  gap-2 gap-lg-3">
                  <p>生日優惠券</p>
                  <span className="member-noti-count">5</span>
                </Link>            
              </li>
              <li className="member-nav-item member-logout-link  d-none d-lg-block">
                <Link to="/">
                  <p>登出</p>
                </Link>            
              </li>
            </ul>
          </div>
          
          {/*右側功能內容*/}
          <div className="col-lg-8">
            <h2 className=" text-primary-1 fs-9 fs-md-8 fs-lg-6">個人檔案</h2>
            <div className="profile-header d-flex justify-content-between  align-items-center">

              {/*頭像編輯icon絕對定位 */}              
              <div className="profile-avatar d-flex align-items-center ">
                <div className="position-relative">
                  <img src="/assets/images/Ellipse 5.png" alt="profile-avatar-img" className="profile-avatar-img" />
                  <Link to="/" className="profile-img-link position-absolute">
                    <span className="material-symbols-outlined d-block profile-img-icon">
                      edit_square
                    </span>
                  </Link>  
                </div>
                              
                <h3 className="profile-name fs-9 fs-md-8 fs-lg-6 ms-3 ms-lg-5">emma</h3>             
              </div>        
              <Link to="/" className="profile-edit-btn">
                <p className="fs-9 fs-lg-7">編輯檔案</p>
              </Link>
            </div>

            {/*設定內容*/}
            <div className="account-settings">
              <h3 className="section-title fs-9 fs-lg-7">帳號管理</h3>
              <ul className="setting-list">
                <li className="setting-item">
                  <h4 className="fs-9 fs-lg-7">信箱</h4>
                  <span className="fs-10 fs-lg-8">123456@gmail.com</span>
                </li>
                <li className="setting-item">
                  <h4 className="fs-9 fs-lg-7">密碼</h4>
                  <div className="d-flex">
                    <span className="fs-10 fs-lg-8 me-2 me-lg-5">********</span>
                    <Link to="/" className="setting-link  text-decoration-underline fs-10 fs-lg-8">變更密碼</Link>
                  </div>
                  
                </li>
                <li className="setting-item">
                  <div className="setting-item-content">
                    <h4 className="fs-9 fs-lg-7 mb-2">停用帳號</h4>
                    <p className="fs-10 fs-lg-9">停用帳號將會關閉您的個人檔案以及您分享過的所有訊息。重新登入您的帳號將會啟用被停用的帳號。</p>
                  </div>
                  <Link to="/" className="setting-link  text-decoration-underline fs-10 fs-lg-8">停用帳號</Link>                
                </li>
                <li className="setting-item">
                  <div className="setting-item-content">
                    <h4 className="fs-9 fs-lg-7 mb-2">刪除帳號</h4>
                    <p className="fs-10 fs-lg-9">將帳號永久刪除。在帳號被刪除後，你將無法重新恢復你的帳號，也無法再取得你張貼過的任何訊息。</p>
                  </div>
                  <Link to="/" className="setting-link  text-decoration-underline fs-10 fs-lg-8">刪除帳號</Link>                
                </li>
              </ul>
              <h3 className="section-title fs-9 fs-lg-7">通知</h3>

             
              <div className="setting-item d-flex justify-content-between align-items-center mt-4 mt-lg-8 b-none">
                <div className="setting-item-content">
                  <h4 className="fs-9 fs-lg-7 mb-2">電子郵件通知</h4>
                  <p className="fs-10 fs-lg-9">接收最新的酒吧活動訊息。</p>
                </div>

                 {/*toggle組件 */}
                <div>
                  <label>
                    <input type="checkbox" name="" id="" className="email-noti-toggle"/>
                    <span className="btn-box ">
                      <span className="btn-item"></span>      
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
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