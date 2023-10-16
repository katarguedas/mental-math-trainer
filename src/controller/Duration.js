"use strict"

import ButtonMethods from './ButtonMethods';


class Duration extends ButtonMethods{
  
  constructor(durationElement) {
    super()
    this.durationElement = durationElement;
    this.buttons = this.durationElement.querySelectorAll('button');
  }

  init() {
    this.setEventListener(this.buttons)
  }

}

export default Duration;