"use strict"


class Counter {
  constructor(correctTaskElement, allTasksElement) {
    this.correctTaskElement = correctTaskElement;
    this.allTasksElement = allTasksElement;
    this.allTasks = 0;
    this.correctTasks = 0;
  }

  incrementTasksCounter(res) {
    if (res) {
      this.correctTasks++;
    }
    this.allTasks++;

    this.correctTaskElement.innerText = this.correctTasks;
    this.allTasksElement.innerText = this.allTasks;
  }


}


export default Counter;