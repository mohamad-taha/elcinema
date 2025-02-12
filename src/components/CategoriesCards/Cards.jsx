import React from "react";
import Card from "./Card";
import { MdOutlineMovie } from "react-icons/md";
import { LuTv } from "react-icons/lu";
import "./Cards.css";

const Cards = () => {
  return (
    <div className="categoryCardsContainer">
      <Card
        icn={<MdOutlineMovie fontSize={30} />}
        name="Movies"
        label="go to moveis page"
        page="/category/movies"
      />
      <Card
        icn={<LuTv fontSize={30} />}
        name="TV Shows"
        label="go to moveis page"
        page="/category/tv"
      />
    </div>
  );
};

export default Cards;
