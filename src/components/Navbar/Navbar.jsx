import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/logo.svg";
import Links from "../NavLinks/Links";
import { TbListTree } from "react-icons/tb";
import { Context } from "../../context/Context";
import Btn from "../LanguageBtn/Btn";
import "./Navbar.css";
import AccountBtn from "../AccountBtn/AccountBtn";

const Navbar = () => {
  const { setShowSidebar } = useContext(Context);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`nav ${scrolled ? "navScrolled" : ""}`}>
      <Link to={"/"}>
        <img src={logo} alt="logo" width={60} />
      </Link>
      <Links />
      <div>
        <Btn />
        <button
          aria-label="menu button"
          onClick={() => setShowSidebar(true)}
          className="menuBtn linksBtn"
        >
          <TbListTree fontSize={25} />
        </button>
        <AccountBtn />
      </div>
    </nav>
  );
};

export default Navbar;
