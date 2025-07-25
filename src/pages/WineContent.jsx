import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WineCard from "../components/WineCard";
import RecipeCard from "../components/RecipeCard";
import images from "../images";
import { useUser } from "../contexts/UserContext";
import useFavoriteRecipes from "../hooks/useFavoriteRecipes"; // 引入 hook
import Swal from 'sweetalert2'

// const baseUrl = import.meta.env.VITE_BASE_URL;

function WineContent() {
  const { id } = useParams();
  const { user, dataAxios, setUser } = useUser(); //獲取用戶資訊
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState([]);
  const [specialsRecipe, setSpecialsRecipe] = useState([]);
  const [newComment, setNewComment] = useState(""); // 新評論的內容
  const [isLiked, setIsLiked] = useState(false); //點讚
  //const [isFavorite, setIsFavorite] = useState(false); //點收藏
  const { favoriteRecipes, toggleFavorite } = useFavoriteRecipes(); //  使用 hook

  //取得商品資訊
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await dataAxios.get(`/recipes/${id}`);
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
        const res = await dataAxios.get(`/recipscomments?recipeId=${id}`);
        // 為每個評論獲取用戶資訊
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
              console.log(`無法獲取用戶 ${comment.userId} 的資訊`, userError);
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
        alert("取得評論失敗");
      }
    };
    getRecipeComments();
  }, [id]);

  //取得特別酒譜推薦
  useEffect(() => {
    const getRecipeCard = async () => {
      try {
        const res = await dataAxios.get("/recipes");
        setSpecialsRecipe(res.data.slice(0, 3));
      } catch (error) {
        console.error("取得產品失敗", error);
      }
    };
    getRecipeCard();
  }, []);

  // 處理點讚
  const handleLike = async () => {
    if (!user) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "請先登入",
        background: "#f7f0e1ff",
      });
      return;
    }

    try {
      const updatedUser = { ...user };
      if (isLiked) {
        updatedUser.like_recipes = user.like_recipes.filter(
          (recipeId) => recipeId !== Number(id)
        );
      } else {
        updatedUser.like_recipes = [...user.like_recipes, Number(id)];
      }

      const updatedRecipe = {
        ...recipe,
        likes: isLiked ? recipe.likes - 1 : recipe.likes + 1,
      };

      await Promise.all([
        dataAxios.patch(`/users/${user.id}`, updatedUser),
        dataAxios.patch(`/recipes/${id}`, updatedRecipe),
      ]);

      setRecipe(updatedRecipe);
      setIsLiked(!isLiked);
      setUser(updatedUser); // 使用 setUser 而不是 updateUser
    } catch (error) {
      console.error("點讚失敗:", error);
      alert("點讚失敗");
    }
  };

  // 處理評論提交
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
        content: [newComment], // 改為陣列格式
        recipeId: parseInt(id),
        userId: user.id,
        date: new Date().toISOString().split("T")[0], // 格式化日期為 YYYY-MM-DD
      };
      await dataAxios.post("/recipscomments", commentData);
      // 重新獲取評論
      try {
        const res = await dataAxios.get(`/recipscomments?recipeId=${id}`);
        // 為每個評論獲取用戶資訊
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
              console.log(`無法獲取用戶 ${comment.userId} 的資訊`, userError);
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

      setNewComment("");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "評論成功",
        background: "#f7f0e1ff",
      });
    } catch (error) {
      console.error("發布評論失敗", error);
      alert("發布評論失敗");
    }
  };

  // 更新評論文字計數
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  //當id改變(點選下方推薦酒譜)，轉跳到這個頁面時視窗回到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  //如果沒取到產品
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <title>酒譜詳情</title>
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

          <WineCard
            key={recipe.id}
            recipe={recipe}
            onLike={handleLike}
            // onFavorite={handleFavorite}
            onFavorite={() => toggleFavorite(recipe.id)} //  用 hook 方法
            isLiked={isLiked}
            // isFavorite={isFavorite}
            isFavorite={favoriteRecipes.includes(recipe.id)} //  用 hook 狀態
          />
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
              <img
                src={user?.imagesUrl || images["Ellipse 11"]}
                alt={`${user?.nickname || "訪客"}'s avatar`}
              />
              <span className="eng-font fs-8 fs-md-7 text-primary-4 fw-bold">
                {user?.nickname || "訪客"}
              </span>
              <span className="fs-9 fs-md-9 text-neutral-3">03-16-2025</span>
            </div>
            <div className="comments-box" data-aos="fade-right">
              <textarea
                placeholder={
                  user ? "分享你調酒的經驗、喜好和看法吧！" : "請登入後發表評論"
                }
                maxLength="500"
                value={newComment}
                onChange={handleCommentChange}
                disabled={!user}
              ></textarea>
              <div className="comments-box-footer">
                <span className="comments-box-char-count">
                  {newComment.length}/500
                </span>
                <button
                  className="comments-box-submit-btn"
                  onClick={handleSubmitComment}
                  disabled={!user}
                >
                  <span className="material-symbols-outlined">send</span>
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
                      className="rounded-circle"
                      src={comment.userAvatar || images["Ellipse 11"]}
                      alt="User's avatar"
                    />
                    <span className="eng-font fs-8 fs-md-7 text-primary-4 fw-bold pt-1">
                      {comment.userName || ""}
                    </span>
                    <span className="wine-comments-list-date fs-9 fs-md-8 text-neutral-3">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="wine-comments-list-area">
                    <p className="fs-9 fs-md-8">{comment.content[0]}</p>
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

        <Link
          to="/recipessearch"
          className="d-block mb-6 mb-md-10"
          style={{ cursor: "pointer" }}
        >
          <div className="special-list-btn d-flex justify-content-end align-items-center">
            <p className="fs-8 fs-md-7 me-2 me-md-6">查看更多</p>
            <span className="material-symbols-outlined fs-8 fs-md-5 me-6">
              arrow_forward_ios
            </span>
          </div>
        </Link>

        {/* 酒譜卡片 */}

        <div
          className="row gx-lg-13 gy-lg-6 gy-md-10 gx-md-6 flex-md-wrap flex-nowrap overflow-x-scroll scrollBar pb-10 pb-lg-13"
          data-aos="zoom-in"
        >
          {specialsRecipe.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onFavorite={() => toggleFavorite(recipe.id)}
              isFavorite={favoriteRecipes.includes(recipe.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default WineContent;
