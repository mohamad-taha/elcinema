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

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState({ stat: false, msg: "" });

  // 1. قراءة الـ query ورقم الصفحة مباشرة من الرابط يمنع مشاكل الـ Navigation
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const itemsPagination = parseInt(searchParams.get("page")) || 1; // استخراج رقم الصفحة من الرابط ديناميكياً

  const activePages = Math.min(totalPages, 500); // حماية الـ Pagination كالعادة

  const filteredData = results.filter((result) => {
    const typeMatch = !filter.type || result.media_type === filter.type;
    const genreMatch = !filter.genre || (result.genre_ids && result.genre_ids.includes(filter.genre));
    const voteCountMatch = result.vote_count > 5;
    const voteAverageMatch = !filter.rate || result.vote_average < filter.rate;
    const dateMatch = !filter.date ||
      (result.first_air_date && result.first_air_date < `${filter.date}-01-01`) ||
      (result.release_date && result.release_date < `${filter.date}-01-01`);
    return typeMatch && genreMatch && voteCountMatch && voteAverageMatch && dateMatch;
  });

  useEffect(() => {
    if (!query) return;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    };

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${query}&page=${itemsPagination}&language=${i18n.language}`,
          options
        );
        const data = await response.json();

        setResults(data.results || []);
        setTotalPages(data.total_pages || 1);

        if (!response.ok) {
          setErr({ stat: true, msg: response.statusText });
        }
      } catch (err) {
        setErr({
          stat: true,
          msg: err.message === "Failed to fetch" ? t("err_msg") : err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, itemsPagination, i18n.language, t]); // قمنا بتنظيف الـ dependencies غير المستخدمة في الـ API لحمايته من الطلبات المتكررة

  // 2. دالة تحديث الرابط عند الضغط على أرقام الصفحات بالأسفل
  const handlePageChange = (pageNumber) => {
    navigate(`/search?query=${query}&page=${pageNumber}`);
  };

  return (
    <div>
      <Cards items={filteredData} loading={loading} err={err} />
      {/* 3. تمرير currentPage ليضيء الرقم الحالي بالأسفل بشكل سليم */}
      <PaginationCards
        pages={activePages}
        currentPage={itemsPagination}
        setItemsPagination={handlePageChange}
      />
    </div>
  );
};

export default ResultCards;
