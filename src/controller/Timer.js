"use strict"

import EventEmitter from 'eventemitter3';
import { Duration } from "luxon";

class Timer {
  /**
   * 
   * @param {HTMLDivElement} timerElement 
   */
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

  /**
   * starts the timer and updates it each second
   * @param {string} duration 
   */
  runTimer(duration) {
    let time = this.time[duration];
    this.timerElement.innerText = this.getDur(time);
    time = time - 1;
    this.events.emit('gameIsRunning', true);

    this.showTimer = setInterval(() => {
      this.timerElement.innerText = this.getDur(time)
      time--;
      if (time < 0) {
        this.stopTimer()
        this.events.emit('timeout');
        this.events.emit('gameIsRunning', false)
      }
    }, 1000)

    /**
     * stops the timer
     */
  }
  stopTimer() {
    clearInterval(this.showTimer);
  }

  /**
   * prepares the value of 'time' in a particular format
   * @param {number} time 
   * @returns 
   */
  getDur(time) {
    let min = Math.ceil(time / 60) - 1;
    let seconds = time - min * 60;
    return Duration.fromObject({ minutes: min, seconds: seconds }).toFormat("mm:ss")
  }
}


export default Timer;