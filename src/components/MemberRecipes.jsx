import React, { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import RecipeCard from "../components/RecipeCard";
import useFavoriteRecipes from "../hooks/useFavoriteRecipes"; // 引入 hook

function MemberRecipes() {

  const { user, dataAxios } = useUser();
  //const { id } = useParams();
  const [userFavoriteRecipes, setUserFavoriteRecipes] = useState([]);//會員收藏酒譜資料
  const { favoriteRecipes, toggleFavorite } = useFavoriteRecipes(); // ✅ 使用 hook

  useEffect(() => {
    const getFavoriteRecipes = async () => {
      try {
        //const userDetail = await dataAxios.get(`/users/${id}`);
        const allRecipesRes = await dataAxios.get(`/recipes`);
        //const favoriteIds = userDetail.data.favorite_recipes;

        // const favorites = allRecipesRes.data.filter(recipe =>
        //   favoriteIds.includes(recipe.id)
        // );

        const favorites = allRecipesRes.data.filter(recipe =>
          user?.favorite_recipes?.includes(recipe.id)
        );

        setUserFavoriteRecipes(favorites);
      } catch (error) {
        console.error("取得收藏酒譜失敗", error);
      }
    };

    if (user?.favorite_recipes) {
      getFavoriteRecipes();
    }
  }, [user.favorite_recipes]);



  return (
    <>
      <div className="col-lg-9">
        <h2 className=" text-primary-1 fs-9 fs-md-8 fs-lg-6 mb-8 mb-lg-10">所有收藏酒譜</h2>
        <div
          className="row gx-lg-6 gy-lg-6 gy-md-3 gx-md-6 flex-md-wrap flex-nowrap overflow-x-scroll scrollBar pb-10 pb-lg-13"
          data-aos="zoom-in"
        >
          {userFavoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onFavorite={() => toggleFavorite(recipe.id)} //  用 hook 方法
              isFavorite={favoriteRecipes.includes(recipe.id)} //  用 hook 狀態
            />
          ))}
        </div>


      </div>

    </>

  )
}

export default MemberRecipes;