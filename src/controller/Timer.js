"use strict"

import EventEmitter from 'eventemitter3';
import { Duration } from "luxon";

class Timer {
  constructor(timerElement) {
    this.timerElement = timerElement;
    this.time = {
      'one-minute': 1 * 60,
      'two-minutes': 2 * 60,
      'three-minutes': 3 * 60,
    }
    this.showTimer;
    this.events = new EventEmitter();
  }

  runTimer(duration) {
    // let time = this.time[duration];
    let time=6
    this.timerElement.innerText = this.getDur(time);
    time = time - 1;
    this.showTimer = setInterval(() => {
      this.timerElement.innerText = this.getDur(time)
      time--;
      if (time < 0) {
        this.stopTimer()
        this.events.emit('timeout');
      }
    }, 1000)

  }
  stopTimer(time) {
    clearInterval(this.showTimer);
  }

  getDur(time) {
    let min = Math.ceil(time / 60) - 1;
    let seconds = time - min * 60;
    return Duration.fromObject({ minutes: min, seconds: seconds }).toFormat("mm:ss")
  }
}


export default Timer;