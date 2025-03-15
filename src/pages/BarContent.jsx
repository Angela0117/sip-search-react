import React, { use } from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BarContentCard from "../components/BarContentCard";
import images from "../images";
import { useUser } from "../contexts/UserContext";

// const baseUrl = import.meta.env.VITE_BASE_URL;

function BarContent() {
  const { id } = useParams();
  const { user, dataAxios } = useUser(); // 添加 useUser hook
  const [newComment, setNewComment] = useState(""); // 添加評論內容狀態
  const [recommendedBars, setRecommendedBars] = useState([]);
  const [bar, setBar] = useState(null);
  const [barEvent, setBarEvent] = useState(null);
  const [comment, setComment] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [googleMapIframeUrl, setGoogleMapIframeUrl] = useState(""); //地圖
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  //分享功能
  const handleShare = async (e) => {
    e.preventDefault();
    setShowShareModal(true);
  };
  // 取得當前完整 URL
  const getShareUrl = () => {
    const appUrl =
      import.meta.env.MODE === "production"
        ? "https://your-username.github.io/sip-search-react" // 替換成你的 GitHub Pages URL
        : window.location.origin;

    return `${appUrl}/barcontent/${bar.id}`; // 根據你的路由結構調整
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("複製失敗:", err);
    }
  };

  //取得推薦酒吧名單
  useEffect(() => {
    const getBarContentCard = async () => {
      try {
        const res = await dataAxios.get(`/bars`);
        setRecommendedBars(res.data.slice(0, 3));
      } catch (error) {
        console.error("取得產品失敗", error);
      }
    };
    getBarContentCard();
  }, []);

  //導航頁面
  const handleTagClick = (tag) => {
    // 移除 modal backdrop (如果有的話)
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }

    // 移除 body 上的 modal 相關 class
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    // 導航到搜索頁面並帶上 tags 參數
    navigate(`/barfinder?tags=${tag}`);
  };

  //每次跳轉都在頁面上方
  useEffect(() => {
    window.scrollTo(0, 0); // 轉跳到這個頁面時，視窗回到頂部
  }, []);

  //取得商品資訊
  useEffect(() => {
    const fetchBar = async () => {
      try {
        const res = await dataAxios.get(`/bars/${id}`);
        setBar(res.data);
        console.log("取得產品成功", res.data);
      } catch (error) {
        console.error("取得產品失敗", error);
      }
    };
    fetchBar();
  }, [id]);

  //取得活動
  const getBarEvent = async () => {
    try {
      const res = await dataAxios.get(`/events`);
      console.log("取得活動成功", res.data);
      // 找出對應這個酒吧的活動
      const barSpecificEvent = res.data.find(
        (event) => event.barId === parseInt(id)
      );
      setBarEvent(barSpecificEvent);
    } catch (error) {
      console.error("取得活動失敗", error);
    }
  };
  useEffect(() => {
    if (id) {
      getBarEvent();
      // console.log(bar.contactInfo.address);
    }
  }, [id]);

  const handleSubmitComment = async () => {
    if (!user) {
      alert("請先登入再發表評論");
      return;
    }
    if (!newComment.trim()) {
      alert("請輸入評論內容");
      return;
    }

    try {
      const commentData = {
        barId: parseInt(id),
        userId: user.id,
        content: newComment,
        createdAt: new Date().toISOString(),
      };

      await dataAxios.post("/barcomments", commentData);
      getBarComments(); // 重新獲取評論
      setNewComment(""); // 清空輸入框
    } catch (error) {
      console.error("發布評論失敗", error);
      alert("發布評論失敗");
    }
  };

  // 處理評論輸入
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  //取得評論
  const getBarComments = async () => {
    try {
      const res = await dataAxios.get(`/barcomments?barId=${id}`);
      const commentsWithUserInfo = await Promise.all(
        res.data.map(async (comment) => {
          try {
            const userRes = await dataAxios.get(`/users/${comment.userId}`);
            return {
              ...comment,
              userName: userRes.data.nickname,
              userAvatar: userRes.data.imagesUrl || images["Ellipse 11"],
            };
          } catch (userError) {
            console.log(`無法獲取用戶 ${comment.userId} 的資訊`);
            return {
              ...comment,
              userName: "",
              userAvatar: images["Ellipse 11"],
            };
          }
        })
      );
      setComment(commentsWithUserInfo);
    } catch (error) {
      console.error("取得評論失敗", error);
    }
  };

  // 在 useEffect 中調用 getBarComments
  useEffect(() => {
    if (id) {
      getBarComments();
    }
  }, [id]);

  // 處理點讚功能
  const handleLike = async () => {
    if (!user) {
      alert("請先登入");
      return;
    }
    try {
      const updatedBar = {
        ...bar,
        likeCount: isLiked ? bar.likeCount - 1 : bar.likeCount + 1,
      };
      await dataAxios.patch(`/bars/${id}`, updatedBar);
      setBar(updatedBar);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("點讚失敗:", error);
      alert("點讚失敗");
    }
  };
  // 處理收藏功能
  const handleFavorite = async () => {
    if (!user) {
      alert("請先登入");
      return;
    }

    try {
      const updatedBar = {
        ...bar,
        favoriteCount: isFavorite
          ? bar.favoriteCount - 1
          : bar.favoriteCount + 1,
      };

      await dataAxios.patch(`/bars/${id}`, updatedBar);
      setBar(updatedBar);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("收藏失敗:", error);
      alert("收藏失敗");
    }
  };

  // 生成 Google Maps iframe URL
  useEffect(() => {
    try {
      if (bar.contactInfo.addressUrl) {
        const mapUrl = bar.contactInfo.addressUrl;
        setGoogleMapIframeUrl(mapUrl);
        // console.log("取得地址成功", mapUrl);
      }
    } catch (error) {
      console.error("取得地址失敗:", error);
    }
  }, [bar]);

  //如果沒取到產品
  if (!bar) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="section section-breadcrumb">
        <div className="container">
          <ol className="breadcrumb fs-8 fs-lg-7 ps-lg-11">
            <li className="breadcrumb-item">
              <Link to="/barfinder">酒吧區</Link>
            </li>
            <li className="breadcrumb-item">
              <a
                onClick={() => handleTagClick(bar.region)}
                style={{ cursor: "pointer" }}
              >
                {bar.region}酒吧
              </a>
            </li>
            <li className="breadcrumb-item active">
              <a href="#" className="eng-font">
                {bar.name}
              </a>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section-barContent">
        <div className="container">
          <div className="main-title px-lg-11">
            <h2 className="eng-font fs-6 fs-md-5 fs-lg-3">{bar.name}</h2>
            <ul className="icon-list my-auto">
              <li className="icon-item">
                <button
                  className={`btn-no-bg ${isLiked ? "active" : ""}`}
                  onClick={handleLike}
                >
                  <span className="material-symbols-outlined">thumb_up</span>
                </button>
                <span>{bar.likeCount}</span>
              </li>
              <li className="icon-item">
                <button
                  className={`btn-no-bg ${isFavorite ? "active" : ""}`}
                  onClick={handleFavorite}
                >
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <span>{bar.favoriteCount}</span>
              </li>
              <li className="icon-item">
                <button className="btn-no-bg" onClick={handleShare}>
                  <span className="material-symbols-outlined">share</span>
                </button>
                <span>分享</span>
              </li>
            </ul>
          </div>

          <ul className="tags ps-lg-11">
            <li>
              {" "}
              <a
                onClick={() => handleTagClick(bar.region)}
                className="d-block tag fs-10 fs-md-8"
                style={{ cursor: "pointer" }}
              >
                {bar.region}酒吧
              </a>
            </li>
            <li>
              {" "}
              <a
                onClick={() => handleTagClick(bar.type)}
                className="d-block tag fs-10 fs-md-8"
                style={{ cursor: "pointer" }}
              >
                {bar.type}酒吧
              </a>
            </li>
          </ul>

          <div className="bar-pic-list">
            {bar.imagesUrl.map((image, index) => (
              <div key={index} className="pic-item">
                <img src={image} alt={`${bar.name} image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-about">
        <div className="container">
          <div className="txt" data-aos="fade-right">
            <div className="title ms-lg-12">
              <h3 className="fs-7 fs-lg-6">關於酒吧</h3>
              <p className="bar-intro">
                {bar.name}
                <br />
                {bar.description}
              </p>
            </div>
          </div>
          <div
            className="pic me-lg-12"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <img src={bar.imagesUrl[1]} alt="" />
          </div>
        </div>
      </section>

      <section className="section section-activity">
        <div className="container">
          <div className="txt" data-aos="fade-left" data-aos-duration="1000">
            <div className="title me-lg-12">
              <h3 className="fs-7 fs-lg-6">最新活動</h3>
              <p className="activity-intro me-lg-12">
                {barEvent ? barEvent.description : "目前沒有活動"}
              </p>
            </div>
          </div>
          <div
            className="pic ms-lg-12"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <img src={bar.imagesUrl[2]} alt="" />
          </div>
        </div>
      </section>

      <section className="section section-contact">
        <div className="container">
          <div className="pic" data-aos="fade-right" data-aos-duration="1000">
            {googleMapIframeUrl ? (
              <iframe
                src={googleMapIframeUrl}
                // style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${bar.name}`}
                className="addressUrl"
              ></iframe>
            ) : (
              <p>地圖載入中...</p>
            )}
          </div>
          <div className="txt" data-aos="fade-left" data-aos-duration="1000">
            <div className="title text-center mb-lg-2">
              <h3 className="fs-7 fs-lg-6">聯繫我們</h3>
            </div>

            <div className="contact-detail p-4">
              <p className="location mb-2">
                <span className="material-symbols-outlined"> home </span>{" "}
                {bar.contactInfo.address}
              </p>
              <p className="tel">
                <span className="material-symbols-outlined"> call </span>
                <a href={`tel:+${bar.contactInfo.phone}`}>
                  {bar.contactInfo.phone}
                </a>
              </p>
            </div>

            <div className="title text-center mb-lg-2">
              <h3 className="fs-7 fs-lg-6">營業時間</h3>
            </div>
            <div className="opentimes p-4">
              <ul className="week-list">
                {[
                  "sunday",
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                ].map((day, index) => (
                  <li key={day} className="week-item">
                    星期{["日", "一", "二", "三", "四", "五", "六"][index]}
                  </li>
                ))}
              </ul>
              <ul className="opentimes-list">
                {[
                  "sunday",
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                ].map((day) => (
                  <li key={day} className="opentimes-item">
                    {bar.contactInfo.openingHours[day].open
                      ? `${bar.contactInfo.openingHours[day].start}-${bar.contactInfo.openingHours[day].end}`
                      : "休息"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section-bar-comment"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="comment-bg bg-primary-1">
            <h2 className="text-center mb-4 fs-6 fs-lg-5">聊聊這間酒吧</h2>
            <div className="user-item">
              <div className="user-avatar">
                <img
                  src={user?.imagesUrl || images["Ellipse 11"]}
                  alt={`${user?.nickname || "訪客"}'s avatar`}
                  className="rounded-circle"
                />
              </div>
              <span className="eng-font fs-8 fs-md-7 text-primary-4 fw-bold">
                {user?.nickname || ""}
              </span>
            </div>
            <div className="user-comment">
              <textarea
                placeholder={
                  user ? "分享您對於這間酒吧的看法" : "請登入後發表評論"
                }
                maxLength="500"
                value={newComment}
                onChange={handleCommentChange}
                disabled={!user}
              ></textarea>
              <div className="icon">
                <span>0/500</span>
                <button
                  onClick={handleSubmitComment}
                  disabled={!user}
                  className="btn-no-bg"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>

            <div className="user-past grid-list">
              {comment.map((comment) => (
                <div key={comment.id} className="grid-item">
                  <div className="user-item">
                    <div className="user-avatar">
                      <img
                        src={images["Ellipse 11"]}
                        alt="User's avatar"
                        className="rounded-circle"
                      />
                    </div>
                    <span className="user-name eng-font">
                      {comment.userName || ""}
                    </span>
                  </div>
                  <p className="user-past-comment">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section-similar-bars"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container">
          <h2 className="text-center mb-8 fs-6 fs-lg-5">你或許會喜歡</h2>

          {/* 套用酒吧詳情卡片元件*/}

          <div className="similar-bars-list mx-lg-15">
            {recommendedBars.map((bar) => (
              <BarContentCard key={bar.id} bar={bar} />
            ))}

            {/* <div
            className="similar-bars-item"
            data-aos="flip-left"
            data-aos-duration="1200"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),url(../assets/images/barcontent/similarbar01.jpg)`
            }}
          >
            <div className="txt">
              <h3 className="bar-name fs-7 fs-lg-6">爵式</h3>
              <p className="bar-intro">
                爵士樂手的現場演奏，充滿即興魅力的旋律環繞四周，讓每位來賓沉浸在音樂的世界中，感受無與倫比的聲音共鳴。
              </p>
              <div className="tags">
                <span className="tag">高雄酒吧</span>
                <span className="tag">特色酒吧</span>
              </div>
              <a href="#" className="button"> 立即前往 </a>
            </div>
          </div>
          <div
            className="similar-bars-item"
            data-aos="flip-left"
            data-aos-duration="1200"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),url(../assets/images/barcontent/similarbar02.jpg)`
            }}
          >
            <div className="txt">
              <h3 className="bar-name eng-font fs-7 fs-lg-6">Sappho</h3>
              <p className="bar-intro">
                手工調製的創意雞尾酒，與爵士樂完美搭配，每一口酒香都隨著音樂的節奏，令人享受醇厚且獨特的味覺體驗。
              </p>
              <div className="tags">
                <span className="tag">台北酒吧</span>
                <span className="tag">特色酒吧</span>
              </div>
              <a href="#" className="button"> 立即前往 </a>
            </div>
          </div>
          <div
            className="similar-bars-item"
            data-aos="flip-left"
            data-aos-duration="1200"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(../assets/images/barcontent/similarbar03.jpg)`
            }}
          >
            <div className="txt">
              <h3 className="bar-name eng-font fs-7 fs-lg-6">Brown Sugar</h3>
              <p className="bar-intro">
                酒吧內燈光昏黃，座椅舒適，營造出靜謐而溫馨的氛圍，是放鬆心情、與好友共享時光的理想場所。
              </p>
              <div className="tags">
                <span className="tag">台北酒吧</span>
                <span className="tag">特色酒吧</span>
              </div>
              
              <a href="#" className="button"> 立即前往 </a>
            </div>
          </div> */}
          </div>
        </div>
      </section>
      {/* Share Modal */}
      {showShareModal && (
        <>
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-primary-1">
                <div className="modal-header border-0">
                  <h5 className="modal-title text-primary-4">分享這個酒吧</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowShareModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-neutral-4 text-primary-1"
                      value={getShareUrl()}
                      readOnly
                    />
                    <button
                      className="btn btn-primary-3"
                      type="button"
                      onClick={handleCopy}
                    >
                      複製連結
                    </button>
                  </div>
                  {copySuccess && (
                    <div className="text-primary-3 mt-2">已成功複製連結！</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowShareModal(false)}
          ></div>
        </>
      )}
    </>
  );
}

export default BarContent;
