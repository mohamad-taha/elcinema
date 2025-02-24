import React, { useEffect } from "react";
import FavoriteCards from "../components/FavoriteCards/FavoriteCards";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Theme } from "../theme/Theme";

const FavoritesItems = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
      alert("you need to sign in first");
    }
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <div className="container">
        <FavoriteCards />
      </div>
    </ThemeProvider>
  );
};

export default FavoritesItems;
