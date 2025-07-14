/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, onFavorite, isFavorite }) => {
  return (
    <div className="col-lg-4 col-md-6 col-9 overflow-hidden">
      <div data-aos="fade-up" className="card-container">
        <div className="card position-relative">
          <div className="card-content mt-6 mt-md-9 mt-lg-0">

            <div className="cross-card-header">
              <div className="cross-container">
                <div className="cross-1">
                  <div className="cross-line horizontal"></div>
                  <div className="cross-line vertical"></div>
                </div>
                <div className="cross-2">
                  <div className="cross-line horizontal"></div>
                  <div className="cross-line vertical"></div>
                </div>
              </div>
              {/* <span className="material-symbols-outlined text-primary-3 fs-8 fs-lg-6" >
                favorite
              </span> */}
              <button
                className={`material-symbols-outlined text-primary-3 fs-8 fs-lg-6 btn-no-bg ${isFavorite ? "active" : ""
                  }`}
                onClick={onFavorite}
              >
                <span
                  className="material-symbols-outlined text-primary-3"
                  style={{
                    fontFamily: "Material Symbols Outlined",
                    fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  favorite
                </span>
              </button>
            </div>


            <div className="card-body text-center">
              <h6 className="card-title text-primary-4 mb-lg-3 fw-bold">
                {recipe.title}
              </h6>
              <img
                src={recipe.imagesUrl[0]}
                className="card-img-bottom cardImg"
                alt={recipe.title}
              />
              <div className="">
                <Link
                  to={`/wine/${recipe.id}`}
                  className="cardBtn btn btn-primary-4 rounded-circle"
                >
                  <span className="material-symbols-outlined align-baseline">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card-hover">
          <div className="card-hover-content ">
            <div className="cross-card-header">
              <div className="cross-container">
                <div className="cross-1">
                  <div className="cross-line horizontal"></div>
                  <div className="cross-line vertical"></div>
                </div>
                <div className="cross-2">
                  <div className="cross-line horizontal"></div>
                  <div className="cross-line vertical"></div>
                </div>
              </div>
              {/* <span className="material-symbols-outlined text-primary-3 fs-8 fs-lg-6" >
                favorite
              </span> */}
              <button
                className={`material-symbols-outlined text-primary-3 fs-8 fs-lg-6 btn-no-bg ${isFavorite ? "active" : ""
                  }`}
                onClick={onFavorite}
              >
                {/* <span
                  className="material-symbols-outlined text-primary-3"
                  style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
                > */}
                <span
                  className="material-symbols-outlined text-primary-3"
                  style={{
                    fontFamily: "Material Symbols Outlined",
                    fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  favorite
                </span>
              </button>
            </div>

            <div className="card-body m-lg-6 m-4 pt-lg-3">
              <h4 className="text-primary-4 fs-6 eng-font ">
                {recipe.title_en}
              </h4>
              <h6 className="text-primary-4 mt-lg-1 fs-lg-7 fs-8 ">
                {recipe.title}
              </h6>
              <div className="col my-2">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  {recipe.tags.map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      className="btn active btn-outline-primary-3 rounded-pill text-primary-1 fs-10 me-lg-4"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <p className="fs-lg-9 fs-10">{recipe.content}</p>
              <div className="d-flex justify-content-between">
                <img
                  className="cardImg-hover card-hoverImg mb-lg-3"
                  src={recipe.imagesUrl[1]}
                  alt={recipe.title}
                />
                <Link
                  to={`/wine/${recipe.id}`}
                  className="cardBtn cardBtn-primary-4 rounded-circle eng-font"
                >
                  <span className="material-symbols-outlined align-middle">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
