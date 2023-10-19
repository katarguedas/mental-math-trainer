"use strict"

import CalcMethod from './controller/CalcMethod';
import Level from './controller/Level';
import Duration from './controller/Duration';
import StartButton from './controller/StartButton';
import Game from './controller/Game';


const calcMethod = new CalcMethod(
  document.getElementById('calc-method')
);
calcMethod.init();

const level = new Level(
  document.getElementById('level')
);
level.init();

const duration = new Duration(
  document.getElementById('duration')
);
duration.init();

const start = new StartButton(
  document.getElementById('start-btn'),
  document.querySelectorAll('[error-message')
);
start.init();

const game = new Game(
  document.getElementById('live-calculation'),
  document.getElementById('counter'),
  document.getElementById('result-message')
);
game.init();

calcMethod.events.on('select', () => {

  start.selectionCheck(calcMethod.getSelectedBtn(calcMethod.buttons), level.getSelectedBtn(level.buttons), duration.getSelectedBtn(duration.buttons));
})

level.events.on('select', () => {
  start.selectionCheck(calcMethod.getSelectedBtn(calcMethod.buttons), level.getSelectedBtn(level.buttons), duration.getSelectedBtn(duration.buttons));
})

duration.events.on('select', () => {
  start.selectionCheck(calcMethod.getSelectedBtn(calcMethod.buttons), level.getSelectedBtn(level.buttons), duration.getSelectedBtn(duration.buttons));
})

start.events.on('play', () => {
  const method = calcMethod.getSelectedBtn(calcMethod.buttons);
  const diffLevel = level.getSelectedBtn(level.buttons);
  const gameDuration = duration.getSelectedBtn(duration.buttons);
  if (start.selectionCheck(method, diffLevel, gameDuration)) {
    game.setEventListener()
    game.play(method, diffLevel, gameDuration);
  };

})