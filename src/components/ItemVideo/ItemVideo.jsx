import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useTranslation } from "react-i18next";
import "./ItemVideo.css";

const ItemVideo = () => {
  const { t, i18n } = useTranslation();
  const { id, type, name } = useParams();
  const [trailerId, setTrailerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({ stat: false, msg: "" });

  useEffect(() => {
    const getVideo = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
          },
        };

        const resp = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
          options
        );

        const data = await resp?.json();

        const trailer = data?.results?.find(
          (video) => video?.type === "Trailer" && video?.site === "YouTube"
        );

        setTrailerId(trailer?.key);

        if (!response.ok) {
          setErr(() => ({
            err: true,
            msg: response.statusText,
          }));
        }
      } catch (error) {
        setErr(() => ({
          stat: true,
          msg: t("err_msg"),
        }));
      }
      setLoading(false);
    };
    getVideo();
  }, [id, i18n.language]);
  return (
    <div className="mt">
      {loading && <Loading />}
      {trailerId && !loading && (
        <div className="trailerContainer">
          <h1>{t("trailer")}</h1>
          <iframe
            title={name + "trailer"}
            id="trailerFrame"
            src={`https://www.youtube.com/embed/${trailerId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          ></iframe>
        </div>
      )}
      {err.stat ?? <span>{err.msg}</span>}
    </div>
  );
};

export default ItemVideo;
