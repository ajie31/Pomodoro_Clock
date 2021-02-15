import React from "react";

const InputBreak = ({ minute, onIncrease, onDecrease }) => {
  return (
    <div className="input d-flex justify-content-end align-items-start flex-wrap">
      <div className="button-label-wrap">
        <button
          id="break-increment"
          className="btn-Level"
          onClick={() => onIncrease("break")}
        >
          <i class="fas fa-plus"></i>
        </button>
        <div className="label-wrap">
          <div
            id="break-label"
            className="label col-sm-12"
            style={{ textAlign: "center" }}
          >
            Break
          </div>
          <div
            className="d-flex justify-content-center align-items-center"
            id="break-length"
          >
            {minute}
          </div>
        </div>
        <button
          id="break-decrement"
          className="btn-Level"
          onClick={() => onDecrease("break")}
        >
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>
  );
};

export default InputBreak;
