"use strict"

import EventEmitter from 'eventemitter3';

class Game {
  constructor(gameboard, counter, totalResult) {
    this.gameboard = gameboard;
    this.gameCards = this.gameboard.getElementsByClassName('game-cards')
    this.elements = this.gameCards[0].querySelectorAll('span')
    this.number1 = this.elements[0]
    this.sign = this.elements[1]
    this.number2 = this.elements[2]
    this.equal = this.elements[3]
    this.resultCard = this.gameCards[0].querySelector('.game-result-card')
    this.counter = counter;
    this.totalResult = totalResult;
    this.time = {
      'one-minute': 1 * 1000 * 60,
      'two-minutes': 2 * 1000 * 60,
      'three-minutes': 3 * 1000 * 60,
    }
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
        easy: [[1, 9], [1, 9]],
        normal: [[5, 20], [6, 11]],
        hard: [[11, 25], [11, 99]]
      },
      div: {
        easy: [[2, 20], [2, 10]],
        normal: [[10, 100], [10, 80]],
        hard: [[200, 900], [20, 400]]
      }
    }
    this.parameter;
    this.input = undefined;
    this.result = undefined;
    this.events = new EventEmitter();
  }

  init() {
    this.events.on('input', async (value, event) => {
      const res = value === this.result.toString() ? true : false;
      const textColor = value === this.result.toString() ? 'text-success' : 'text-danger';
      this.events.emit('counter', res)
      await this.finishAndStart(textColor, event)
    })
  }

  async finishAndStart(textColor, event) {
    this.resultCard.classList.replace('text-dark', textColor)
    setTimeout(() => {
      this.elements.forEach(e => e.innerText = "");
      this.resultCard.classList.replace(textColor, 'text-dark');
      event.target.value = "";
      this.play(this.parameter.method, this.parameter.level, this.parameter.duration)
    }, 160)
  }

  setEventListener() {
    this.resultCard.addEventListener('keydown', event => {
      if (event.keyCode === 13) {
        this.input = event.target.value
        this.events.emit('input', this.input, event)
      }
    })
  }

  play(method, level, duration) {
    this.parameter = {
      method: method,
      level: level,
      duration: duration
    };

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


  counterViewOn(element) {
    if (element.classList.contains('d-none')) {
      element.classList.replace('d-none', 'd')
    }
  }

  createRandomNumber(numbers) {
    const num1 = Math.floor((Math.random() * numbers[0][1]) + numbers[0][0]);
    const num2 = Math.floor((Math.random() * numbers[1][1]) + numbers[1][0]);
    return { num1, num2 }
  }

  addition(numbers) {
    let number1 = this.createRandomNumber(numbers).num1;
    let number2 = this.createRandomNumber(numbers).num2;
    const sign = '0x002B';  // '0x2212' - minus; '0x00D7'; '0x00F7'
    this.setCards(number1, number2, sign);
    this.result = number1 + number2;
  }

  subtraction(numbers) {
    let number1, number2;
    do {
      number1 = this.createRandomNumber(numbers).num1;
      number2 = this.createRandomNumber(numbers).num2;
    } while ((number1 < number2) || (number1 === number2))
    const sign = '0x2212';
    this.setCards(number1, number2, sign);
    this.result = number1 - number2;
  }

  multiplication(numbers) {
    let number1, number2;
    number1 = this.createRandomNumber(numbers).num1;
    number2 = this.createRandomNumber(numbers).num2;
    const sign = '0x00D7';
    this.setCards(number1, number2, sign);
    this.result = number1 * number2;
  }

  division(numbers) {
    let number1, number2;
    do {
      number1 = this.createRandomNumber(numbers).num1;
      number2 = this.createRandomNumber(numbers).num2;
    } while (((number1 % number2) !== 0) || (number1 === number2))

    const sign = '0x00F7';
    this.setCards(number1, number2, sign);
    this.result = number1 / number2;
  }

  setCards(number1, number2, sign) {
    this.number1.innerText = number1
    this.sign.innerText = String.fromCharCode(sign)
    this.number2.innerText = number2
    this.equal.innerText = '='
  }
}

export default Game;