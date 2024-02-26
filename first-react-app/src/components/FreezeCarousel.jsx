import { useState } from "react";

import FreezeCheckox from "./FreezeCheckbox";
import NavButton from "./NavButton";

import "./FreezeCarousel.css";

const FreezeCarousel = ({ items, carouselSize }) => {
  const NAV_DIRECTION = {
    LEFT: -1,
    RIGHT: 1,
  };

  const INIT_CAROUSEL = {
    array: items.slice(1),
    cards: items.slice(1, carouselSize + 1),
    current: 0,
    fixCard: items[0],
    freezeCard: null,
    frezzeArray: [],
    frezzeCurrent: 0,
  };

  const [carousel, setCarousel] = useState(INIT_CAROUSEL);

  const handleNavClick = (direction) => {
    const { array, current, cards, freezeCard, frezzeArray, frezzeCurrent } =
      carousel;
    const next = current + direction;

    if (next < 0 || next > array.length - cards.length) {
      return;
    }

    if (freezeCard) {
      const nextFreeze = frezzeCurrent + direction;
      setCarousel({
        ...carousel,
        cards: [freezeCard, ...frezzeArray.slice(nextFreeze)].slice(
          0,
          carouselSize
        ),
        current: next,
        frezzeCurrent: nextFreeze,
      });
      return;
    }

    setCarousel({
      ...carousel,
      cards: array.slice(next, next + carouselSize),
      current: next,
    });
  };

  const handleFreeze = () => {
    const { array, current, freezeCard } = carousel;
    if (freezeCard) {
      setCarousel({
        ...carousel,
        cards: array.slice(current, current + carouselSize),
        freezeCard: null,
        frezzeArray: [],
        frezzeCurrent: 0,
      });
    } else {
      const newFreezeArray = array.filter((item) => item !== array[current]);
      setCarousel({
        ...carousel,
        freezeCard: array[current],
        frezzeArray: newFreezeArray,
        frezzeCurrent: newFreezeArray.indexOf(array[current + 1]),
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="content">{carousel.fixCard}</div>
        </div>
        <div className="card">
          <div className="content">
            {carousel.cards[0]}
            <FreezeCheckox onFreeze={handleFreeze} />
          </div>
        </div>
        {carousel.cards.slice(1).map((item, index) => {
          return (
            <div key={index} className="card">
              <div className="content">{item}</div>
            </div>
          );
        })}
      </div>
      <NavButton
        carousel={carousel}
        onLeftNavClick={() => {
          handleNavClick(NAV_DIRECTION.LEFT);
        }}
        onRightNavClick={() => {
          handleNavClick(NAV_DIRECTION.RIGHT);
        }}
      />
    </>
  );
};

export default FreezeCarousel;
