"use strict"

import EventEmitter from 'eventemitter3';

class StartButton {
  constructor(button, errorMessage) {
    this.button = button;
    this.errorMessage = errorMessage;
    this.events = new EventEmitter();
  }


  init() {
    this.errorMessage.forEach(em => {
      em.classList.add('d-none')
    })
    this.button.addEventListener('click', event => {
      event.preventDefault()
      // start
      this.events.emit('play')
    })
  }

  errorMessageOn() {
    this.errorMessage.forEach(em => {
      if (em.classList.contains('d-none')) {
        em.classList.replace('d-none', 'd')
      }
    })
  }
  errorMessageOff() {
    this.errorMessage.forEach(em => {
      if (em.classList.contains('d')) {
        em.classList.replace('d', 'd-none')
      }
    })
  }


  selectionCheck(method, level, duration){
    if ((method === "") || (level === "") || (duration === "")) {
      this.errorMessageOn()
      return false
    } else {
      this.errorMessageOff()
      return true
    }
  }

}

export default StartButton;