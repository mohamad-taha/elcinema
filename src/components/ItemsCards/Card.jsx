import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import PaginationCards from "../Pagination/ItemsPagination";

const Card = ({ filter, setFilter }) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [itemsPagination, setItemsPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const currentDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const mediaType = name === "tv" ? "tv" : "movie";

  const baseUrl = useMemo(() => {
    const url =
      name === "tv"
        ? `https://api.themoviedb.org/3/discover/tv?`
        : `https://api.themoviedb.org/3/discover/movie?`;
    return `${url}&vote_count.gte=200&${
      name === "tv" ? "first_air_date" : "primary_release_date"
    }.lte=${currentDate}&${
      name === "tv" ? "first_air_date" : "primary_release_date"
    }.gte=2000-01-01&with_original_language=${filter.lang}&${
      name === "tv" ? "first_air_date_year" : "primary_release_year"
    }=${filter.date}&with_genres=${
      filter.genre
    }&include_adult=false&include_video=false&language=en-US&page=${itemsPagination}&vote_average.lte=${
      filter.rate
    }&vote_average.gte=5&with_companies=${filter.company}&sort_by=${
      filter.sort
    }.${filter.dir}`;
  }, [filter, itemsPagination, name, currentDate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
      },
    };
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(baseUrl, options);
        const data = await response.json();

        setFilter((prev) => ({ ...prev, items: data.results }));
        setTotalPages(data.total_pages);
        navigate(`/category/${name}?page=${itemsPagination}`);
        if (!response.ok) {
          setErr(() => ({ stat: true, msg: response.statusText }));
        }
      } catch (error) {
        setErr(() => ({
          stat: true,
          msg: "No internet connection or an unknown error occurred!",
        }));
      }
      setLoading(false);
    };
    getData();
  }, [
    filter.genre,
    filter.date,
    filter.lang,
    filter.rate,
    filter.sort,
    filter.dir,
    filter.company,
    itemsPagination,
    name,
  ]);

  return (
    <div>
      <Cards
        loading={loading}
        items={filter.items}
        err={err}
        type={mediaType}
      />
      <PaginationCards
        pages={totalPages}
        setItemsPagination={setItemsPagination}
      />
    </div>
  );
};

export default Card;
