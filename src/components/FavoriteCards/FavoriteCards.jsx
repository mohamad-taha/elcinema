import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import PaginationCards from "../Pagination/ItemsPagination";
import { useTranslation } from "react-i18next";

const FavoriteCards = () => {
  const [reload, setReload] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const id = JSON.parse(localStorage.getItem("user"))?.id;
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [itemsPagination, setItemsPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { type } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
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
          `https://api.themoviedb.org/3/account/${id}/favorite/${type}?language=en-US&page=${itemsPagination}&sort_by=created_at.asc`,
          options
        );

        const data = await resp.json();

        setFavoriteItems(data.results);
        setTotalPages(data?.total_pages || 1);
        if (!resp.ok) {
          setErr({
            stat: true,
            msg: resp.statusText,
          });
        }
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
    getData();
  }, [itemsPagination, location.pathname, reload]);

  return (
    <div style={{ marginTop: "200px" }}>
      <Cards
        items={favoriteItems}
        loading={loading}
        err={err}
        type={type}
        reload={reload}
        setReload={setReload}
      />
      <PaginationCards
        pages={totalPages}
        setItemsPagination={setItemsPagination}
      />
    </div>
  );
};

export default FavoriteCards;
