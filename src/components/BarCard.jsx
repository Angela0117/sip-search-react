import React from "react";
import { Link } from "react-router-dom";

const BarCard = ({bar}) => {
  return (
    <>
      <div className="col bar-card">
        <img src={bar.imagesUrl[0]} alt={bar.name} />
        <div className="card-body p-lg-9 py-5 px-3 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center">
            <a className="card-title fs-lg-7 text-neutral-1" >
              {bar.name}
            </a>
            <span className="material-symbols-outlined text-neutral-1 fs-8 fs-lg-6">
              favorite
            </span>
          </div>
          <div>
            <p className="card-text text-neutral-1 pb-lg-3 fs-10 fs-md-8">
             {bar.description}
            </p>
            <button
              type="button"
              className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
            >
              {bar.region}
            </button>
            <button
              type="button"
              className="btn card-btn-primary-1 rounded-pill me-lg-6 fs-lg-8 fs-10 py-lg-2 px-lg-4 me-1 text-nowrap"
            >
              {bar.type}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarCard;
