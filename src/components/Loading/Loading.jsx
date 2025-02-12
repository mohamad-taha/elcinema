import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div
      style={{
        marginTop: "30px",
        width: "100%",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </div>
  );
};

export default Loading;
