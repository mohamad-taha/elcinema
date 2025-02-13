import { useContext } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import GenreSelect from "./GenresSelect";
import { SearchContext } from "../../context/SearchContext";
import YearSelect from "./YearSelect";
import { useTranslation } from "react-i18next";

const SearchFilters = () => {
  const { filter, setFilter, genre, setGenre } = useContext(SearchContext);
  const { t } = useTranslation();

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
        <InputLabel id="typeFilterlabel">{t("type")}</InputLabel>
        <Select
          labelId="typeFilterLabel"
          aria-label="filter by type"
          name="filter type"
          value={filter.type}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              type: e.target.value,
            }));
          }}
          label={t("type")}
        >
          <MenuItem value="">{t("type")}</MenuItem>
          <MenuItem value="tv">{t("movies")}</MenuItem>
          <MenuItem value="movie">{t("series")}</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: "150px" }}>
        <InputLabel id="resultsRateFilterlabel">{t("rate")}</InputLabel>
        <Select
          labelId="resultsRateFilterLabel"
          name="filter rate"
          value={filter.rate}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              rate: e.target.value,
            }));
          }}
          label={t("rate")}
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

      <YearSelect filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default SearchFilters;
