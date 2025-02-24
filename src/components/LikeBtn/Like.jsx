import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

const Like = ({ id, mediaType, media_type, userId, reload, setReload }) => {
  const [favoriteItems, setFavoriteItems] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const currentMediaType = media_type || mediaType;
        const apiType = currentMediaType === "movie" ? "movies" : "tv";

        const response = await fetch(
          `https://api.themoviedb.org/3/account/${userId}/favorite/${apiType}?language=en-US&page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
            },
          }
        );
        const result = await response.json();
        if (result.results) {
          const isFav = result.results.some((item) => item.id === id);
          setFavoriteItems(isFav);
        }
      } catch (error) {
        console.error("خطأ أثناء جلب بيانات المفضلة:", error);
      }
    };

    checkFavoriteStatus();
  }, [id, media_type, mediaType, userId]);

  const like = async (e) => {
    e.stopPropagation();
    const newFavoriteStatus = !favoriteItems;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${userId}/favorite?session_id=${localStorage.getItem(
          "session_id"
        )}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
          },
          body: JSON.stringify({
            media_type: media_type || mediaType,
            media_id: id,
            favorite: newFavoriteStatus,
          }),
        }
      );

      if (response.ok) {
        setFavoriteItems(newFavoriteStatus);
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <button onClick={like} className="likeBtn">
      <MdFavorite
        fontSize={40}
        style={{
          fill: favoriteItems ? "var(--primary-color)" : "white",
          transition: "fill 0.3s ease-in-out",
        }}
      />
    </button>
  );
};

export default Like;
