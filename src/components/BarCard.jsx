/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const BarCard = ({ bar, onFavorite, isFavorite }) => {
  return (
    <>
      <div className="col bar-card">
        <div>
          <img src={bar.imagesUrl[0]} alt={bar.name} />
          <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center">
              <span className="card-title fs-lg-7 text-neutral-1">
                {bar.name}
              </span>
              {/* <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
                  favorite
                </span> */}
              <button
                className={`material-symbols-outlined text-primary-1 fs-8 fs-lg-6 btn-no-bg ${isFavorite ? "active" : ""
                  }`}
                onClick={onFavorite}
              >
                <span
                  className="material-symbols-outlined text-primary-1"
                  style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
              </button>
            </div>
            <div>
              <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
                {bar.description}
              </p>
              <button
                type="button"
                className="btn cardBtn-primary-4 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
              >
                {bar.region}
              </button>
              <button
                type="button"
                className="btn cardBtn-primary-4 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
              >
                {bar.type}
              </button>
              <div className="">
                <Link
                  to={`/bar/${bar.id}`}
                  className="cardBtn btn cardBtn-primary-3 rounded-circle"
                >
                  <span className="material-symbols-outlined align-baseline ">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default BarCard;
