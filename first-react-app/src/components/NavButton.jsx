import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "./NavButton.css";

const NavButton = ({ carousel, onLeftNavClick, onRightNavClick }) => {
  const leftNavActive = () => {
    const { current } = carousel;
    return current > 0 ? "nav-btn-active" : "nav-btn";
  };

  const rightNavActive = () => {
    const { array, current, cards } = carousel;
    return current < array.length - cards.length ? "nav-btn-active" : "nav-btn";
  };

  return (
    <div className="nav-btn-container">
      <FaArrowCircleLeft className={leftNavActive()} onClick={onLeftNavClick} />
      <FaArrowCircleRight
        className={rightNavActive()}
        onClick={onRightNavClick}
      />
    </div>
  );
};

export default NavButton;
