"use strict"

class ButtonMethods {

  /**
   * sets eventListender to the Buttons 
   */
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

  /**
   * checks if one button is selected to be able to turn off the instructions
   */
  checkInstructions() {
    let selected = false;
    this.buttons.forEach(btn => {
      if (btn.getAttribute("aria-pressed") === 'true') {
        selected = true;
      }
    })
    selected === true ? this.instructionOff() : this.instructionOn();
  }

  /**
   * 
   * @param {string} id 
   */
  deactivateOthers(id) {
    this.buttons.forEach(btn => {
      const status = btn.getAttribute("aria-pressed")
      if ((btn.id !== id) && (status === 'true')) {
        new bootstrap.Button(btn).toggle()
      }
    })
  }

  /**
   * returns the id of the selected button
   * @param {HTMLButtonElements} buttons 
   * @returns string
   */
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

  /**
   * turn on the instructions for the buttons
   */
  instructionOn() {
    this.instruction.classList.replace('d-none', 'd')
  }

  /**
 * turn off the instructions for the buttons
 */
  instructionOff() {
    this.instruction.classList.replace('d', 'd-none')
  }

}

export default ButtonMethods;