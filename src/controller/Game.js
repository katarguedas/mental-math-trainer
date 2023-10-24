"use strict"

import EventEmitter from 'eventemitter3';

class Game {
  /**
   * 
   * @param {HTMLDivElement} gameboard 
   * @param {HTMLDivElement} counter 
   * @param {HTMLParagraphElement} tooltip 
   */
  constructor(gameboard, counter, tooltip) {
    this.gameboard = gameboard;
    this.gameCards = this.gameboard.getElementsByClassName('game-cards')
    this.elements = this.gameCards[0].querySelectorAll('span')
    this.number1 = this.elements[0]
    this.sign = this.elements[1]
    this.number2 = this.elements[2]
    this.equal = this.elements[3]
    this.resultCard = this.gameCards[0].querySelector('.game-result-card')
    this.counter = counter;
    this.toolTip = tooltip;
    this.numbers = {
      add: {
        easy: [[1, 9], [1, 19]],
        normal: [[11, 99], [11, 99]],
        hard: [[109, 300], [130, 600]]
      },
      sub: {
        easy: [[4, 9], [1, 10]],
        normal: [[20, 99], [11, 80]],
        hard: [[200, 900], [101, 199]]
      },
      mul: {
        easy: [[2, 9], [1, 10]],
        normal: [[5, 20], [6, 11]],
        hard: [[11, 25], [11, 99]]
      },
      div: {
        easy: [[4, 40], [2, 10]],
        normal: [[9, 90], [10, 80]],
        hard: [[200, 900], [20, 400]]
      }
    }
    this.gameEnd = false;
    this.paramter;
    this.input = undefined;
    this.result = undefined;
    this.events = new EventEmitter();
  }

  /**
   * 
   */
  init() {
    this.events.on('input', async (event) => {
      const res = this.input === this.result.toString() ? true : false;
      const textColor = this.input === this.result.toString() ? 'text-success' : 'text-danger';
      this.events.emit('counter', res)
      await this.finishAndStart(textColor, event)
    })
  }

  /**
   * 
   * @param {string} textColor 
   * @param {Event} event 
   */
  async finishAndStart(textColor, event) {
    if (this.gameEnd) {
      this.counterViewOff(this.counter)
      return;
    }
    this.resultCard.classList.replace('text-dark', textColor)
    setTimeout(() => {
      this.elements.forEach(e => e.innerText = "");
      this.resultCard.classList.replace(textColor, 'text-dark');
      event.target.value = "";
      this.play(this.parameter.method, this.parameter.level)
    }, 150)
  }

  /**
   * sets an eventListener to the 'result-input-card'
   * and emits an event after entering an user input
   */
  setEventListener() {
    this.resultCard.addEventListener('keydown', event => {
      if (event.keyCode === 13) {
        if (event.target.value === "") {
          this.showTooltip()
        } else {
          this.input = event.target.value
          this.events.emit('input', event)
        }
      }
    }, true)
  }

  /**
   * shows an information when the iputfield was sended without input
   */
  showTooltip() {
    console.log(this.toolTip)
    this.toolTip.classList.replace('d-none', 'd')
    setTimeout(() => {
      this.toolTip.classList.replace('d', 'd-none')
    }, 1200)
  }

  /**
   * stops and terminate the game
   */
  stop() {
    this.gameEnd = true;
    this.counterViewOff(this.counter)
    this.elements.forEach(e => e.innerText = "");
    this.resultCard.value = "";
    this.resultCard.setAttribute('disabled', "");
  }

  /**
   * starts the game according to the user parameter
   * @param {string} method 
   * @param {string} level 
   * @param {boolean} isFirst (optional)
   * @returns 
   */
  play(method, level, isFirst = false) {
    this.parameter = {
      method: method,
      level: level
    }
    if (this.gameEnd) {
      this.counterViewOff(this.counter)
      return;
    }
    if (isFirst) {
      setTimeout(() => { }, 500)
    }
    this.resultCard.value = ""
    this.counterViewOn(this.counter)
    this.resultCard.classList.add('text-dark')
    this.resultCard.focus()

    switch (this.parameter.method) {
      case "add":
        this.addition(this.numbers.add[this.parameter.level]);
        break;
      case "sub":
        this.subtraction(this.numbers.sub[this.parameter.level]);
        break;
      case "mul":
        this.multiplication(this.numbers.mul[this.parameter.level]);
        break;
      case "div":
        this.division(this.numbers.div[this.parameter.level]);
        break;
    }
  }


  /**
   * shows the counter
   * @param {HTMLDivElement} element 
   */
  counterViewOn(element) {
    if (element.classList.contains('d-none')) {
      element.classList.replace('d-none', 'd')
    }
  }

  /**
   * 
   * @param {HTMLDivElement} element 
   */
  counterViewOff(element) {
    if (element.classList.contains('d')) {
      element.classList.replace('d', 'd-none')
    }
  }

  /**
   * create a random number according to the selected difficult level and calculation method
   * @param {Object} numbers 
   * @param {number} index 
   * @returns 
   */
  getRandomNumber(numbers, index) {
    return Math.floor((Math.random() * numbers[index][1]) + numbers[index][0]);
  }

  /**
   * 
   * @param {Object} numbers 
   */
  addition(numbers) {
    let number1 = this.getRandomNumber(numbers, 0);
    let number2 = this.getRandomNumber(numbers, 1);
    const sign = '0x002B';
    this.setCards(number1, number2, sign);
    this.result = number1 + number2;
  }

  subtraction(numbers) {
    let number1, number2;
    do {
      number1 = this.getRandomNumber(numbers, 0);
      number2 = this.getRandomNumber(numbers, 1);
    } while ((number1 < number2) || (number1 === number2))
    const sign = '0x2212';
    this.setCards(number1, number2, sign);
    this.result = number1 - number2;
  }

  multiplication(numbers) {
    let number1 = this.getRandomNumber(numbers, 0);
    let number2 = this.getRandomNumber(numbers, 1);
    const sign = '0x00D7';
    this.setCards(number1, number2, sign);
    this.result = number1 * number2;
  }

  division(numbers) {
    let number1, number2;
    do {
      number1 = this.getRandomNumber(numbers, 0);
      number2 = this.getRandomNumber(numbers, 1);
    } while (((number1 % number2) !== 0) || (number1 === number2))

    const sign = '0x00F7';
    this.setCards(number1, number2, sign);
    this.result = number1 / number2;
  }

  /**
   * 
   * @param {number} number1 
   * @param {number} number2 
   * @param {string} sign 
   */
  setCards(number1, number2, sign) {
    this.number1.innerText = number1
    this.sign.innerText = String.fromCharCode(sign)
    this.number2.innerText = number2
    this.equal.innerText = '='
  }
}

export default Game;