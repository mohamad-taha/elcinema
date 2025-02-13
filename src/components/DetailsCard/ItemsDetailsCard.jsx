import React from "react";
import { WiTime2 } from "react-icons/wi";
import { FaLanguage } from "react-icons/fa6";
import { PiFlagBold } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const ItemsDetailsCard = ({ cardDetails }) => {
  const { t } = useTranslation();

  return (
    <div className="itemDetails">
      <span className="cardSectionHead">
        <svg
          width={25}
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h32v32H0z"></path>
          <path
            d="M15 12c2.762 0 5-2.238 5-5s-2.238-5-5-5-5 2.238-5 5 2.238 5 5 5zm5 16V14H8v2h2v12H8v2h14v-2h-2z"
            fill="#f3951e"
            className="fill-000000"
          ></path>
        </svg>
        {t("details")}
      </span>
      <span className="itemGenres">
        {cardDetails?.genres?.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </span>
      <div>
        {cardDetails?.episode_run_time?.length > 0 && (
          <p>
            <WiTime2 /> <span>{t("run_time")}</span>
            {cardDetails?.episode_run_time?.map((time, id) => (
              <span key={id}>
                {time} {t("min")}
              </span>
            ))}
          </p>
        )}
        {cardDetails?.runtime !== "" ?? (
          <p>
            <WiTime2 /> <span>{t("run_time")}</span>
            {<span>{cardDetails?.runtime}</span>}
          </p>
        )}
        <p>
          <FaLanguage /> <span>{t("language")}</span>
          <span>{cardDetails.original_language}</span>
        </p>
        <p>
          <PiFlagBold />
          <span>{t("country")}</span>
          <span>{cardDetails?.origin_country}</span>
        </p>
        {cardDetails?.created_by?.length > 0 && (
          <p>
            <BsPerson /> <span>{t("creator")}</span>
            {cardDetails?.created_by?.map((creator, id) => (
              <span key={id}>{creator.name}</span>
            ))}
          </p>
        )}
        <p>
          <MdDateRange />
          <span>{t("release_date")}</span>
          <span>
            {cardDetails?.first_air_date || cardDetails?.release_date}
          </span>
        </p>
        <p>
          <BsBuildings />
          <span>{t("company")}</span>
          {cardDetails?.production_companies?.map((name, id) => (
            <span key={id}>{name.name}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ItemsDetailsCard;
