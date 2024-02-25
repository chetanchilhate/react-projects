import { useState } from "react";
import "./App.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { MdOutlineCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

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

  const INTIAL_FREEZE_CAROUSEL = { arr: [], index: 0 };

  const [freezeCarousel, setFreezeCarousel] = useState(INTIAL_FREEZE_CAROUSEL);

  const EMPTY = "";

  const fixedCard = array[0];

  const [freezeCard, setFreezeCard] = useState(EMPTY);

  const handleLeftClick = () => {
    if (current >= carousel.length) {
      setCurrent(current - 1);
      setCarousel(array.slice(current - 1, current + 1));
      if (freezeCard !== EMPTY) {
        const { arr, index } = freezeCarousel;
        setCarousel([freezeCard, arr[index - 1]]);
        setFreezeCarousel({ arr, index: index - 1 });
      }
    }
  };

  const handleRightClick = () => {
    if (current + carousel.length < array.length) {
      setCurrent(current + 1);
      setCarousel(array.slice(current + 1, current + 3));
      if (freezeCard !== EMPTY) {
        const { arr, index } = freezeCarousel;
        setCarousel([freezeCard, arr[index + 1]]);
        setFreezeCarousel({ arr, index: index + 1 });
      }
    }
  };

  const handleFreezeBtnClick = () => {
    if (freezeCard === EMPTY) {
      setFreezeCard(carousel[0]);
      const filterValue = [fixedCard, carousel[0]];
      const freezeCarouselArr = array.filter(
        (item) => !filterValue.includes(item)
      );
      const freezeCarouselIndex = freezeCarouselArr.indexOf(carousel[1]);
      setFreezeCarousel({ arr: freezeCarouselArr, index: freezeCarouselIndex });
    } else {
      setCarousel(array.slice(current, current + 2));
      setFreezeCard(EMPTY);
      setFreezeCarousel(INTIAL_FREEZE_CAROUSEL);
    }
  };

  return (
    <>
      <div className="container">
        <div className="card">{fixedCard}</div>
        <div className="card">{carousel[0]}</div>
        <div className="card">{carousel[1]}</div>
      </div>

      <div className="nav-btn-container">
        <FaArrowCircleLeft onClick={handleLeftClick} />
        {freezeCard === EMPTY ? (
          <MdCheckBoxOutlineBlank onClick={handleFreezeBtnClick} />
        ) : (
          <MdOutlineCheckBox onClick={handleFreezeBtnClick} />
        )}
        <FaArrowCircleRight onClick={handleRightClick} />
      </div>
    </>
  );
}

export default App;
