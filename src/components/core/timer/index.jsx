import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super();
    this.state = { time: {}, seconds: props.seconds, timeElapsed: 0, startTime: new Date()  };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  componentWillReceiveProps(oldProps, newProps) {
    var endTime = new Date();
    var timeDiff = endTime - this.state.startTime; //in ms
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    if (seconds < 10) {
      this.setState({seconds: oldProps.seconds});
      this.startTimer();
    }
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return(
      <span id="timeRem">
        00: {this.state.time.m}: {this.state.time.s}s
      </span>
    );
  }
}
