import React from "react";
import { ThemeProvider } from "@mui/material";
import { Theme } from "../theme/Theme";
import ResultCards from "../components/SearchResultsCards/ResultCards";
import SearchFilters from "../components/Filters/SearchFilters";
import { ContextProvider } from "../context/SearchContext";
import SearchBars from "../components/SearchBar/SearchBar";

export const SearchPage = () => {
  return (
    <ContextProvider>
      <ThemeProvider theme={Theme}>
        <div className="container mt">
          <SearchBars />
          <SearchFilters />
          <ResultCards />
        </div>
      </ThemeProvider>
    </ContextProvider>
  );
};
