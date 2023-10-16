"use strict"


class Level {
  constructor(levelElement) {
    this.levelElement = levelElement;
    this.buttons = this.levelElement.querySelectorAll('button');
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', event => {
        this.deactivateOthers(event.target.id)
      })
    })
  }

  deactivateOthers(id) {
    this.buttons.forEach(btn => {
      const status = btn.getAttribute("aria-pressed")
      if ((btn.id !== id) && (status === 'true')) {
        new bootstrap.Button(btn).toggle()
      }
    })
  }
}
export default Level;