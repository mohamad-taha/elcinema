import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import GenreSelect from "../Filters/GenresSelect";
import Pagination from "../Pagination/ItemsPagination";
import YearSelect from "../Filters/YearSelect";
import { useTranslation } from "react-i18next";

const TrendingCards = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [itemsPagination, setItemsPagination] = useState(1);
  const [filter, setFilter] = useState({ genre: "", date: "" });
  const [genre, setGenre] = useState([]);

  const currentDate = new Date().toISOString().split("T")[0];

  const filteredData = items?.filter((item) => {
    const genreMatch =
      filter.genre === "" || item.genre_ids.includes(filter.genre);
    const voteMatch = item.vote_count > 100;
    const dateMatch =
      filter.date === ""
        ? item.first_air_date || item.release_date < currentDate
        : item.first_air_date || item.release_date < `${filter.date}-01-01`;

    return genreMatch && voteMatch && dateMatch;
  });

  useEffect(() => {
    setFilter({ genre: "", date: "" });
  }, [window.location.pathname]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
      },
    };
    const getData = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          `https://api.themoviedb.org/3/trending/${
            type === "tv" ? "tv" : "movie"
          }/day?language=${i18n.language}&page=${itemsPagination}`,
          options
        );
        const data = await resp.json();
        setItems(data.results);
        setTotalPages(data.total_pages);
        navigate(`/trending/${type}?page=${itemsPagination}`);
        if (!resp.ok) {
          setErr({ stat: true, msg: resp.statusText });
        }
      } catch {
        setErr({
          stat: true,
          msg: t("err_msg"),
        });
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [itemsPagination, type, filter.genre, filter.date, i18n.language]);

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
      <Cards items={filteredData} loading={loading} err={err} />
      <Pagination pages={totalPages} setItemsPagination={setItemsPagination} />
    </div>
  );
};

export default TrendingCards;
