import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link, useParams } from "react-router-dom";

function MemberProfile() {

  const { dataAxios } = useUser();
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState({});//預設頁面為null


  //取得會員資訊
  useEffect(() => {
    const fetcUserInfo = async () => {
      try {
        const res = await dataAxios.get(`/users/${id}`);
        setUserDetail(res.data);
      } catch (error) {
        console.error("取得用戶資料失敗", error);
      }
    };
    fetcUserInfo();

  }, [id])





  return (
    <>
      {/*右側功能內容*/}
      <div className="col-lg-9">
        <h2 className=" text-primary-1 fs-9 fs-md-8 fs-lg-6">個人檔案</h2>
        <div className="profile-header d-flex justify-content-between  align-items-center">

          {/*頭像編輯icon絕對定位 */}
          <div className="profile-avatar d-flex align-items-center ">
            <div className="position-relative">
              <img src={userDetail.imagesUrl} className="profile-avatar-img" />
              <Link to="/" className="profile-img-link position-absolute">
                <span className="material-symbols-outlined d-block profile-img-icon">
                  edit_square
                </span>
              </Link>
            </div>

            <h3 className="profile-name fs-9 fs-md-8 fs-lg-6 ms-3 ms-lg-5">{userDetail.nickname}</h3>
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
              <span className="fs-10 fs-lg-8">{userDetail.email}</span>
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
              <label className="setting-toggle-label ">
                <input type="checkbox" name="" id="" className="email-noti-toggle" />
                <span className="btn-box ">
                  <span className="btn-item"></span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberProfile;