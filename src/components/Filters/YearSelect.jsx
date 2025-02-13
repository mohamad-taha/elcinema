import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

const YearSelect = ({ filter, setFilter }) => {
  const { t } = useTranslation();
  const startYear = 1899;
  const currentYear = new Date().getFullYear();

  return (
    <FormControl sx={{ width: "150px" }}>
      <InputLabel id="dateFilterLabel">{t("release_date")}</InputLabel>
      <Select
        labelId="dateFilterLabel"
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
        {Array.from({ length: currentYear - startYear }, (_, i) => {
          const year = currentYear - i;
          return (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default YearSelect;
