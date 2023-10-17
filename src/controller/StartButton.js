"use strict"

import EventEmitter from 'eventemitter3';

class StartButton {
  constructor(button){
    this.button = button;
    this.events = new EventEmitter();
  }


  init(){
    this.button.addEventListener('click', event => {
      event.preventDefault()
      // start
      this.events.emit('play')
    })
  }
}

export default StartButton;