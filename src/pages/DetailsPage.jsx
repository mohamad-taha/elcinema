import React from "react";
import DetailsCard from "../components/DetailsCard/DetailsCard";
import ItemVideo from "../components/ItemVideo/ItemVideo";
import Similiar from "../components/SimiliarCards/Similiar";
import ActorsCards from "../components/ActorsCards/ActorsCards";

const DetailsPage = () => {
  return (
    <div className="container mt">
      <DetailsCard />
      <ActorsCards />
      <ItemVideo />
      <Similiar />
    </div>
  );
};

export default DetailsPage;
