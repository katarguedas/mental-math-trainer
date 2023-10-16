"use strict"

import CalcMethod from './controller/CalcMethod';


const calcMethod = new CalcMethod(
  document.getElementById("calc-method-buttons")
);

calcMethod.init();

// calcMethod.getBtnActive()