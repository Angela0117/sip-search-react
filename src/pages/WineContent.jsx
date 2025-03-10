import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import WineCard from "../components/WineCard";
import RecipeCard from "../components/RecipeCard";

const baseUrl = import.meta.env.VITE_BASE_URL;

function WineContent() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState([]);
  const [specialsRecipe, setSpecialsRecipe] = useState([]);

  //取得商品資訊
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${baseUrl}/recipes/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error("取得產品失敗", error);
      }
    };
    fetchRecipe();
  }, [id]);

  //取得酒譜評論
  useEffect(() => {
    const getRecipeComments = async () => {
      try {
        const res = await axios.get(`${baseUrl}/recipscomments?recipeId=${id}`);
        setComment(res.data); // 設定評論為該酒譜的評論
      } catch (error) {
        console.error("取得評論失敗", error);
        alert("取得評論失敗");
      }
    };
    getRecipeComments();
  }, [id]);

  //取得特別酒譜推薦
  useEffect(() => {
    const getRecipeCard = async () => {
      try {
        const res = await axios.get(`${baseUrl}/recipes`);
        setSpecialsRecipe(res.data.slice(0, 3));
      } catch (error) {
        console.error("取得產品失敗", error);
      }
    };
    getRecipeCard();
  }, []);

  //每次跳轉都在頁面上方
  useEffect(() => {
    window.scrollTo(0, 0); // 轉跳到這個頁面時，視窗回到頂部
  }, []);

  //如果沒取到產品
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* 第一區 */}
      <div className="container">
        <section className="wine-content-intro">
          <ol className="breadcrumb fs-8 fs-lg-7 text-primary-1 pages-box section-breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/recipessearch">酒譜區</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to="/recipessearch"> {recipe.tags.join(", ")}</Link>
            </li>
          </ol>

          <WineCard key={recipe.id} recipe={recipe} />
        </section>
      </div>

      {/* 第二區 */}
      <div className="container">
        <section className="wine-comments" data-aos="zoom-in-up">
          <div className="text-center m-13">
            <h2
              className="fs-6 fs-md-5 fs-lg-3 text-primary-1"
              data-aos="zoom-in-up"
            >
              品酒討論
            </h2>
          </div>

          <div className="wine-comments-section bg-primary-1 px-6 px-md-15 py-10 py-md-11 mx-md-11">
            <div className="user-info" data-aos="fade-right">
              <img src="../assets/images/Ellipse 9.png" alt="Angela's avatar" />
              <span className="eng-font fs-8 fs-md-7 text-primary-4 fw-bold">
                Angela
              </span>
              <span className="fs-9 fs-md-9 text-neutral-3">03-16-2025</span>
            </div>
            <div className="comments-box" data-aos="fade-right">
              <textarea
                placeholder="分享你調酒的經驗、喜好和看法吧！"
                maxLength="500"
              ></textarea>
              <div className="comments-box-footer">
                <span className="comments-box-char-count">0/500</span>
                <button className="comments-box-submit-btn">
                  <span className="material-symbols-outlined"> send </span>
                </button>
              </div>
            </div>

            <ul className="wine-comments-list mt-6 mb-10 my-md-11 d-flex">
              {comment.map((comment, index) => (
                <li
                  key={index}
                  className="wine-comments-list-item d-flex"
                  data-aos="fade-right"
                >
                  <div className="wine-comments-list-info d-flex align-items-center">
                    <img
                      src={"/assets/images/Ellipse 11.png"}
                      alt="User's avatar"
                    />
                    <span className="eng-font fs-8 fs-md-7 text-primary-4 fw-bold pt-1">
                      {/* 留空的名字 */}
                    </span>
                    <span className="wine-comments-list-date fs-9 fs-md-8 text-neutral-3">
                      {/* 留空的日期 */}
                    </span>
                  </div>
                  <div className="wine-comments-list-area">
                    <p className="fs-9 fs-md-8">{comment.content}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a className="d-block" href="#">
              <div className="wine-comments-btn d-flex justify-content-center align-items-center">
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
        <div
          className="text-center mb-6 mb-lg-11 pt-10 pt-lg-13"
          data-aos="zoom-in-up"
        >
          <p className="eng-font fs-8 fs-md-5 text-primary-1 mb-4">Specials</p>
          <h2 className="fs-6 fs-md-5 fs-lg-3 text-primary-1">
            還想來點特別的
          </h2>
        </div>

        <a className="d-block mb-6 mb-md-10" href="#">
          <div className="special-list-btn d-flex justify-content-end align-items-center">
            <p className="fs-8 fs-md-7 me-2 me-md-6">查看更多</p>
            <span className="material-symbols-outlined fs-8 fs-md-5 me-6">
              arrow_forward_ios
            </span>
          </div>
        </a>

        {/* 酒譜卡片 此處需套用emma的卡片元件 尚未修改*/}

        <div
          className="row gx-lg-13 gy-lg-13 gy-md-10 gx-md-6 flex-md-wrap flex-nowrap overflow-x-scroll scrollBar pb-10 pb-lg-13"
          data-aos="zoom-in"
        >
         {specialsRecipe.map((recipe) => (<RecipeCard key={recipe.id} recipe={recipe}/>))}
        </div>
      </div>
    </>
  );
}

export default WineContent;
