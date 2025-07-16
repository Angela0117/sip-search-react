// 收藏酒譜的自定義hook，可套用在多個頁面

import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import Swal from 'sweetalert2'

const useFavoriteRecipes = () => {
  const { user, setUser, dataAxios } = useUser(); // 取得登入使用者
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); // 收藏陣列

  // 當 user 資料改變時，自動更新收藏清單
  useEffect(() => {
    if (user?.favorite_recipes) {
      setFavoriteRecipes(user.favorite_recipes);
    }
  }, [user]);

  // 點收藏或取消收藏
  const toggleFavorite = async (recipeId) => {
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
    const isFavorite = favoriteRecipes.includes(recipeId);
    const updatedFavorites = isFavorite
      ? favoriteRecipes.filter((id) => id !== recipeId) // 移除
      : [...favoriteRecipes, recipeId]; // 加入

    // 寫入後端
    await dataAxios.patch(`/users/${user.id}`, {
      favorite_recipes: updatedFavorites,
    });

    // 更新 hook 裡的收藏狀態
    setFavoriteRecipes(updatedFavorites);

    // 同步更新全域 user 狀態（context 裡的 user）
    setUser({ ...user, favorite_recipes: updatedFavorites });
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
      icon: isFavorite ? "error" : "success",
      title: isFavorite ? "已取消收藏" : "加入成功，可至收藏酒譜查看",
      background: "#f7f0e1ff",
    });
  };

  return {
    favoriteRecipes,     // 收藏清單
    toggleFavorite,      // 切換收藏
  };
};

export default useFavoriteRecipes;
