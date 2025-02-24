import React, { lazy, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import ItemsPage from "./pages/ItemsPage";
import { SearchPage } from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import TrendingItems from "./pages/TrendingItems";
import TopRatedItems from "./pages/TopRatedItems";
import UpComingItems from "./pages/UpcomingItems";
const Sidebar = lazy(() => import("./components/Sidebar/Sidebar"));
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import Callback from "./pages/Callback";
import FavoriteItems from "./pages/FavoritesItems";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Sidebar />
      </Suspense>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="category/:type" element={<ItemsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:type/:name/:id" element={<DetailsPage />} />
        <Route path="/trending/:type" element={<TrendingItems />} />
        <Route path="/premier/:type" element={<TopRatedItems />} />
        <Route path="/coming/:type" element={<UpComingItems />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/favorites/:type" element={<FavoriteItems />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
