import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "./NavButton.css";

const NavButton = ({ navActive, handleLeftNavClick, handleRightNavClick }) => {
  return (
    <div className="nav-btn-container">
      <FaArrowCircleLeft
        className={navActive.left ? "nav-btn-active" : "nav-btn"}
        onClick={handleLeftNavClick}
      />
      <FaArrowCircleRight
        className={navActive.right ? "nav-btn-active" : "nav-btn"}
        onClick={handleRightNavClick}
      />
    </div>
  );
};

export default NavButton;
