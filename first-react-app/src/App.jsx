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

  const navActive = {
    left: true,
    right: true,
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="content">Fix</div>
        </div>
        <div className="card">
          <div className="content">
            Frezze
            <FreezeCheckox
              onFreeze={() => {
                console.log("freeze");
              }}
            />
          </div>
        </div>
        <div className="card">
          <div className="content">Moving</div>
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
