import React from "react";

const Panel = ({ icon, onStart, onReset }) => {
  return (
    <div className="timer-panel">
      <div className="panel-wrapper">
        <button id="start_stop" onClick={() => onStart()}>
          {icon}
        </button>
        <button id="reset" onClick={() => onReset()}>
          <i class="fas fa-redo-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Panel;
