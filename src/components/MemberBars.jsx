import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import BarCard from "../components/BarCard";
import useFavoriteBars from "../hooks/useFavoriteBars";

function MemberBars() {
  const { user, dataAxios } = useUser(); // 添加 useUser hook
  const [userFavoriteBars, setUserFavoriteBars] = useState([]);//會員收藏酒吧資料
  const { favoriteBars, toggleFavoriteBars } = useFavoriteBars(); // 使用收藏酒吧的hook


  // useEffect(() => {
  //   getFavoriteBars();
  // }, []);

  // // 取得所有酒吧
  // const getFavoriteBars = async () => {
  //   try {
  //     const res = await dataAxios.get(`/bars`); // 取得所有資料
  //     console.log("取得所有產品成功", res.data);
  //     setFavoriteBars(res.data);
  //   } catch (error) {
  //     console.error("取得產品失敗", error);
  //     alert("取得產品失敗");
  //   }
  // };

  useEffect(() => {
    const getFavoriteBars = async () => {
      try {
        const allBars = await dataAxios.get(`/bars`);
        const favorites = allBars.data.filter(bar =>
          user?.favorite_bars.includes(bar.id)
        );

        setUserFavoriteBars(favorites);
      } catch (error) {
        console.error("取得收藏酒吧失敗", error);
      }
    };

    if (user?.favorite_bars) {
      getFavoriteBars();
    }
  }, [user.favorite_bars]);

  return (
    <>
      <div className="col-lg-9">
        <h2 className=" text-primary-1 fs-9 fs-md-8 fs-lg-6 mb-8 mb-lg-10">所有收藏酒吧</h2>
        <div className="row gx-lg-6 gy-lg-6 gy-md-3 gx-md-6 flex-md-wrap flex-nowrap overflow-x-scroll scrollBar pb-10 pb-lg-13"
          data-aos="zoom-in">
          {favoriteBars && favoriteBars.length > 0 ? (
            userFavoriteBars.map((bar) => (
              <BarCard
                key={bar.id}
                bar={bar}
                onFavorite={() => toggleFavoriteBars(bar.id)} //  用 hook 方法
                isFavorite={favoriteBars.includes(bar.id)} //  用 hook 狀態
              />))
          ) : (
            <p>沒有找到產品</p>
          )}
        </div>
      </div>



    </>
  );
}

export default MemberBars;