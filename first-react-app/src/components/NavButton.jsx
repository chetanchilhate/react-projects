import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "./NavButton.css";

const NavButton = ({ navSize, handleLeftNavClick, handleRightNavClick }) => {
  const [navCount, setNavCount] = useState(1);

  const handleLeftClick = () => {
    setNavCount(navCount - 1);
    handleLeftNavClick();
  };

  const handleRightClick = () => {
    setNavCount(navCount + 1);
    handleRightNavClick();
  };

  return (
    <div className="nav-btn-container">
      <FaArrowCircleLeft
        className={navCount > 1 ? "nav-btn-active" : "nav-btn"}
        onClick={handleLeftClick}
      />
      <FaArrowCircleRight
        className={navCount < navSize ? "nav-btn-active" : "nav-btn"}
        onClick={handleRightClick}
      />
    </div>
  );
};

export default NavButton;
