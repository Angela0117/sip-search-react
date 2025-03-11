import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BarContentCard from "../components/BarContentCard";

const baseUrl = import.meta.env.VITE_BASE_URL;


function BarContent() {
  const { id } = useParams();
  const [recommendedBars, setRecommendedBars] = useState([]);

  //取得推薦酒吧名單
  useEffect(() => {
    const getBarContentCard = async () => {
      try {
        const res = await axios.get(`${baseUrl}/bars`);
        setRecommendedBars(res.data.slice(0, 3));
      } catch (error) {
        console.error("取得產品失敗", error);
      }
    };
    getBarContentCard();
  }, []);





  return (
    <>
      <section className="section section-breadcrumb">
        <div className="container">
          <ol className="breadcrumb fs-8 fs-lg-7 ps-lg-11">
            <li className="breadcrumb-item"><Link to="/barfinder">酒吧區</Link></li>
            <li className="breadcrumb-item"><a href="#">台北酒吧</a></li>
            <li className="breadcrumb-item active">
              <a href="#" className="eng-font">Blue Note Taipei</a>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section-barContent">
        <div className="container">
          <div className="main-title px-lg-11">
            <h2 className="eng-font fs-6 fs-md-5 fs-lg-3">Blue Note Taipei</h2>
            <ul className="icon-list my-auto">
              <li className="icon-item">
                <a href="#">
                  <span className="material-symbols-outlined"> thumb_up </span>
                </a>
                <span>66</span>
              </li>
              <li className="icon-item">
                <a href="#">
                  <span className="material-symbols-outlined"> favorite </span>
                </a>
                <span>34</span>
              </li>
              <li className="icon-item">
                <a href="#">
                    <span className="material-symbols-outlined"> share </span>
                </a>
                  <span>分享</span>
              </li>
            </ul>
          </div>

          <ul className="tags ps-lg-11">
            <li><a href="#" className="d-block tag fs-10 fs-md-8">台北酒吧</a></li>
            <li><a href="#" className="d-block tag fs-10 fs-md-8">特色酒吧</a></li>
          </ul>

          <div className="bar-pic-list">
            <div className="pic-item">
              <img src="../assets/images/barcontent/picitem01.jpg" alt="" />
            </div>
            <div className="pic-item">
              <img src="../assets/images/barcontent/picitem02.jpg" alt="" />
            </div>
            <div className="pic-item">
              <img src="../assets/images/barcontent/picitem03.jpg" alt="" />
            </div>
            <div className="pic-item">
              <img src="../assets/images/barcontent/picitem04.jpg" alt="" />
            </div>
            <div className="pic-item">
              <img src="../assets/images/barcontent/picitem05.jpg" alt="" />
            </div>
            <div className="pic-item">
              <img src="../assets/images/barcontent/picitem06.jpg" alt="" />
            </div>
          </div>
        </div>
    </section>

    <section className="section section-about">
      <div className="container">
        <div className="txt" data-aos="fade-right">
          <div className="title ms-lg-12">
            <h3 className="fs-7 fs-lg-6">關於酒吧</h3>
            <p className="bar-intro">
              Blue Note Taipei
              位於台北市，堪稱台灣最具代表性的爵士酒吧之一。酒吧以溫暖的氛圍和專業的現場表演而聞名，吸引了大量爵士樂迷與樂手聚集。每晚都有現場表演，涵蓋了經典爵士、即興演奏等不同風格，並且經常邀請國內外知名的爵士樂團登台演出。店內裝潢簡約典雅，為顧客營造出放鬆且具藝術氛圍的空間。不僅僅是音樂迷的最愛，這裡也提供豐富的雞尾酒和小吃，讓客人在享受爵士樂的同時，品嚐到獨特的飲品與美食。
            </p>
          </div>
        </div>
        <div className="pic me-lg-12" data-aos="fade-left" data-aos-duration="1000">
          <img src="../assets/images/barcontent/bar_about.jpg" alt="" />
        </div>
      </div>
    </section>

    <section className="section section-activity">
      <div className="container">
        <div className="txt" data-aos="fade-left" data-aos-duration="1000">
          <div className="title me-lg-12">
            <h3 className="fs-7 fs-lg-6">最新活動</h3>
            <p className="activity-intro me-lg-12">
              每個週六夜晚！Kaoru Uno Quartet 烏野薰四重奏
              由演奏/教學資歷豐富的鋼琴名家烏野薰老師領銜 搭檔樂壇摯友重奏組
              跳脫音符的酷派爵士 繞樑入魂
            </p>
          </div>
        </div>
        <div className="pic ms-lg-12" data-aos="fade-right" data-aos-duration="1000">
          <img src="../assets/images/barcontent/bar_activity.jpg" alt="" />
        </div>
      </div>
    </section>

    <section className="section section-contact">
      <div className="container">
        <div className="pic" data-aos="fade-right" data-aos-duration="1000">
          <img src="../assets/images/barcontent/bar_map.png" alt="" />
        </div>
        <div className="txt" data-aos="fade-left" data-aos-duration="1000">
          <div className="title text-center mb-lg-2">
            <h3 className="fs-7 fs-lg-6">聯繫我們</h3>
          </div>

          <div className="contact-detail p-4">
            <p className="location mb-2">
              <span className="material-symbols-outlined"> home </span>台北市大安區羅斯福路三段171號4F
            </p>
            <p className="tel">
              <span className="material-symbols-outlined"> call </span>
              <a href="tel:+0223622333">0223622333</a>
            </p>
          </div>

          <div className="title text-center mb-lg-2">
            <h3 className="fs-7 fs-lg-6">營業時間</h3>
          </div>
          <div className="opentimes p-4">
            <ul className="week-list">
              <li className="week-item">星期日</li>
              <li className="week-item">星期一</li>
              <li className="week-item">星期二</li>
              <li className="week-item">星期三</li>
              <li className="week-item">星期四</li>
              <li className="week-item">星期五</li>
              <li className="week-item">星期六</li>
            </ul>
            <ul className="opentimes-list">
              <li className="opentimes-item">14:30-00:00</li>
              <li className="opentimes-item">20:00-00:00</li>
              <li className="opentimes-item">休息</li>
              <li className="opentimes-item">20:00-00:00</li>
              <li className="opentimes-item">20:00-00:00</li>
              <li className="opentimes-item">20:00-00:00</li>
              <li className="opentimes-item">20:00-00:00</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section
      className="section section-bar-comment"
      data-aos="fade-up"
      data-aos-duration="1000">
      <div className="container">

        <div className="comment-bg bg-primary-1">
          <h2 className="text-center mb-4 fs-6 fs-lg-5">聊聊這間酒吧</h2>
          <div className="user-item">
            <div className="user-avatar">
              <img src="../assets/images/barcontent/avatar01.png" alt="" />
            </div>
            <span className="user-name eng-font">Aaron</span>
          </div>
          <div className="user-comment">
            <textarea
              name=""
              id=""
              placeholder="分享您對於這間酒吧的看法"
            ></textarea>
            <div className="icon">
              <span>0/500</span>
              <span className="material-symbols-outlined"> send </span>
            </div>
          </div>

          <div className="user-past grid-list">
            <div className="grid-item">
              <div className="user-item">
                <div className="user-avatar">
                  <img src="../assets/images/barcontent/avatar02.png" alt="" />
                </div>
                <span className="user-name eng-font">Emily</span>
              </div>
              <p className="user-past-comment">
                這裡的餐點精緻且美味，爵士樂的現場演奏更是增添了氣氛！不僅是美食愛好者的天堂，也是音樂迷不可錯過的好去處。
              </p>
            </div>
            <div className="grid-item">
              <div className="user-item">
                <div className="user-avatar">
                  <img src="../assets/images/barcontent/avatar03.png" alt="" />
                </div>
                <span className="user-name eng-font">James</span>
              </div>
              <p className="user-past-comment">
                現場樂隊水準很高，每晚都有不同的演出，感覺就像置身於紐約的地下爵士酒吧，非常難忘的體驗。
              </p>
            </div>
            <div className="grid-item">
              <div className="user-item">
                <div className="user-avatar">
                  <img src="../assets/images/barcontent/avatar04.png" alt="" />
                </div>
                <span className="user-name eng-font">Sophia</span>
              </div>
              <p className="user-past-comment">
                服務生友善且專業，提供了細心的建議。點的雞尾酒非常精緻，還有超棒的爵士樂背景，是約會的絕佳地點！
              </p>
            </div>
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
        {recommendedBars.map((bar) => (<BarContentCard key={bar.id} bar={bar}/>))}
        
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

    </>
  )
}


export default BarContent;