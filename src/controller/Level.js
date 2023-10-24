"use strict"

import ButtonMethods from './ButtonMethods';
import EventEmitter from 'eventemitter3';

class Level extends ButtonMethods {
  /**
   * 
   * @param {HTMLDivElement} levelElement 
   */
  constructor(levelElement) {
    super()
    this.levelElement = levelElement;
    this.buttons = this.levelElement.querySelectorAll('button');
    this.instruction = this.levelElement.querySelector('.instruction');

    this.events = new EventEmitter();

  }

  init() {
    this.setEventListener()
  }

}
export default Level;