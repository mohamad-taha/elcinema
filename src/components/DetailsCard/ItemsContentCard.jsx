import React from "react";
import { useTranslation } from "react-i18next";

const ItemsContentCard = ({ cardDetails }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{cardDetails?.title || cardDetails?.name}</h1>
      {cardDetails.number_of_episodes && (
        <p className="itemEpoisdes">
          <small>
            {t("seasons")} {cardDetails.number_of_seasons}
          </small>
          <small>
            {t("eposides")} {cardDetails.number_of_episodes}
          </small>
        </p>
      )}
      <small>
        {t("status")} {cardDetails?.status}
      </small>
      <p className="itemOverview">
        <span className="cardSectionHead">
          <svg
            width={25}
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M4 1a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h2.465l1.703 2.555A1 1 0 0 0 9 23h1.5a1 1 0 0 0 1-1V4a3 3 0 0 0-3-3H4Zm19 3a3 3 0 0 0-3-3h-4.5a3 3 0 0 0-3 3v18a1 1 0 0 0 1 1H15a1 1 0 0 0 .832-.445L17.535 20H20a3 3 0 0 0 3-3V4Z"
              fill="#f3951e"
              fillRule="evenodd"
              className="fill-000000"
            ></path>
          </svg>
          {t("overview")}
        </span>
        {cardDetails.overview}
      </p>
    </div>
  );
};

export default ItemsContentCard;
