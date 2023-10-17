"use strict"

import CalcMethod from './controller/CalcMethod';
import Level from './controller/Level';
import Duration from './controller/Duration';
import StartButton from './controller/StartButton';


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

const start = new StartButton(
  document.getElementById('start')
);

start.init();

start.events.on('play', () => {
  const method = calcMethod.getSelectedBtn();
  const diffLevel = level.getSelectedBtn();
  const playDuration = duration.getSelectedBtn();
  console.log("method:", method)
  console.log("diffLevel:", diffLevel)
  console.log("playDuration:", playDuration)
  // play(method, diffLevel, playDuration)
})