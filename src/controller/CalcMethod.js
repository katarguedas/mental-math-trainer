"use strict"

import ButtonMethods from './ButtonMethods';


class CalcMethod extends ButtonMethods{

  constructor(calcMethodElement) {
    super()
    this.calcMethodElement = calcMethodElement;
    this.buttons = this.calcMethodElement.querySelectorAll('button');
  }


  init() {
    this.setEventListener(this.buttons)
  }

}


export default CalcMethod;