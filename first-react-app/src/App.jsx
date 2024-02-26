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

  const navActive = {
    left: true,
    right: true,
  };

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

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="content">{carousel.fixCard}</div>
        </div>
        <div className="card">
          <div className="content">
            {carousel.cards[0]}
            <FreezeCheckox
              onFreeze={() => {
                console.log("freeze");
              }}
            />
          </div>
        </div>
        <div className="card">
          <div className="content">{carousel.cards[1]}</div>
        </div>
      </div>
      <NavButton
        navActive={navActive}
        handleLeftNavClick={() => {
          console.log("left");
        }}
        handleRightNavClick={() => {
          console.log("right");
        }}
      />
    </>
  );
}

export default App;
