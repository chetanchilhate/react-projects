import React, { useState } from "react";
import { MdOutlineCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import "./FreezeCheckbox.css";

const FreezeCheckox = ({ handleFreezeCheckboxClick }) => {
  const [isFrozen, setIsFrozen] = useState(false);

  const handleFreezeBtnClick = () => {
    setIsFrozen(!isFrozen);
    handleFreezeCheckboxClick();
  };

  return (
    <div className="md-checkbox">
      {isFrozen ? (
        <MdOutlineCheckBox onClick={handleFreezeBtnClick} />
      ) : (
        <MdCheckBoxOutlineBlank onClick={handleFreezeBtnClick} />
      )}
    </div>
  );
};

export default FreezeCheckox;
