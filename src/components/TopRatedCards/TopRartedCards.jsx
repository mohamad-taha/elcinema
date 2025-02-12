import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import Pagination from "../Pagination/ItemsPagination";
import GenreSelect from "../Filters/GenresSelect";
import YearSelect from "../Filters/YearSelect";

const TopRatedCards = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [itemsPagination, setItemsPagination] = useState(1);
  const [genre, setGenre] = useState([]);
  const [filter, setFilter] = useState({ genre: "", date: "" });

  const currentDate = new Date().toISOString().split("T")[0];

  const filteredData = items?.filter((item) => {
    const genre = filter.genre === "" || item.genre_ids.includes(filter.genre);
    const vote = item.vote_count > 100;
    const date =
      filter.date === ""
        ? item.first_air_date || item.release_date < currentDate
        : item.first_air_date || item.release_date < `${filter.date}-1-1`;

    return genre && vote && date;
  });

  const mediaType = type === "tv" ? "tv" : "movie";

  useEffect(() => {
    setFilter(() => ({
      genre: "",
      date: "",
    }));
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
          `https://api.themoviedb.org/3/${
            type === "tv" ? "tv" : "movie"
          }/top_rated?language=en-US&page=${itemsPagination}`,
          options
        );
        const data = await resp.json();
        setItems(data.results);
        setTotalPages(data.total_pages);
        navigate(`/premier/${type}?page=${itemsPagination}`);
        if (!response.ok) {
          setErr(() => ({
            stat: true,
            msg: response.statusText,
          }));
        }
      } catch (error) {
        setErr(() => ({
          stat: true,
          msg: "No internet connection or an unknown error occurred!",
        }));
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [itemsPagination, type, filter.genre, filter.date]);
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
