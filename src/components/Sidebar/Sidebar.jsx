import React, { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import NavLinks from "../NavLinks/Links";
import Btn from "../LanguageBtn/Btn";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Sidebar.css";
import AccountBtn from "../AccountBtn/AccountBtn";

const Sidebar = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const { showSidebar, setShowSidebar } = useContext(Context);

  useEffect(() => {
    if (showSidebar) {
      setShowSidebar(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setShowSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div dir="ltr">
      <div
        role="button"
        onClick={() => setShowSidebar(false)}
        style={{ display: showSidebar ? "block" : "none" }}
        className="overlay"
      ></div>
      <div
        className="sidebar"
        style={{
          transform: showSidebar ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div>
          <AccountBtn />
        </div>
        <NavLinks />
        <Btn />
      </div>
    </div>
  );
};

export default Sidebar;
