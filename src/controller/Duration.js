"use strict"

import ButtonMethods from './ButtonMethods';
import EventEmitter from 'eventemitter3';


class Duration extends ButtonMethods {
  /**
   * 
   * @param {HTMLDivElement} durationElement 
   */
  constructor(durationElement) {
    super()
    this.durationElement = durationElement;
    this.buttons = this.durationElement.querySelectorAll('button');
    this.instruction = this.durationElement.querySelector('.instruction')

    this.events = new EventEmitter();

  }

  init() {
    this.setEventListener()
  }

}

export default Duration;