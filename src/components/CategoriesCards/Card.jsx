import React from "react";
import { Link } from "react-router-dom";

const Card = ({ icn, name, label, page }) => {
  return (
    <Link className="categoryCard" aria-label={label} to={page}>
      {icn}
      {name}
    </Link>
  );
};

export default Card;
