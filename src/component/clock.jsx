import React from "react";

const Clock = ({ timer, status, onProgress }) => {
  return (
    <div className="timer">
      <svg width="" height="">
        <circle class="progress-b-ring" r="197" cx="0" cy="0" />
        <circle
          class="progress-ring"
          r="197"
          cx="0"
          cy="0"
          style={onProgress}
        />
      </svg>
      <div
        className="timer-wrapper"
        style={
          status === "Break"
            ? { color: " #79e3b6" }
            : status === "Pause"
            ? { color: " #ffb3ba" }
            : { color: " #9a9a9a" }
        }
      >
        <div id="timer-label">{status}</div>
        <div id="time-left">{timer}</div>
      </div>
    </div>
  );
};

export default Clock;
