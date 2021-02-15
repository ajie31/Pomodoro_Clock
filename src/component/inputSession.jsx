import React from "react";

const InputSession = ({ minute, onIncrease, onDecrease }) => {
  return (
    <div className="input d-flex justify-content-end align-items-start flex-wrap">
      <div className="button-label-wrap">
        <button
          id="session-increment"
          className="btn-Level"
          onClick={() => onIncrease("session")}
        >
          <i class="fas fa-plus"></i>
        </button>
        <div className="label-wrap">
          <div id="session-label" className="label col-sm-12">
            Session
          </div>
          <div
            id="session-length"
            className="d-flex justify-content-center align-items-center"
          >
            {minute}
          </div>
        </div>
        <button
          id="session-decrement"
          className="btn-Level"
          onClick={() => onDecrease("session")}
        >
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>
  );
};

export default InputSession;
