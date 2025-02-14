import { useContext, useMemo } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import GenreSelect from "./GenresSelect";
import { SearchContext } from "../../context/SearchContext";
import YearSelect from "./YearSelect";
import { useTranslation } from "react-i18next";

const SearchFilters = () => {
  const { filter, setFilter, genre, setGenre } = useContext(SearchContext);
  const { t } = useTranslation();

  const ratingOptions = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const rate = 10 - i;
        return (
          <MenuItem key={rate} value={rate}>
            {rate}
          </MenuItem>
        );
      }),
    []
  );

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
        <InputLabel id="typeFilterLabel">{t("type")}</InputLabel>
        <Select
          labelId="typeFilterLabel"
          aria-label="Filter by type"
          name="filter type"
          value={filter.type || ""}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              type: e.target.value,
            }));
          }}
          label={t("type")}
        >
          <MenuItem value="">{t("type")}</MenuItem>
          <MenuItem value="movie">{t("movies")}</MenuItem>
          <MenuItem value="tv">{t("series")}</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: "150px" }}>
        <InputLabel id="resultsRateFilterLabel">{t("rate")}</InputLabel>
        <Select
          labelId="resultsRateFilterLabel"
          aria-label="Filter by rate"
          name="filter rate"
          value={filter.rate || ""}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              rate: e.target.value,
            }));
          }}
          label={t("rate")}
        >
          <MenuItem value="">{t("rate")}</MenuItem>
          {ratingOptions}
        </Select>
      </FormControl>

      <YearSelect filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default SearchFilters;
