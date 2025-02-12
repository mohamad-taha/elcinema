import React, { useEffect, useState } from "react";
import Filters from "../components/Filters/Filters";
import Cards from "../components/ItemsCards/Card";
import { ThemeProvider } from "@mui/material";
import { Theme } from "../theme/Theme";
import SearchBar from "../components/SearchBar/SearchBar";

const ItemsPage = () => {
  const [filter, setFilter] = useState({
    items: [],
    genre: "",
    date: "",
    lang: "",
    rate: "",
    sort: "popularity",
    dir: "desc",
    company: "",
  });

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      genre: "",
      date: "",
      lang: "",
      rate: "",
      sort: "popularity",
      dir: "desc",
      company: "",
    }));
  }, [window.location.pathname]);

  return (
    <ThemeProvider theme={Theme}>
      <div className="container mt">
        <SearchBar />
        <Filters filter={filter} setFilter={setFilter} />
        <Cards filter={filter} setFilter={setFilter} />
      </div>
    </ThemeProvider>
  );
};

export default ItemsPage;
