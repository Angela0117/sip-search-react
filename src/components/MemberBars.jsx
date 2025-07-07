import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import BarCard from "../components/BarCard";

function MemberBars() {
  const { dataAxios } = useUser(); // 添加 useUser hook
  const [favoriteBars, setFavoriteBars] = useState([]);





  useEffect(() => {
    getFavoriteBars();
  }, []);

  // 取得所有酒吧
  const getFavoriteBars = async () => {
    try {
      const res = await dataAxios.get(`/bars`); // 取得所有資料
      console.log("取得所有產品成功", res.data);
      setFavoriteBars(res.data);
    } catch (error) {
      console.error("取得產品失敗", error);
      alert("取得產品失敗");
    }
  };
  return (
    <>
      <div className="col-lg-9">
        <h2 className=" text-primary-1 fs-9 fs-md-8 fs-lg-6 mb-8 mb-lg-10">所有收藏酒吧</h2>
        <div className="row gx-lg-6 gy-lg-6 gy-md-3 gx-md-6 flex-md-wrap flex-nowrap overflow-x-scroll scrollBar pb-10 pb-lg-13"
          data-aos="zoom-in">
          {favoriteBars && favoriteBars.length > 0 ? (
            favoriteBars.map((bar) => <BarCard key={bar.id} bar={bar} />)
          ) : (
            <p>沒有找到產品</p>
          )}
        </div>
      </div>



    </>
  );
}

export default MemberBars;