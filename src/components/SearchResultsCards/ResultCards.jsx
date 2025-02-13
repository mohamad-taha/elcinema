import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cards from "../Cards/Card";
import PaginationCards from "../Pagination/ItemsPagination";
import { SearchContext } from "../../context/SearchContext";
import { useTranslation } from "react-i18next";

const ResultCards = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { filter } = useContext(SearchContext);
  const [itemsPagination, setItemsPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState({ stat: false, msg: "" });

  const currentDate = new Date().toISOString().split("T")[0];

  const filteredData = results.filter((result) => {
    const typeMatch =
      filter.type === ""
        ? ["tv", "movie"].includes(result.media_type)
        : result.media_type === filter.type;

    const genreMatch =
      filter.genre === "" || result.genre_ids.includes(filter.genre);

    const voteCountMatch = result.vote_count > 5;

    const voteAverageMatch =
      filter.rate === ""
        ? result.vote_average < 10
        : result.vote_average < filter.rate;

    const dateMatch =
      filter.date === ""
        ? result.first_air_date || result.release_date < currentDate
        : result.first_air_date || result.release_date < `${filter.date}-1-1`;

    return (
      typeMatch && genreMatch && voteCountMatch && voteAverageMatch && dateMatch
    );
  });

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
      },
    };
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          ` https://api.themoviedb.org/3/search/multi?&query=${query}&page=${itemsPagination}`,
          options
        );
        const data = await response.json();
        navigate(`/search?query=${query}&page=${itemsPagination}`);
        setResults(data.results);
        setTotalPages(data.total_pages);

        if (!response.ok) {
          setErr(() => ({
            err: true,
            msg: response.statusText,
          }));
        }
      } catch {
        setErr(() => ({
          stat: true,
          msg: t("err_msg"),
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [
    query,
    itemsPagination,
    filter.type,
    filter.genre,
    filter.rate,
    filter.date,
    i18n.language,
  ]);
  return (
    <div>
      <Cards items={filteredData} loading={loading} err={err} />
      <PaginationCards
        pages={totalPages}
        setItemsPagination={setItemsPagination}
      />
    </div>
  );
};

export default ResultCards;
