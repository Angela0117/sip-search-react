import React from "react";
import { Link } from "react-router-dom";

const HotBarCard = ({ bar }) => {

    return (<div className="swiper-slide position-relative">
        <img
            src={bar.imagesUrl[0]}
            alt={bar.name}
            className="bar-pic"
        />

        <div className="content d-flex position-absolute top-0 bottom-0 w-100 flex-column flex-lg-row">
            <div className="main-content d-flex flex-column justify-content-between flex-grow-1">
                <h2 className="title fs-6 fs-lg-5">{bar.name}</h2>

                <div className="txt mt-auto d-flex flex-column">
                    <div className="tag rounded-pill mb-4 mb-lg-6 d-flex align-items-center">
                        最多人按讚
                    </div>

                    <div className="txt-content d-flex flex-column flex-lg-row justify-content-lg-between">
                        <div className="introduce fs-8 fs-lg-6">
                            {bar.description}
                        </div>

                        <div className="btn-md mt-6">
                            <Link
                                to={"./barcontent.html"}
                                className="btn-search btn-index-primaryl-light d-flex justify-content-between"
                            >
                                查看更多
                                <span className="material-symbols-outlined fs-lg-6 fs-7">
                                    chevron_right
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)

}

export default HotBarCard;