import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"; // 1. استيراد useLocation
import Cards from "../Cards/Card";
import Pagination from "../Pagination/ItemsPagination";
import GenreSelect from "../Filters/GenresSelect";
import YearSelect from "../Filters/YearSelect";
import { useTranslation } from "react-i18next";

const TopRatedCards = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); // 2. لتتبع أزرار التقدم والرجوع بالمتصفح
  const { type } = useParams();
  
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [itemsPagination, setItemsPagination] = useState(1);
  const [genre, setGenre] = useState([]);
  const [filter, setFilter] = useState({ genre: "", date: "" });

  const currentDate = new Date().toISOString().split("T")[0];
  const activePages = Math.min(totalPages, 500);
  const mediaType = type === "tv" ? "tv" : "movie";

  // 3. مراقبة حركة الرابط (مهم جداً لإصلاح زر الرجوع)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    if (pageFromUrl !== itemsPagination) {
      setItemsPagination(pageFromUrl);
    }
  }, [location.search, itemsPagination]);

  // تصفية البيانات يدوياً
  const filteredData = items.filter((item) => {
    const genreMatch = filter.genre === "" || item.genre_ids.includes(Number(filter.genre));
    const voteMatch = item.vote_count > 100;
    const dateMatch = filter.date === "" 
      ? item.first_air_date?.slice(0, 10) < currentDate || item.release_date?.slice(0, 10) < currentDate 
      : item.first_air_date?.slice(0, 4) <= filter.date || item.release_date?.slice(0, 4) <= filter.date;
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
          `https://api.themoviedb.org/3/${mediaType}/top_rated?language=${i18n.language}&page=${itemsPagination}`,
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
        // تم حذف سطر navigate من هنا لمنع الـ Loop وحل مشكلة الرجوع
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
  }, [itemsPagination, type, i18n.language, mediaType, t]);

  // 4. الدالة المخصصة لتحديث الرابط والصفحة معاً عند قيام المستخدم بالنقر
  const handlePageChange = (pageNumber) => {
    setItemsPagination(pageNumber);
    navigate(`/premier/${type}?page=${pageNumber}`);
  };

  return (
    <div className="mt">
      <div className="selectsContainer">
        <GenreSelect genre={genre} setGenre={setGenre} filter={filter} setFilter={setFilter} path={type} />
        <YearSelect filter={filter} setFilter={setFilter} />
      </div>
      <Cards items={filteredData} loading={loading} err={err} type={mediaType} />
      
      {/* 5. تمرير currentPage ليتم قراءتها في الأسفل وتحديث رقم الصفحة النشطة */}
      <Pagination 
        pages={activePages} 
        currentPage={itemsPagination} 
        setItemsPagination={handlePageChange} 
      />
    </div>
  );
};

export default TopRatedCards;
