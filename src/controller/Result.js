"use strict"

class Result {
  /**
   * 
   * @param {HTMLDivElement} resultElement 
   */
  constructor(resultElement) {
    this.resultElement = resultElement;
    this.resValues = this.resultElement.querySelectorAll('span')
  }

  /**
   * 
   * @param {shows the result of a game} res 
   */
  plotResult(res) {
    this.resultElement.classList.replace('d-none', 'd')
    this.resValues[0].innerText = " " + res.correct + " "
    this.resValues[1].innerText = " " + res.all + " "
  }

}

export default Result