import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import ItemsPage from "./pages/ItemsPage";
import { SearchPage } from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import TrendingItems from "./pages/TrendingItems";
import TopRatedItems from "./pages/TopRatedItems";
import UpComingItems from "./pages/UpcomingItems";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="category/:name" element={<ItemsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:type/:name/:id" element={<DetailsPage />} />
        <Route path="/trending/:type" element={<TrendingItems />} />
        <Route path="/premier/:type" element={<TopRatedItems />} />
        <Route path="/coming/:type" element={<UpComingItems />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
