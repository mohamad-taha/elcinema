import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";

const GenreSelect = ({ genre, setGenre, path, filter, setFilter }) => {
  useEffect(() => {
    const fetchGenres = async () => {
      if (path) {
        try {
          const response = await fetch(
            path === "tv"
              ? `https://api.themoviedb.org/3/genre/tv/list?language=en`
              : `https://api.themoviedb.org/3/genre/movie/list?language=en`,
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
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchGenres();
  }, [path]);

  return (
    <FormControl sx={{ width: "150px" }}>
      <InputLabel>Genres</InputLabel>
      <Select
        name="filter genre"
        value={filter.genre ?? ""}
        label="Genres"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            genre: e.target.value,
          }))
        }
      >
        <MenuItem defaultChecked value="">
          Genres
        </MenuItem>
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
