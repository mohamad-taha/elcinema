import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { GoSortDesc } from "react-icons/go";
import GenreSelect from "./GenresSelect";
import "./Filters.css";
import YearSelect from "./YearSelect";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Filters = ({ filter, setFilter }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [genre, setGenre] = useState([]);
  const [desc, setDesc] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
  ];

  const companies = [
    {
      id: 213,
      name: "Netfilx",
    },
    {
      id: 420,
      name: "Marvel Studios",
    },
    {
      id: 174,
      name: "Warner Bros. Pictures",
    },
    {
      id: 2,
      name: "Walt Disney Pictures",
    },
    {
      id: 4,
      name: "Paramount Pictures",
    },
    {
      id: 5,
      name: "Columbia Pictures",
    },
    {
      id: 33,
      name: "Universal Pictures",
    },
    {
      id: 25,
      name: "20th Century Studios",
    },
    {
      id: 34,
      name: "Sony Pictures Entertainment",
    },
    {
      id: 3,
      name: "Pixar Animation Studios",
    },
    {
      id: 3268,
      name: "HBO",
    },
    {
      id: 521,
      name: "DreamWorks Animation",
    },
    {
      id: 1,
      name: "Star Wars",
    },
    {
      id: 1280645,
      name: "DC Films",
    },
  ];

  const path = location.pathname.split("/").pop();

  const handleSortChange = () => {
    setDesc((prevDesc) => !prevDesc);
    setFilter((prev) => ({
      ...prev,
      dir: !desc ? "asc" : "desc",
    }));
  };

  return (
    <div className="selectsContainer">
      <GenreSelect
        genre={genre}
        setGenre={setGenre}
        path={path}
        filter={filter}
        setFilter={setFilter}
      />

      <YearSelect filter={filter} setFilter={setFilter} />

      <FormControl sx={{ width: "150px" }}>
        <InputLabel id="langFilterLabel">{t("language")}</InputLabel>
        <Select
          labelId="langFilterLabel"
          name="filter lang"
          value={filter.lang}
          label={t("language")}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              lang: e.target.value,
            }));
          }}
        >
          <MenuItem value="">{t("language")}</MenuItem>
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "150px" }}>
        <InputLabel id="rateFilterLabel">{t("rate")}</InputLabel>
        <Select
          labelId="rateFilterLabel"
          name="filter rate"
          value={filter.rate}
          label={t("rate")}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              rate: e.target.value,
            }));
          }}
        >
          <MenuItem value="">{t("rate")}</MenuItem>
          {Array.from({ length: 6 }, (_, i) => {
            const rate = 10 - i;
            return (
              <MenuItem key={rate} value={rate}>
                {rate}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "150px" }}>
        <InputLabel id="companyFilterLabel">{t("company")}</InputLabel>
        <Select
          labelId="companyFilterLabel"
          name="filter by company"
          value={filter.company}
          label={t("company")}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              company: e.target.value,
            }));
          }}
        >
          <MenuItem value="">{t("company")}</MenuItem>
          {companies.map((company) => (
            <MenuItem value={company.id} key={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "150px" }}>
        <InputLabel id="sortFilterLabel">{t("sort_by")}</InputLabel>
        <Select
          labelId="sortFilterLabel"
          name="filter sort"
          value={filter.sort}
          label={t("sort_by")}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              sort: e.target.value,
            }));
          }}
        >
          <MenuItem value="">{t("sort_by")}</MenuItem>
          <MenuItem value="popularity">{t("popularity")}</MenuItem>
          <MenuItem
            value={path === "tv" ? "first_air_date" : "primary_release_date"}
          >
            {t("release_date")}
          </MenuItem>
          <MenuItem value="vote_average">{t("rate")}</MenuItem>
          <MenuItem value="title">{t("title")}</MenuItem>
        </Select>
      </FormControl>

      <button aria-label="change dir" onClick={handleSortChange}>
        <GoSortDesc
          fontSize={30}
          style={{ transform: desc ? "rotate(180deg)" : "" }}
        />
      </button>
    </div>
  );
};

export default Filters;
