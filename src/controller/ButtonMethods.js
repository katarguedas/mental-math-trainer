"use strict"

class ButtonMethods {
  

  setEventListener(buttons) {
    buttons.forEach(btn => {
      btn.addEventListener('click', event => {
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
}

export default ButtonMethods;