
import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

function MemberComments() {
  const { user, dataAxios } = useUser();
  const [userComments, setUserComments] = useState([]);//會員評論資料
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");//預設頁面為全部評論
  const { setCommentCount } = useOutletContext();

  //下拉選單選項
  const options = [
    { label: "全部", value: "all" },
    { label: "酒譜", value: "recipe" },
    { label: "酒吧", value: "bar" },
  ];

  //因酒譜路由為wine/id，評論中的targetId則是recipe，需做對應處理
  const routeMap = {
    recipe: "wine",  // 將 recipe 對應到 wine
    bar: "bar"       // bar 保持不變
  };

  //取得會員評論資料
  useEffect(() => {
    const getUserComments = async () => {
      try {
        const allCommentsRes = await dataAxios.get(`/userComments`)
        const userComments = allCommentsRes.data.filter((comment) =>
          user?.id === comment.userId)
        setUserComments(userComments);
        setCommentCount(userComments.length); // 即時更新評論筆數
      } catch (error) {
        console.error("取得會員評論失敗", error);
      }
    }
    getUserComments();
  }, [])

  //下拉選單功能

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  //下拉選單篩選
  useEffect(() => {
    const filterComments = async () => {
      try {
        const allCommentsRes = await dataAxios.get(`/userComments`)
        const filteredComments = allCommentsRes.data.filter(
          (comment) =>
            comment.userId === user.id &&
            (selectedOption === "all" || comment.targetType === selectedOption)
        );

        setUserComments(filteredComments);
      } catch (error) {
        console.error("篩選評論失敗", error);
      }
    };
    filterComments();
  }, [selectedOption, user, dataAxios]);

  //刪除按鈕
  const handleDeleteComment = (commentId) => {
    Swal.fire({
      title: "確定要刪除這筆評論嗎？",
      text: "刪除後將無法復原",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "是，刪除",
      cancelButtonText: "取消",
      width: "260px",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        htmlContainer: "custom-swal-text",
        confirmButton: "custom-swal-confirm",
        cancelButton: "custom-swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedComments = userComments.filter(
          (comment) => comment.id !== commentId
        );

        setUserComments(updatedComments);         // 重新渲染畫面
        setCommentCount(updatedComments.length);  // 同步更新nav數字

        Swal.fire({
          title: "已刪除！",
          text: "這筆評論已從畫面移除。",
          icon: "success",
          width: "260px",
          //timer: 1500,
          showConfirmButton: true,
          confirmButtonText: "OK",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            htmlContainer: "custom-swal-text",
            confirmButton: "custom-swal-success-btn",
          },
        })
      }
    });
  };

  return (
    <>
      <div className="col-lg-9">
        <div className="d-flex justify-content-between">
          <h2 className=" text-primary-1 fs-9 fs-md-8 fs-lg-6">所有評論紀錄</h2>

          {/* {下拉選單功能} */}
          <div className="custom-select-wrapper">
            <div className={`custom-select-selected fs-9 fs-md-8 fs-lg-6 ${isDropdownOpen ? "open" : ""}`} onClick={toggleDropdown}>
              {options.find(opt => opt.value === selectedOption)?.label}

            </div>
            {isDropdownOpen && (
              <ul className="custom-select-options">
                {options.map((opt, idx) => (
                  <li
                    className="text-primary-1 fs-9 fs-md-8 fs-lg-7"
                    key={idx}
                    onClick={() => {
                      setSelectedOption(opt.value);
                      setIsDropdownOpen(false); // 點選後關閉選單
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <ul className="comment-list my-lg-10 my-5 d-flex flex-column gap-4 gap-lg-8">
          {/* 評論資料 */}

          {userComments.map(comment => (
            <li
              key={comment.id}
              className="comment-card p-7">
              <p className="text-primary-1 fs-9 fs-md-8 fs-lg-7 mb-md-3 px-5 px-md-0">{comment.createdAt}</p>
              <div className="comment-card-body d-flex">
                <div className="comment-card-content">
                  <div className="comment-img">
                    <img src={comment.targetImage} alt="商品圖片" />
                  </div>
                  <div>
                    <h3 className="text-primary-3 fs-8 fs-md-7 fs-lg-6 mb-3">{comment.targetName}</h3>
                    <p className="text-primary-1 fs-9 fs-lg-8">{comment.comment}</p>
                  </div>
                </div>

                <div className=" comment-card-btn-section ">
                  <Link
                    to={`/${routeMap[comment.targetType]}/${comment.targetId}`}
                    className="comment-card-btn btn btn-primary-3 text-primary-1 fs-9 fs-lg-8 fw-bold"
                  >
                    查看
                  </Link>

                  <button onClick={() => handleDeleteComment(comment.id)}
                    className="comment-card-btn btn btn-primary-1 fs-9 fs-lg-8 fw-bold">刪除</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MemberComments;