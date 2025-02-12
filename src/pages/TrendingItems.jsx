import React from "react";
import TrendingCards from "../components/TrendingCards/TrendingCards";
import { ThemeProvider } from "@mui/material";
import { Theme } from "../theme/Theme";
import SearchBar from "../components/SearchBar/SearchBar";

const TopRatedItems = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div className="mt container">
        <SearchBar />
        <TrendingCards />
      </div>
    </ThemeProvider>
  );
};

export default TopRatedItems;
