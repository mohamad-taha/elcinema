import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"; // 1. قمنا بإضافة useLocation هنا
import PaginationCards from "../Pagination/ItemsPagination";
import Cards from "../Cards/Card";
import { useTranslation } from "react-i18next";

const UpComingCards = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); // 2. تتبع التغييرات في رابط المتصفح
  const { type } = useParams();

  const [items, setItems] = useState([]);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [itemsPagination, setItemsPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const mediaType = type === "tv" ? "tv" : "movie";

  // 3. تأثير (Effect) لمراقبة زر الرجوع والتقدم في المتصفح وتحديث الـ State بناءً عليه
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    if (pageFromUrl !== itemsPagination) {
      setItemsPagination(pageFromUrl);
    }
  }, [location.search, itemsPagination]);

  const getData = useCallback(async () => {
    // ملاحظة: قمت بتعديل language=en-US في رابط الأفلام لجعله ديناميكياً مثل المسلسلات (${i18n.language})
    const API_URL = type === "tv"
      ? `https://api.themoviedb.org/3/discover/tv?include_video=false&page=${itemsPagination}&language=${i18n.language}&first_air_date.gte=${today}&sort_by=popularity.desc`
      : `https://api.themoviedb.org/3/discover/movie?include_video=false&language=${i18n.language}&page=${itemsPagination}&primary_release_date.gte=${today}&sort_by=popularity.desc`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    };

    setLoading(true);
    try {
      const response = await fetch(API_URL, options);
      if (!response.ok) {
        setErr({ stat: true, msg: response.statusText });
      }
      const data = await response.json();
      setItems(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      setErr({
        stat: true,
        msg: error.message === "Failed to fetch" ? t("err_msg") : error.message,
      });
    } finally {
      setLoading(false);
    }
  }, [type, itemsPagination, i18n.language, t, today]);

  useEffect(() => {
    getData();
  }, [getData]);

  // 4. دالة مخصصة لتغيير الرابط فقط عند نقر المستخدم على أرقام الصفحات
  const handlePageChange = (pageNumber) => {
    setItemsPagination(pageNumber);
    navigate(`/coming/${type}?page=${pageNumber}`);
  };

  return (
    <div>
      <Cards items={items} err={err} loading={loading} type={mediaType} />
      {/* 5. نمرر الدالة الجديدة للتحكم بالصفحات */}
      <PaginationCards currentPage={itemsPagination} pages={totalPages} setItemsPagination={handlePageChange} />
    </div>
  );
};

export default UpComingCards;
