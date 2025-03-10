import React from "react";
import { useNavigate } from "react-router-dom";


const WineCard = ({recipe}) => {
        //用navigate導回去recipessearch
        const navigate = useNavigate();

        const handleTagClick = (tag) => {
          // 移除 modal backdrop (如果有的話)
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
              backdrop.remove();
          }
          
          // 移除 body 上的 modal 相關 class
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
          
          // 導航到搜索頁面
          navigate(`/recipesSearch?tag=${tag}`);
      };
    return(<>
     <div
            className="wine-content-title text-primary-1 text-center"
            data-aos="fade-down"
          >
            <h1 className="fs-6 fs-md-5 fs-lg-3 " data-aos="zoom-in-up">
              <span className="me-6">{recipe.title}</span>
              <span className="eng-font">{recipe.title_en}</span>
            </h1>
          </div>

          <div className="wine-content-methods d-flex pb-lg-10">
            <div
              className="methods-item-1 ms-lg-11"
              data-aos="flip-right"
              data-aos-duration="1000"
            >
              <img
                className="methods-item-1-img"
                src={recipe.imagesUrl[0]}
                alt={recipe.title}
              />

              <ul className="methods-icon fs-9 fs-md-8 bg-primary-3 text-neutral-1 d-flex">
                <li className="methods-icon-item d-flex">
                  <a
                    className="material-symbols-outlined methods-icon-btn"
                    href="#"
                  >
                    thumb_up
                  </a>
                  <p>{recipe.likes}</p>
                </li>

                <li className="methods-icon-item d-flex">
                  <a
                    className="material-symbols-outlined methods-icon-btn"
                    href="#"
                  >
                    favorite
                  </a>
                  <p>{recipe.favorite}</p>
                </li>

                <li className="methods-icon-item d-flex">
                  <a
                    className="material-symbols-outlined methods-icon-btn"
                    href="#"
                  >
                    share
                  </a>
                  <p>分享</p>
                </li>
              </ul>
            </div>

            <div
              className="methods-item-2 me-lg-11"
              data-aos="fade-up-left"
              data-aos-duration="1000"
            >
              <div className="methods-item-2-text">
                <div className="methods-tags fs-10 fs-md-8 text-primary-3 d-flex mt-md-10">
                  {recipe.tags?.map((tag, index) => (
                    <a key={index}  className="btn-tags" onClick={() => handleTagClick(tag)}>
                      {tag}
                    </a>
                  ))}
                </div>
                <p className="fs-9 fs-md-8 text-neutral-1 mt-2 mt-md-10">
                  {recipe.content}
                </p>
              </div>

              <div className="methods-item-2-step text-neutral-1 mt-6 mt-md-11">
                <div className="methods-item-2-step-title px-8 px-md-11 py-2 py-md-4">
                  <h5 className="fs-8 fs-md-6">調酒作法</h5>
                </div>
                <ul className="methods-item-2-step-content fs-9 fs-md-8 ps-12 pe-10 pt-5 pb-5">
                  <li>
                    <p>
                      材料比例：
                      <br />
                      {recipe.ingredients.map((ingredient, index) => (
                        <span key={index}>
                          {ingredient.ingredient}{" "}
                          <span className="eng-font">{ingredient.amount}</span>
                          {index < recipe.ingredients.length - 1 ? "、" : ""}
                        </span>
                      ))}
                    </p>
                  </li>
                  <li>
                    <p>
                      步驟：
                      <br />
                      {recipe.instructions.map((instruction, index) => (
                        <span key={index}>
                          {instruction}
                          {index < recipe.instructions.length - 1 ? "、" : ""}
                        </span>
                      ))}
                    </p>
                  </li>
                  <li>
                    <p>
                      裝飾：
                      <br />
                      {recipe.garnish.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index < recipe.garnish.length - 1 ? "、" : ""}
                        </span>
                      ))}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div></>)
}

export default WineCard;