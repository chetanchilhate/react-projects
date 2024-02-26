import { useState } from "react";
import "./App.css";
import FreezeCheckox from "./components/FreezeCheckbox";
import NavButton from "./components/NavButton";

function App() {
  const items = [
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

  const NAV_DIRECTION = {
    LEFT: -1,
    RIGHT: 1,
  };

  const INIT_CAROUSEL = {
    array: items.slice(1),
    cards: items.slice(1, 3),
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
        cards: [freezeCard, ...frezzeArray.slice(nextFreeze)].slice(0, 2),
        current: next,
        frezzeCurrent: nextFreeze,
      });
      return;
    }

    setCarousel({
      ...carousel,
      cards: array.slice(next, next + 2),
      current: next,
    });
  };

  const handleFreeze = () => {
    const { array, current, freezeCard } = carousel;
    if (freezeCard) {
      setCarousel({
        ...carousel,
        cards: array.slice(current, current + 2),
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
        <div className="card">
          <div className="content">{carousel.cards[1]}</div>
        </div>
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
}

export default App;
