import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import PaginationCards from "../Pagination/ItemsPagination";
import { useTranslation } from "react-i18next";

const Card = ({ filter, setFilter }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { type } = useParams();
  const [itemsPagination, setItemsPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const currentDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const mediaType = useMemo(() => (type === "tv" ? "tv" : "movie"), [type]);

  const baseUrl = useMemo(() => {
    if (!filter) return "";

    return (
      `https://api.themoviedb.org/3/discover/${mediaType}?` +
      `vote_count.gte=2&` +
      `${
        mediaType === "tv" ? "first_air_date" : "primary_release_date"
      }.lte=${currentDate}&` +
      `${
        mediaType === "tv" ? "first_air_date" : "primary_release_date"
      }.gte=2000-01-01&` +
      `with_original_language=${filter.lang}&` +
      `${mediaType === "tv" ? "first_air_date_year" : "primary_release_year"}=${
        filter.date
      }&` +
      `with_genres=${filter.genre}&include_adult=false&include_video=false&` +
      `language=${i18n.language}&page=${itemsPagination}&` +
      `vote_average.lte=${filter.rate}&vote_average.gte=5&` +
      `with_companies=${filter.company}&sort_by=${filter.sort}.${filter.dir}`
    );
  }, [filter, itemsPagination, mediaType, currentDate, i18n.language, type]);

  useEffect(() => {
    if (!baseUrl) return;

    const fetchData = async () => {
      setLoading(true);
      setErr({ stat: false, msg: "" });

      try {
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
          },
        });

        const data = await response.json();
        setTotalPages(data?.total_pages || 1);

        setFilter((prev) =>
          JSON.stringify(prev.items) !== JSON.stringify(data.results)
            ? { ...prev, items: data.results }
            : prev
        );

        if (!response.ok) {
          setErr({
            stat: true,
            msg: response.statusText,
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

    fetchData();
  }, [baseUrl]);

  useEffect(() => {
    navigate(`/category/${type}?page=${itemsPagination}`);
  }, [itemsPagination, navigate, type]);

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
