"use strict"

import CalcMethod from './controller/CalcMethod';
import Level from './controller/Level';


const calcMethod = new CalcMethod(
  document.getElementById('calc-method-buttons')
);

calcMethod.init();

const level = new Level(
  document.getElementById('level-buttons')
);

level.init();
