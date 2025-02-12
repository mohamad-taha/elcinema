import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const YearSelect = ({ filter, setFilter }) => {
  const startYear = 1899;
  const currentYear = new Date().getFullYear();

  return (
    <FormControl sx={{ width: "150px" }}>
      <InputLabel>Release Date</InputLabel>
      <Select
        aria-label="filter by date"
        name="filter date"
        value={filter.date ?? ""}
        label="Release Date"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            date: e.target.value,
          }))
        }
      >
        <MenuItem value="">Release Date</MenuItem>
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
