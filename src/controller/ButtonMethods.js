"use strict"


class ButtonMethods {


  setEventListener() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault()
        this.deactivateOthers(event.target.id)
        this.checkInstructions()
        this.events.emit('select')
      })
    })
  }

  checkInstructions() {
    let selected = false;
    this.buttons.forEach(btn => {
      if (btn.getAttribute("aria-pressed") === 'true') {
        selected = true;
      }
    })

    selected === true ? this.instructionOff() : this.instructionOn();
  }


  deactivateOthers(id) {
    this.buttons.forEach(btn => {
      const status = btn.getAttribute("aria-pressed")
      if ((btn.id !== id) && (status === 'true')) {
        new bootstrap.Button(btn).toggle()
      }
    })
  }

  getSelectedBtn(buttons) {
    let select = ""
    if (buttons) {
      buttons.forEach(btn => {
        if (btn.getAttribute('aria-pressed') === 'true') {
          select = btn.id
        }
      })
    }
    return select
  }

  instructionOn() {
    this.instruction.classList.replace('d-none', 'd')
  }

  instructionOff() {
    this.instruction.classList.replace('d', 'd-none')
  }

}

export default ButtonMethods;