"use strict"

import EventEmitter from 'eventemitter3';


/**
 * start the game when the user clicks the 'start'Button
 */
class StartButton {
  /**
   * 
   * @param {HTMLButtonElement} button 
   * @param {HTMLParagraphElement} errorMessage 
   */
  constructor(button, errorMessage) {
    this.button = button;
    this.errorMessage = errorMessage;
    this.gameIsRunning = false;
    this.events = new EventEmitter();
  }

/**
 * put all error messages unvisible
 */
  init() {
    this.errorMessage.forEach(em => {
      em.classList.add('d-none')
    })
    this.button.addEventListener('click', event => {
      event.preventDefault()

      if (!this.gameIsRunning)
        this.events.emit('play')
    })
  }

  setGameIsRunning(state) {
    this.gameIsRunning = state;
  }

/**
 * activates arror message
 */
  errorMessageOn() {
    this.errorMessage.forEach(em => {
      if (em.classList.contains('d-none')) {
        em.classList.replace('d-none', 'd')
      }
    })
  }

  /**
   * deactivates error message
   */
  errorMessageOff() {
    this.errorMessage.forEach(em => {
      if (em.classList.contains('d')) {
        em.classList.replace('d', 'd-none')
      }
    })
  }

  /**
   * 
   * @param {string} method 
   * @param {string} level 
   * @param {string} duration 
   * @returns boolean
   */
  selectionCheck(method, level, duration) {
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