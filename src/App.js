import React, { Component } from "react";
import Clock from "./component/clock";
import Panel from "./component/panel";
import InputSession from "./component/inputSession";
import InputBreak from "./component/inputBreak";
import "./style/clock.css";
import "./style/input.css";
import "./style/App.css";
class App extends Component {
  state = {
    status: "Prepare",
    isClockRunning: false,
    breakMinute: 5,
    sessionMinute: 25,
    timer: 0,
  };
  timeInterval;
  timeOutInterval;
  tempStatus = "Session";
  componentDidMount() {
    this.setState({ timer: this.state.sessionMinute * 60 });
  }
  handleDecrease = (type) => {
    if (!this.state.isClockRunning) {
      if (type === "break") {
        this.decreaseBreak();
      } else {
        this.decreaseSession();
      }
    }
  };
  handleIncrease = (type) => {
    if (!this.state.isClockRunning) {
      if (type === "break") {
        this.increaseBreak();
      } else {
        this.increaseSession();
      }
    }
  };
  handleStart = () => {
    let status = this.state.status;
    let isClockRunning = this.state.isClockRunning;

    if (!isClockRunning) {
      isClockRunning = true;
      status = this.tempStatus;
      this.timeInterval = setInterval(() => this.countDown(), 1000);
    } else {
      isClockRunning = false;
      status = "Pause";
      clearInterval(this.timeInterval);
    }
    console.log(this.tempStatus);
    this.setState({ status, isClockRunning });
  };
  handleReset = () => {
    clearInterval(this.timeInterval);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.setState({
      isClockRunning: false,
      status: "Prepare",
      sessionMinute: 25,
      breakMinute: 5,
      timer: 25 * 60,
    });
  };
  handleProgress = () => {
    let breakPro = this.state.timer / (this.state.breakMinute * 60);
    let sessPro = this.state.timer / (this.state.sessionMinute * 60);
    return this.state.status === "Break"
      ? { strokeDashoffset: `calc(1238 - (1238 * ${breakPro}))` }
      : { strokeDashoffset: `calc(1238 - (1238 * ${sessPro}))` };
  };

  render() {
    return (
      <div className="app-wrapper">
        <Clock
          timer={this.timeFormat()}
          status={this.state.status}
          onProgress={this.handleProgress()}
        />
        <div className="input-wrap my-3">
          <InputSession
            minute={this.state.sessionMinute}
            onIncrease={this.handleIncrease}
            onDecrease={this.handleDecrease}
          />
          <InputBreak
            minute={this.state.breakMinute}
            onIncrease={this.handleIncrease}
            onDecrease={this.handleDecrease}
          />
        </div>

        <Panel
          icon={this.playPauseButton(this.state.isClockRunning)}
          onStart={this.handleStart}
          onReset={this.handleReset}
        />
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
  countDown = () => {
    let status = this.state.status;
    let timer = this.state.timer;
    timer -= 1;
    if (timer <= 0 && status === "Session") {
      clearInterval(this.timeInterval);
      this.timeOutInterval = setTimeout(() => {
        timer = this.state.breakMinute * 60;
        this.setState({ timer });
        this.timeInterval = setInterval(() => this.countDown(), 1000);
      }, 1000);
      this.audioBeep.play();
      // timer = this.state.breakMinute * 60;
      status = "Break";
      this.tempStatus = "Break";
    } else if (timer <= 0 && status === "Break") {
      clearInterval(this.timeInterval);
      this.timeOutInterval = setTimeout(() => {
        timer = this.state.sessionMinute * 60;
        this.setState({ timer });
        this.timeInterval = setInterval(() => this.countDown(), 500);
      }, 500);
      this.audioBeep.play();
      // timer = this.state.sessionMinute * 60;
      status = "Session";
      this.tempStatus = "Session";
    }
    console.log(this.tempStatus);
    this.setState({ timer, status });
  };

  //TODO: time format
  timeFormat = () => {
    let minute = Math.floor(this.state.timer / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = this.state.timer % 60;
    second = second < 10 ? "0" + second : second;
    return minute + ":" + second;
  };
  playPauseButton = (isClockRunning) =>
    !isClockRunning ? (
      <i class="fas fa-play"></i>
    ) : (
      <i class="fas fa-pause"></i>
    );

  decreaseSession() {
    let sessionMinute = this.state.sessionMinute;
    if (sessionMinute > 1) {
      sessionMinute--;
      this.setState({ timer: sessionMinute * 60, sessionMinute });
    }
  }

  decreaseBreak() {
    let breakMinute = this.state.breakMinute;
    if (breakMinute > 1) {
      breakMinute--;
      this.setState({ breakMinute });
    }
  }
  increaseSession() {
    let sessionMinute = this.state.sessionMinute;
    if (sessionMinute < 60) {
      sessionMinute++;
      this.setState({ timer: sessionMinute * 60, sessionMinute });
    }
  }

  increaseBreak() {
    let breakMinute = this.state.breakMinute;
    if (breakMinute < 60) {
      breakMinute++;
      this.setState({ breakMinute });
    }
  }
}

export default App;
