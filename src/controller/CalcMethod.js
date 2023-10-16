"use strict"


class CalcMethod {

  constructor(calcMethodElement) {
    this.calcMethodElement = calcMethodElement;
  }


  init() {
    let buttons = this.calcMethodElement.querySelectorAll('button')
    buttons.forEach(btn => {
      btn.addEventListener('click', event => {
        this.deactivateOthers(event.target.id)
      })
    })
  }


  deactivateOthers(id) {
    let buttons = this.calcMethodElement.querySelectorAll('button')
    buttons.forEach(btn => {
      const status = btn.getAttribute("aria-pressed")
      if ((btn.id !== id) && (status === 'true')){
        new bootstrap.Button(btn).toggle()
      }
    })
  }
}


export default CalcMethod;