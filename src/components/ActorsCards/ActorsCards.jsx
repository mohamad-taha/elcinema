import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useTranslation } from "react-i18next";
import "./ActorsCards.css";

const ActorsCards = () => {
  const { t, i18n } = useTranslation();
  const { id, type } = useParams();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const filteredActors = actors?.filter(
    (actor) => actor?.profile_path !== null && actor?.popularity > 10
  );

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
      },
    };
    const getActors = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/credits?language=${i18n.language}`,
          options
        );
        const data = await resp.json();
        setActors(data?.cast);
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
    getActors();
  }, [id, i18n.language]);
  return (
    <div className={filteredActors?.length > 0 ? "mt" : ""}>
      {loading && <Loading />}
      {filteredActors?.length > 0 && (
        <h1 style={{ fontSize: "38px" }}>Actors</h1>
      )}
      <div className="actorsContainer">
        {!loading &&
          filteredActors?.map((actor, id) => (
            <div key={id} className="actorsCard">
              <img
                width={80}
                height={80}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor?.profile_path}`
                    : "/logo.svg"
                }
                alt="actor image"
              />
              <p>{actor.name}</p>
            </div>
          ))}
      </div>
      {err.stat && <span>{err.msg}</span>}
    </div>
  );
};

export default ActorsCards;
