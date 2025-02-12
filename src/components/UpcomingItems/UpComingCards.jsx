import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaginationCards from "../Pagination/ItemsPagination";
import Cards from "../Cards/Card";

const UpComingCards = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { type } = useParams();
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [itemsPagination, setItemsPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const mediaType = type === "tv" ? "tv" : "movie";

  useEffect(() => {
    const API_KEY =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c";
    const API_URL = `https://api.themoviedb.org/3/${
      type === "tv" ? "tv" : "movie"
    }/${
      type === "tv" ? "on_the_air" : "upcoming"
    }?language=en-US&page=${itemsPagination}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setItems(data.results);
        setTotalPages(data.total_pages);
        navigate(`/coming/${type}?page=${itemsPagination}`);
      } catch {
        setErr(() => ({
          stat: true,
          msg: "No internet connection or an unknown error occurred!",
        }));
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [type, itemsPagination]);

  return (
    <div>
      <Cards items={items} err={err} loading={loading} type={mediaType} />
      <PaginationCards
        pages={totalPages}
        setItemsPagination={setItemsPagination}
      />
    </div>
  );
};

export default UpComingCards;
