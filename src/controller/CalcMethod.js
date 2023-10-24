"use strict"

import ButtonMethods from './ButtonMethods';
import EventEmitter from 'eventemitter3';


class CalcMethod extends ButtonMethods {
  /**
   * 
   * @param {HTMLDivElement} calcMethodElement 
   */
  constructor(calcMethodElement) {
    super()
    this.calcMethodElement = calcMethodElement;
    this.buttons = this.calcMethodElement.querySelectorAll('button');
    this.instruction = this.calcMethodElement.querySelector('.instruction')

    this.events = new EventEmitter();
  }

  init() {
    this.setEventListener()
  }


}


export default CalcMethod;