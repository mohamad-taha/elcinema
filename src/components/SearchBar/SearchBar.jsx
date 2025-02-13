import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Searchbar.css";

const SearchBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const capitalizeQuery = (query) => {
    return query
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => {
        return char.toUpperCase();
      });
  };

  const formattedQuery = capitalizeQuery(searchTerm);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (e.target.value === "") return;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
      },
    };
    try {
      await fetch(
        `https://api.themoviedb.org/3/search/multi?&page=1include_adult=false&language=en-US&query=${encodeURIComponent(
          formattedQuery
        )}`,
        options
      );
      navigate(`/search?query=${encodeURIComponent(formattedQuery)}&page=1`);
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
    }
    setLoading(false);
  };

  return (
    <form onSubmit={search} className="searchForm">
      <div>
        <input
          type="text"
          id="itemTitle"
          name="itemName"
          placeholder={t('search_placeholder')}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
          value={searchTerm}
        />
        <button
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
          type="submit"
          aria-label="search button"
          className="primaryBtn"
        >
          <LuSearch
            className={`${loading ? "loadingSearch" : ""}`}
            fontSize={20}
          />
        </button>
      </div>
      {err.stat ?? <span>{err.msg}</span>}
    </form>
  );
};

export default SearchBar;
