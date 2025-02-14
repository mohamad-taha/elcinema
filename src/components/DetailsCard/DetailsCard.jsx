import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";
import ItemsDetailsCard from "./itemsDetailsCard";
import ItemsContentCard from "./ItemsContentCard";
import Cards from "../Cards/Card";
import { useTranslation } from "react-i18next";
import logo from "../../assets/imgs/logo.svg";
import "./DetailsCard.css";

const DetailsCard = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { type, id } = useParams();
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [cardDetails, setCardDetails] = useState({});
  const [collection, setCollection] = useState(null);
  const [media_type, setMediaType] = useState("");
  const [serieCollection, setSerieCollection] = useState(null);

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
    },
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const resp = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?language=${i18n.language}`,
          options
        );

        const data = await resp.json();

        setCardDetails(data);

        if (data?.belongs_to_collection) {
          getCollection(data?.belongs_to_collection?.id);
        }
        if (data?.seasons) {
          setSerieCollection(data?.seasons);
        }

        if (!resp.ok) {
          setErr(() => ({
            err: true,
            msg: resp.statusText,
          }));
        }
      } catch (error) {
        setErr(() => ({
          stat: true,
          msg:
            error.message === "Failed to fetch" ? t("err_msg") : error.message,
        }));
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, i18n.language]);

  const getCollection = async (id) => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/collection/${id}`,
        options
      );
      const data = await resp.json();
      setCollection(data.parts);
      setMediaType(data.parts[0].media_type);

      if (!resp.ok) {
        setErr(() => ({
          err: true,
          msg: resp.statusText,
        }));
      }
    } catch (error) {
      setErr(() => ({
        stat: true,
        msg: error.message === "Failed to fetch" ? t("err_msg") : error.message,
      }));
    }
  };

  return (
    <div className="detailsCardContainer">
      {loading && <Loading />}
      {!loading && (
        <div className="detailsCard">
          <div className="cardPoster">
            <img
              style={{
                boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.705)",
                borderRadius: "8px",
                objectFit: "cover",
              }}
              width={230}
              height={300}
              src={
                cardDetails?.backdrop_path !== null
                  ? `https://image.tmdb.org/t/p/w500${cardDetails?.poster_path}`
                  : logo
              }
              alt={cardDetails?.title || cardDetails?.name}
            />
            <span className="floatingRate">
              <FaStar fill="#f3951e" /> {cardDetails?.vote_average?.toFixed(1)}
            </span>
          </div>
          <div className="cardContent">
            <ItemsContentCard cardDetails={cardDetails} />
            <ItemsDetailsCard cardDetails={cardDetails} />
          </div>
        </div>
      )}

      {collection && <Cards items={collection} err={err} type={media_type} />}

      <div className="mt collectionCards">
        {serieCollection?.map((serie) => (
          <div key={serie.id} style={{ position: "relative" }}>
            <img
              src={
                serie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                  : logo
              }
              alt="poster img"
            />
            <span className="floatingRate">
              <FaStar fill="#f3951e" />
              {serie?.vote_average}
            </span>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              {serie?.name}
            </p>
          </div>
        ))}
      </div>
      {err.stat && 0 && <span>{err.msg}</span>}
    </div>
  );
};

export default DetailsCard;
