import React, { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import NavLinks from "../NavLinks/Links";
import "./Sidebar.css";
import Btn from "../AccountBtn/Btn";

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useContext(Context);

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
    <div>
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
        <Btn />
        <NavLinks />
      </div>
    </div>
  );
};

export default Sidebar;
