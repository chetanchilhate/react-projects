import React, { useState } from "react";
import { MdOutlineCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import "./FreezeCheckbox.css";

const FreezeCheckbox = ({ onFreeze }) => {
  const [isFrozen, setIsFrozen] = useState(false);

  const handleFreezeClick = () => {
    setIsFrozen((isFrozen) => !isFrozen);
    onFreeze();
  };

  return (
    <div className="md-checkbox">
      {isFrozen ? (
        <MdOutlineCheckBox onClick={handleFreezeClick} />
      ) : (
        <MdCheckBoxOutlineBlank onClick={handleFreezeClick} />
      )}
    </div>
  );
};

export default FreezeCheckbox;
