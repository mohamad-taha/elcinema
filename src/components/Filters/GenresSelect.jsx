import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const GenreSelect = ({ genre, setGenre, path, filter, setFilter }) => {
  const { t, i18n } = useTranslation();
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      if (!path) return;

      try {
        setErr(false);
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${
            path === "tv" ? "tv" : "movie"
          }/list?language=${i18n.language}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }

        const data = await response.json();
        setGenre(data.genres);
      } catch (err) {
        setErr(err.message === "Failed to fetch" ? t("err_msg") : err.message);
      }
    };

    fetchGenres();
  }, [path, i18n.language, setGenre]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      genre: "",
    }));
  }, [path]);

  return (
    <FormControl sx={{ width: "150px" }}>
      <InputLabel id="genreFilterLabel">{t("genres")}</InputLabel>
      <Select
        labelId="genreFilterLabel"
        name="filter genre"
        value={filter?.genre || ""}
        label={t("genres")}
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            genre: e.target.value,
          }))
        }
      >
        {err && <MenuItem>{err.message}</MenuItem>}
        <MenuItem value="">{t("genres")}</MenuItem>
        {genre?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenreSelect;
