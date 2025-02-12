import { ThemeProvider } from "@mui/material";
import React from "react";
import TopRartedCards from "../components/TopRatedCards/TopRartedCards";
import { Theme } from "../theme/Theme";
import SearchBar from "../components/SearchBar/SearchBar";

const TopRatedItems = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div className="mt container">
        <SearchBar />
        <TopRartedCards />
      </div>
    </ThemeProvider>
  );
};

export default TopRatedItems;
