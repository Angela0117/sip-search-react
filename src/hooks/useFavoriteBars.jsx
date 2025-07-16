import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import Swal from 'sweetalert2'


const useFavoriteBars = () => {
  const { user, setUser, dataAxios } = useUser(); // 取得登入使用者
  const [favoriteBars, setFavoriteBars] = useState([]); // 收藏陣列

  // 當 user 資料改變時，自動更新收藏清單
  useEffect(() => {
    if (user?.favorite_bars) {
      setFavoriteBars(user.favorite_bars);
    }
  }, [user]);

  // 點收藏或取消收藏
  const toggleFavoriteBars = async (recipeId) => {
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
    const isFavorite = favoriteBars.includes(recipeId);
    const updatedFavorites = isFavorite
      ? favoriteBars.filter((id) => id !== recipeId) // 移除
      : [...favoriteBars, recipeId]; // 加入

    // 寫入後端
    await dataAxios.patch(`/users/${user.id}`, {
      favorite_recipes: updatedFavorites,
    });

    // 更新 hook 裡的收藏狀態
    setFavoriteBars(updatedFavorites);

    // 同步更新全域 user 狀態（context 裡的 user）
    setUser({ ...user, favorite_bars: updatedFavorites });
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
      title: isFavorite ? "已取消收藏" : "加入成功，可至收藏酒吧查看",
      background: "#f7f0e1ff",
    });
  };

  return {
    favoriteBars,     // 收藏清單
    toggleFavoriteBars,      // 切換收藏
  };
};

export default useFavoriteBars;