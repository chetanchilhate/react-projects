import { useState } from "react";
import "./App.css";
import FreezeCheckox from "./components/FreezeCheckbox";
import NavButton from "./components/NavButton";

function App() {
  const array = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
  ];

  const [current, setCurrent] = useState(1);
  const [carousel, setCarousel] = useState(array.slice(current, current + 2));

  const NAV_SIZE = array.length - carousel.length;
  const INTIAL_FREEZE_CAROUSEL = { arr: [], index: 0 };

  const fixedCard = array[0];
  const [freezeCard, setFreezeCard] = useState(null);
  const [freezeCarousel, setFreezeCarousel] = useState(INTIAL_FREEZE_CAROUSEL);

  const handleLeftNavClick = () => {
    if (current >= carousel.length) {
      setCurrent(current - 1);
      setCarousel(array.slice(current - 1, current + 1));
      if (freezeCard) {
        const { arr, index } = freezeCarousel;
        setCarousel([freezeCard, ...arr.slice(index - 1, index)]);
        setFreezeCarousel({ arr, index: index - 1 });
      }
    }
  };

  const handleRightNavClick = () => {
    if (current + carousel.length < array.length) {
      setCurrent(current + 1);
      setCarousel(array.slice(current + 1, current + 3));
      if (freezeCard) {
        const { arr, index } = freezeCarousel;
        setCarousel([freezeCard, ...arr.slice(index + 1, index + 2)]);
        setFreezeCarousel({ arr, index: index + 1 });
      }
    }
  };

  const handleFreezeCheckboxClick = () => {
    if (freezeCard) {
      setCarousel(array.slice(current, current + 2));
      setFreezeCard(null);
      setFreezeCarousel(INTIAL_FREEZE_CAROUSEL);
    } else {
      setFreezeCard(carousel[0]);
      const filterValue = [fixedCard, carousel[0]];
      const freezeCarouselArr = array.filter(
        (item) => !filterValue.includes(item)
      );
      const freezeCarouselIndex = freezeCarouselArr.indexOf(carousel[1]);
      setFreezeCarousel({ arr: freezeCarouselArr, index: freezeCarouselIndex });
    }
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="content">{fixedCard}</div>
        </div>
        <div className="card">
          <div className="content">
            {carousel[0]}
            <FreezeCheckox
              handleFreezeCheckboxClick={handleFreezeCheckboxClick}
            />
          </div>
        </div>
        <div className="card">
          <div className="content">{carousel[1]}</div>
        </div>
      </div>
      <NavButton
        navSize={NAV_SIZE}
        handleLeftNavClick={handleLeftNavClick}
        handleRightNavClick={handleRightNavClick}
      />
    </>
  );
}

export default App;
