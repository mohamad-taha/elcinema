import React from "react";
import UpComingCards from "../components/UpcomingItems/UpComingCards";
import { ThemeProvider } from "@mui/material";
import { Theme } from "../theme/Theme";

const UpComingItems = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div className="mt container">
        <UpComingCards />
      </div>
    </ThemeProvider>
  );
};

export default UpComingItems;
