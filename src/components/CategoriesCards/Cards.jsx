import React from "react";
import Card from "./Card";
import { MdOutlineMovie } from "react-icons/md";
import { LuTv } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import "./Cards.css";

const Cards = () => {
  const { t } = useTranslation();

  return (
    <div className="categoryCardsContainer">
      <Card
        icn={<MdOutlineMovie fontSize={30} />}
        name={t("movies")}
        label="go to moveis page"
        page="/category/movies"
      />
      <Card
        icn={<LuTv fontSize={30} />}
        name={t("series")}
        label="go to moveis page"
        page="/category/tv"
      />
    </div>
  );
};

export default Cards;
