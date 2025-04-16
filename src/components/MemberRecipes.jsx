import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import RecipeCard from "../components/RecipeCard";

function MemberRecipes() {

  const { dataAxios } = useUser();
  const { id } = useParams();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const getFavoriteRecipes = async () => {
      try {
        const userDetail = await dataAxios.get(`/users/${id}`);
        const allRecipesRes = await dataAxios.get(`/recipes`);
        const favoriteIds = userDetail.data.favorite_recipes;

        const favorites = allRecipesRes.data.filter(recipe =>
          favoriteIds.includes(recipe.id)
        );

        setFavoriteRecipes(favorites);
      } catch (error) {
        console.error("取得收藏酒譜失敗", error);
      }
    };

    getFavoriteRecipes();
  }, []);



  return (
    <>
      <div className="col-lg-9">
        <h2 className=" text-primary-1 fs-9 fs-md-8 fs-lg-6 mb-8 mb-lg-10">所有收藏酒譜</h2>
        <div
          className="row gx-lg-6 gy-lg-6 gy-md-3 gx-md-6 flex-md-wrap flex-nowrap overflow-x-scroll scrollBar pb-10 pb-lg-13"
          data-aos="zoom-in"
        >
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>


      </div>

    </>

  )
}

export default MemberRecipes;