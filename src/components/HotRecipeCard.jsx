import React from "react";
import { Link } from "react-router-dom";

const HotRecipeCard = ({ recipe }) => {


    return (<div className="swiper-slide">
        <div className="wine-card p-6 p-lg-12">
            <div className="decoration pb-5 mb-6">
                <div className="wrap"></div>
            </div>

            <div className="wine-card-body d-flex flex-column flex-lg-row justify-content-lg-between gap-3 gap-lg-11">
                <div className="txt d-flex flex-column text-primary-4">
                    <div className="wine-name">
                        <h3 className="fs-6 fs-lg-4 mb-1 mb-lg-3 eng-font">
                            {recipe.title_en}
                        </h3>
                        <h4 className="fs-7 fs-lg-5">{recipe.title}</h4>
                    </div>
                    <div className="wine-tags d-flex mt-6 mt-lg-13 mb-6 gap-4">
                        {/* {recipe?.tags?.map((tag, index) => (
                            <span key={index} className="d-block px-2 px-lg-4 py-1 py-lg-2 bg-primary-3 rounded-pill text-white">{tag}</span>
                        ))} */}
                        {recipe.tags.map((tag, index) => (
                            <span key={index} className="d-block px-2 px-lg-4 py-1 py-lg-2 bg-primary-3 rounded-pill text-white" >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="wine-intro">
                        {recipe.content}
                    </div>
                </div>
                <div className="pic position-relative">
                    <img
                        src={recipe?.imagesUrl?.[0] || "https://via.placeholder.com/300"}
                        // src={recipe.imagesUrl[0]}
                        alt={recipe.title}
                    />
                    <div className="arrow position-absolute bottom-0 end-0">
                        <Link
                            to="./wine-content.html"
                            className="d-flex align-items-center justify-content-center text-white rounded-circle"
                        >
                            <span className="material-symbols-outlined d-block">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>)

}

export default HotRecipeCard;