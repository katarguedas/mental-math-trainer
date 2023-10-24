"use strict"


class Counter {
  /**
   * 
   * @param {HTMLSpanElement} correctTaskElement 
   * @param {HTMLSpanElement} allTasksElement 
   */
  constructor(correctTaskElement, allTasksElement) {
    this.correctTaskElement = correctTaskElement;
    this.allTasksElement = allTasksElement;
    this.allTasks = 0;
    this.correctTasks = 0;
  }

  /**
   * 
   * @param {boolean} res 
   */
  incrementTasksCounter(res) {
    if (res) {
      this.correctTasks++;
    }
    this.allTasks++;

    this.correctTaskElement.innerText = this.correctTasks;
    this.allTasksElement.innerText = this.allTasks;
  }


  /**
   * 
   * @returns Object which contains the results: number of corrected Tasks and all done tasks
   */
  getResult() {
    //
    const res = {
      correct: this.correctTasks,
      all: this.allTasks
    }
    return res
  }

}


export default Counter;