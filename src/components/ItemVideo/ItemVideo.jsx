import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useTranslation } from "react-i18next";
import "./ItemVideo.css";

const ItemVideo = () => {
  const { t } = useTranslation();
  const { id, type, name } = useParams();
  const [trailerId, setTrailerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({ stat: false, msg: "" });

  useEffect(() => {
    const getVideo = async () => {
      setLoading(true);
      setErr({ stat: false, msg: "" });

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

        if (!resp.ok) {
          setErr({
            stat: true,
            msg: resp.statusText,
          });
        }

        const data = await resp.json();

        const trailer = data?.results?.find(
          (video) => video?.type === "Trailer" && video?.site === "YouTube"
        );

        if (!trailer) {
          throw new Error(t("no_trailer_found"));
        }

        setTrailerId(trailer.key);
      } catch (error) {
        setErr({
          stat: true,
          msg:
            error.message === "Failed to fetch" ? t("err_msg") : error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    getVideo();
  }, [id, type]);

  return (
    <div className="mt">
      {loading && <Loading />}

      {!loading && trailerId && (
        <div className="trailerContainer">
          <h1>{t("trailer")}</h1>
          <iframe
            title={`${name} trailer`}
            id="trailerFrame"
            src={`https://www.youtube.com/embed/${trailerId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          ></iframe>
        </div>
      )}

      {!loading && err.stat && (
        <p style={{ width: "100%", textAlign: "center" }}>{err.msg}</p>
      )}
    </div>
  );
};

export default ItemVideo;
