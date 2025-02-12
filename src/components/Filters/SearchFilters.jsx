import { useContext } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import GenreSelect from "./GenresSelect";
import { SearchContext } from "../../context/SearchContext";
import YearSelect from "./YearSelect";

const SearchFilters = () => {
  const { filter, setFilter, genre, setGenre } = useContext(SearchContext);

  return (
    <div className="selectsContainer">
      <GenreSelect
        filter={filter}
        setFilter={setFilter}
        genre={genre}
        setGenre={setGenre}
        path={filter.type}
      />

      <FormControl sx={{ width: "150px" }}>
        <InputLabel>Type</InputLabel>
        <Select
          aria-label="filter by type"
          name="filter type"
          value={filter.type}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              type: e.target.value,
            }));
          }}
          label="Type"
        >
          <MenuItem value="">Type</MenuItem>
          <MenuItem value="tv">Series</MenuItem>
          <MenuItem value="movie">Movies</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: "150px" }}>
        <InputLabel>Rate</InputLabel>
        <Select
          aria-label="filter by rate"
          name="filter rate"
          value={filter.rate}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              rate: e.target.value,
            }));
          }}
          label="Rate"
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

      <YearSelect filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default SearchFilters;
