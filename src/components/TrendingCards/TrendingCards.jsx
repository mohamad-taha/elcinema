import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import GenreSelect from "../Filters/GenresSelect";
import Pagination from "../Pagination/ItemsPagination";
import YearSelect from "../Filters/YearSelect";
import { useTranslation } from "react-i18next";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c";

const TrendingCards = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [itemsPagination, setItemsPagination] = useState(1);
  const [filter, setFilter] = useState({ genre: "", date: "" });
  const [genre, setGenre] = useState([]);

  const mediaType = type === "tv" ? "tv" : "movie";
  const currentDate = new Date().toISOString().split("T")[0];

  const filteredData = items.filter((item) => {
    const genreMatch =
      filter.genre === "" || item.genre_ids.includes(Number(filter.genre));
    const voteMatch = item.vote_count > 100;
    const dateMatch =
      filter.date === ""
        ? (item.first_air_date && item.first_air_date < currentDate) ||
          (item.release_date && item.release_date < currentDate)
        : (item.first_air_date &&
            item.first_air_date.slice(0, 4) <= filter.date) ||
          (item.release_date && item.release_date.slice(0, 4) <= filter.date);

    return genreMatch && voteMatch && dateMatch;
  });

  useEffect(() => {
    setFilter({ genre: "", date: "" });
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErr({ stat: false, msg: "" });

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/${
            type === "tv" ? "tv" : "movie"
          }/day?language=${i18n.language}&page=${itemsPagination}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: AUTH_TOKEN,
            },
          }
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setItems(data.results || []);
        setTotalPages(data.total_pages || 1);
        navigate(`/trending/${type}?page=${itemsPagination}`);
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

    fetchData();
  }, [itemsPagination, type, i18n.language]);

  return (
    <div className="mt">
      <div className="selectsContainer">
        <GenreSelect
          genre={genre}
          setGenre={setGenre}
          filter={filter}
          setFilter={setFilter}
          path={type}
        />
        <YearSelect filter={filter} setFilter={setFilter} />
      </div>
      <Cards
        items={filteredData}
        loading={loading}
        err={err}
        type={mediaType}
      />
      <Pagination pages={totalPages} setItemsPagination={setItemsPagination} />
    </div>
  );
};

export default TrendingCards;
