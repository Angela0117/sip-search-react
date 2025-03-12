import React from "react";
import { Link } from "react-router-dom";


const BarContentCard = ({bar}) => {
  return (
    <>
       <div
            className="similar-bars-item"
            data-aos="flip-left"
            data-aos-duration="1200"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),url(${bar.imagesUrl[0]})`
            }}
          >
            <div className="txt">
              <h3 className="bar-name fs-7 fs-lg-6">{bar.name}</h3>
              <p className="bar-intro">
              {bar.description}
              </p>
              <div className="tags">
                <span className="tag">{bar.region}</span>
                <span className="tag">{bar.type}</span>
              </div>
              <Link to={`/bar/${bar.id}`} className="button">立即前往</Link>
            </div>
          </div>
    </>
  );
};

export default BarContentCard;