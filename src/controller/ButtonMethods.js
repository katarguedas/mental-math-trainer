"use strict"

class ButtonMethods {


  setEventListener(buttons) {
    buttons.forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault()
        this.deactivateOthers(buttons, event.target.id)
      })
    })
  }

  deactivateOthers(buttons, id) {
    buttons.forEach(btn => {
      const status = btn.getAttribute("aria-pressed")
      if ((btn.id !== id) && (status === 'true')) {
        new bootstrap.Button(btn).toggle()
      }
    })
  }

  getSelectedBtn() {
    let selected = ""
    this.buttons.forEach(btn => {
      if (btn.getAttribute('aria-pressed') === 'true') {
        selected = btn.id
      }
    })
    return selected
  }

}

export default ButtonMethods;