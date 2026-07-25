import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"; // 1. إضافة useLocation هنا
import Cards from "../Cards/Card";
import GenreSelect from "../Filters/GenresSelect";
import Pagination from "../Pagination/ItemsPagination";
import YearSelect from "../Filters/YearSelect";
import { useTranslation } from "react-i18next";

const TrendingCards = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); // 2. تتبع الرابط عند الضغط على زر الرجوع
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

  // حماية الـ Pagination من الانهيار وتحديدها بـ 500 صفحة كحد أقصى لـ TMDB
  const activePages = Math.min(totalPages, 500);

  // 3. تأثير لمراقبة الرابط العلوي وتحديث الـ State فوراً عند الرجوع بالمتصفح
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    if (pageFromUrl !== itemsPagination) {
      setItemsPagination(pageFromUrl);
    }
  }, [location.search, itemsPagination]);

  const filteredData = items.filter((item) => {
    const genreMatch = filter.genre === "" || item.genre_ids.includes(Number(filter.genre));
    const dateMatch = filter.date === ""
      ? (item.first_air_date && item.first_air_date < currentDate) || (item.release_date && item.release_date < currentDate)
      : (item.first_air_date && item.first_air_date.slice(0, 4) <= filter.date) || (item.release_date && item.release_date.slice(0, 4) <= filter.date);
    return genreMatch && dateMatch;
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
          `https://api.themoviedb.org/3/trending/${type === "tv" ? "tv" : "movie"}/day?language=${i18n.language}&page=${itemsPagination}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          },
        );
        if (!response.ok) {
          setErr({ stat: true, msg: response.statusText });
        }
        const data = await response.json();
        setItems(data.results || []);
        setTotalPages(data.total_pages || 1);
        // تم حذف الـ navigate التلقائي من هنا لحل المشكلة الأساسية
      } catch (error) {
        setErr({
          stat: true,
          msg: error.message === "Failed to fetch" ? t("err_msg") : error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [itemsPagination, type, i18n.language]);

  // 4. دالة مخصصة لربط ضغط المستخدم على الأرقام بالرابط والـ State معاً
  const handlePageChange = (pageNumber) => {
    setItemsPagination(pageNumber);
    navigate(`/trending/${type}?page=${pageNumber}`);
  };

  return (
    <div className="mt">
      <div className="selectsContainer">
        <GenreSelect genre={genre} setGenre={setGenre} filter={filter} setFilter={setFilter} path={type} />
        <YearSelect filter={filter} setFilter={setFilter} />
      </div>
      <Cards items={filteredData} loading={loading} err={err} type={mediaType} />

      {/* 5. تمرير الـ currentPage لتفعيل الإضاءة التلقائية على الرقم الفعلي */}
      <Pagination
        pages={activePages}
        currentPage={itemsPagination}
        setItemsPagination={handlePageChange}
      />
    </div>
  );
};

export default TrendingCards;
