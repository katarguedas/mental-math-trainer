"use strict"

import CalcMethod from './controller/CalcMethod';
import Level from './controller/Level';
import Duration from './controller/Duration';


const calcMethod = new CalcMethod(
  document.getElementById('calc-method-buttons')
);

calcMethod.init();

const level = new Level(
  document.getElementById('level-buttons')
);

level.init();

const duration = new Duration(
  document.getElementById('duration-buttons')
);

duration.init();
