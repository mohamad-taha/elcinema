import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import logo from "../../assets/imgs/logo.svg";
import "./Card.css";

const Card = ({ loading, items, err, type }) => {
  const navigate = useNavigate();

  return (
    <div className="cardsContainer mt">
      {loading && <Loading />}
      {!loading &&
        items?.map((item) => (
          <div
            role="button"
            key={item?.id}
            className="card"
            onClick={() =>
              navigate(
                `/${type || item?.media_type}/${item.name || item.title}/${
                  item.id
                }`
              )
            }
          >
            <div className="first-content">
              {item && item?.backdrop_path ? (
                <img
                  alt={item?.title || item?.name}
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
              ) : (
                <img
                  style={{ padding: "0 20px", objectFit: "contain" }}
                  src={logo}
                  alt="poster img"
                />
              )}
            </div>
            <div className="second-content">
              <span className="rate">
                <FaStar fill="#f3951e" />
                {item?.vote_average?.toFixed(1)}
              </span>
              <span className="releaseDate">
                {item?.first_air_date || item?.release_date}
              </span>
              <span className="itemTitle">{item?.name || item?.title}</span>
            </div>
          </div>
        ))}
      {!loading && !err?.stat && !items.length > 0 ? (
        <span style={{ textAlign: "center", width: "100%" }}>
          No Data Found!
        </span>
      ) : (
        ""
      )}
      {err?.stat && !items.length > 0 && (
        <span style={{ textAlign: "center", width: "100%" }}>{err.msg}</span>
      )}
    </div>
  );
};

export default Card;
