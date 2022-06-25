import React from "react";

const ButtonToggle = ({toggleFunction, isOn, title}) => {
  return (
    <button
      onClick={toggleFunction}
      className={isOn ? "btn-toggle" : "btn-toggle off"}
    >
      {
        isOn ?
          <i className="fa fa-check-circle-o fa-lg"></i>
        :
          <i className="fa fa-ban fa-lg"></i>
      }
      {' '}{title}
    </button>
  );
}

export default ButtonToggle;