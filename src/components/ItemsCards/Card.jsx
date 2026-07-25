import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"; // 1. إضافة useLocation
import Cards from "../Cards/Card";
import PaginationCards from "../Pagination/ItemsPagination";
import { useTranslation } from "react-i18next";

const Card = ({ filter, setFilter }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); // 2. تتبع الرابط للتحكم بأزرار المتصفح
  const { type } = useParams();

  const [itemsPagination, setItemsPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const currentDate = useMemo(() => new Date().toISOString().split("T")[0], []);
  const mediaType = useMemo(() => (type === "tv" ? "tv" : "movie"), [type]);
  const activePages = Math.min(totalPages, 500);

  // 3. مراقبة حركة الرابط العلوي وتحديث الـ State فوراً عند الرجوع بالمتصفح
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    if (pageFromUrl !== itemsPagination) {
      setItemsPagination(pageFromUrl);
    }
  }, [location.search, itemsPagination]);

  const baseUrl = useMemo(() => {
    if (!filter) return "";
    return (
      `https://api.themoviedb.org/3/discover/${mediaType}?` +
      `vote_count.gte=2&` +
      `${mediaType === "tv" ? "first_air_date" : "primary_release_date"}.lte=${currentDate}&` +
      `${mediaType === "tv" ? "first_air_date" : "primary_release_date"}.gte=2000-01-01&` +
      `with_original_language=${filter.lang}&` +
      `${mediaType === "tv" ? "first_air_date_year" : "primary_release_year"}=${filter.date}&` +
      `with_genres=${filter.genre}&include_adult=false&include_video=false&` +
      `language=${i18n.language}&page=${itemsPagination}&` +
      `vote_average.lte=${filter.rate}&vote_average.gte=5&` +
      `with_companies=${filter.company}&sort_by=${filter.sort}.${filter.dir}`
    );
  }, [filter, itemsPagination, mediaType, currentDate, i18n.language]);

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
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
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
          setErr({ stat: true, msg: response.statusText });
        }
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
  }, [baseUrl, setFilter, t]);

  // 4. الدالة الموحدة المخصصة لتغيير الرابط والـ State معاً عند ضغط المستخدم يدوياً
  const handlePageChange = (pageNumber) => {
    setItemsPagination(pageNumber);
    navigate(`/category/${type}?page=${pageNumber}`);
  };

  return (
    <div>
      <Cards loading={loading} items={filter.items} err={err} type={mediaType} />
      {/* 5. تمرير currentPage ليتم إضاءة رقم الصفحة الفعلي بالأسفل بشكل متزامن */}
      <PaginationCards
        pages={activePages}
        currentPage={itemsPagination}
        setItemsPagination={handlePageChange}
      />
    </div>
  );
};

export default Card;
