import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaFireAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { BiCameraMovie } from "react-icons/bi";
import { TbAlignBoxCenterTop } from "react-icons/tb";
import { BiTv } from "react-icons/bi";
import { MdOutlineUpcoming } from "react-icons/md";
import { Context } from "../../context/Context";
import "./Links.css";

const Links = () => {
  const { setSowSidebar } = useContext(Context);
  const [activeDropDown, setActiveDropDown] = useState(null);

  const handleMouseOver = (id) => {
    setActiveDropDown(id);
  };

  const handleMouseLeave = () => {
    setActiveDropDown(null);
  };

  const navLinks = [
    {
      to: "/",
      icon: <GoHome />,
      text: "Home",
    },
    {
      to: "/category/movies",
      icon: <BiCameraMovie />,
      text: "Movies",
    },
    {
      to: "/category/tv",
      icon: <BiTv />,
      text: "Series",
    },
  ];

  const dropDownLinks = [
    {
      id: "trending",
      icon: <FaFireAlt />,
      text: "Trending",
      links: [
        {
          to: "/trending/movies?page=1",
          icon: <BiCameraMovie />,
          text: "Movies",
        },
        {
          to: "/trending/tv?page=1",
          icon: <BiTv />,
          text: "Series",
        },
      ],
    },
    {
      id: "top-rated",
      icon: <TbAlignBoxCenterTop />,
      text: "Top rated",
      links: [
        {
          to: "/premier/movies?page=1",
          icon: <BiCameraMovie />,
          text: "Movies",
        },
        {
          to: "/premier/tv?page=1",
          icon: <BiTv />,
          text: "Series",
        },
      ],
    },
    {
      id: "Upcoming",
      icon: <MdOutlineUpcoming />,
      text: "Upcoming",
      links: [
        {
          to: "/coming/movies?page=1",
          icon: <BiCameraMovie />,
          text: "Movies",
        },
        {
          to: "/coming/tv?page=1",
          icon: <BiTv />,
          text: "Series",
        },
      ],
    },
  ];

  return (
    <div className="navLinksContainer">
      {navLinks.map((link, index) => (
        <Link key={index} to={link.to}>
          {link.icon}
          {link.text}
        </Link>
      ))}

      {dropDownLinks.map((link, index) => (
        <button
          className="linksBtn"
          key={index}
          onClick={() => handleMouseOver(link.id)}
          onMouseOver={() => handleMouseOver(link.id)}
          onMouseLeave={handleMouseLeave}
        >
          {link.icon}
          {link.text}
          <IoIosArrowDown
            style={{
              transform:
                activeDropDown === link.id ? "rotate(180deg)" : "rotate(0)",
              transition: "200ms",
            }}
          />
          <div
            className={`dropDown  ${
              activeDropDown === link.id ? "showDropDown" : ""
            }`}
          >
            {link.links.map((subLink, subIndex) => (
              <Link key={subIndex} to={subLink.to}>
                {subLink.icon}
                {subLink.text}
              </Link>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Links;
