import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import Pagination from "../Pagination/ItemsPagination";
import GenreSelect from "../Filters/GenresSelect";
import YearSelect from "../Filters/YearSelect";
import { useTranslation } from "react-i18next";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c";

const TopRatedCards = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [itemsPagination, setItemsPagination] = useState(1);
  const [genre, setGenre] = useState([]);
  const [filter, setFilter] = useState({ genre: "", date: "" });

  const currentDate = new Date().toISOString().split("T")[0];

  const filteredData = items.filter((item) => {
    const genreMatch =
      filter.genre === "" || item.genre_ids.includes(Number(filter.genre));
    const voteMatch = item.vote_count > 100;
    const dateMatch =
      filter.date === ""
        ? item.first_air_date?.slice(0, 10) < currentDate ||
          item.release_date?.slice(0, 10) < currentDate
        : item.first_air_date?.slice(0, 4) <= filter.date ||
          item.release_date?.slice(0, 4) <= filter.date;

    return genreMatch && voteMatch && dateMatch;
  });

  const mediaType = type === "tv" ? "tv" : "movie";

  useEffect(() => {
    setFilter({ genre: "", date: "" });
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErr({ stat: false, msg: "" });

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/top_rated?language=${i18n.language}&page=${itemsPagination}`,
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
        navigate(`/premier/${type}?page=${itemsPagination}`);
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

export default TopRatedCards;
