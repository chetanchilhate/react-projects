import { useState } from "react";

import "./App.css";
import LikeButton from "./LikeButton";

function App() {
  const [masterName, setMasterName] = useState("Chetan");

  const changeMasterName = () => {
    setMasterName("Chetan Chilhate");
  };

  return (
    <>
      <p className="read-the-docs">Your master name is {masterName}</p>
      <LikeButton handleChangeMasterName={changeMasterName} />
    </>
  );
}

export default App;
