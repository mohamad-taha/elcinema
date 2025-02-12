import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { GoSortAsc } from "react-icons/go";
import { GoSortDesc } from "react-icons/go";
import GenreSelect from "./GenresSelect";
import "./Filters.css";
import YearSelect from "./YearSelect";

const Filters = ({ filter, setFilter }) => {
  const [genre, setGenre] = useState([]);
  const [desc, setDesc] = useState(false);

  const path = window.location.pathname.split("/").pop();

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

  const handleSortChange = () => {
    setDesc(!desc);
    !desc
      ? setFilter((prev) => ({
          ...prev,
          dir: "asc",
        }))
      : setFilter((prev) => ({
          ...prev,
          dir: "desc",
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
        <InputLabel>language</InputLabel>
        <Select
          name="filter lang"
          value={filter.lang}
          label="Language"
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              lang: e.target.value,
            }));
          }}
        >
          <MenuItem value="">Language</MenuItem>
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "150px" }}>
        <InputLabel>Rate</InputLabel>
        <Select
          name="filter rate"
          value={filter.rate}
          label="Rate"
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              rate: e.target.value,
            }));
          }}
        >
          <MenuItem value="">Rate</MenuItem>
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
        <InputLabel>Company</InputLabel>
        <Select
          name="filter company"
          value={filter.company}
          label="Company"
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              company: e.target.value,
            }));
          }}
        >
          <MenuItem value="">Company</MenuItem>
          {companies.map((company) => (
            <MenuItem value={company.id} key={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "150px" }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          name="filter sort"
          value={filter.sort}
          label="Sort By"
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              sort: e.target.value,
            }));
          }}
        >
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
          <MenuItem
            value={path === "tv" ? "first_air_date" : "primary_release_date"}
          >
            Release Date
          </MenuItem>
          <MenuItem value="vote_average">Rate</MenuItem>
          <MenuItem value="title">title</MenuItem>
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
