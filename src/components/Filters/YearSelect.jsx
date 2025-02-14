import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const YearSelect = ({ filter, setFilter }) => {
  const { t } = useTranslation();
  const startYear = 1899;
  const currentYear = new Date().getFullYear();

  const yearOptions = useMemo(
    () =>
      Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
        const year = currentYear - i;
        return (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        );
      }),
    [currentYear, startYear]
  );

  return (
    <FormControl sx={{ width: "150px" }}>
      <InputLabel id="dateFilterLabel">{t("release_date")}</InputLabel>
      <Select
        labelId="dateFilterLabel"
        aria-label="Filter by release date"
        name="filter date"
        value={filter.date ?? ""}
        label={t("release_date")}
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            date: e.target.value,
          }))
        }
      >
        <MenuItem value="">{t("release_date")}</MenuItem>
        {yearOptions}
      </Select>
    </FormControl>
  );
};

export default YearSelect;
