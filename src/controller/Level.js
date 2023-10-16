"use strict"

import ButtonMethods from './ButtonMethods';


class Level extends ButtonMethods {
 
  constructor(levelElement) {
    super()
    this.levelElement = levelElement;
    this.buttons = this.levelElement.querySelectorAll('button');
  }

  init() {
    this.setEventListener(this.buttons)
  }

}
export default Level;