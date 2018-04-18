import artist from './gameplay/artist';
import genre from './gameplay/genre';
import loss from './gameplay/loss';
import win from './gameplay/win';
import {ARTIST_LEVEL, SCREENS as screen, MISTAKES_ALLOWED, LEVELS} from "./data/game-data";

const SECONDS_PER_MINUTE = 60;
const appContainer = document.querySelector(`.app`);

export const stringToElement = (str) => {
  const template = document.createElement(`template`);
  template.innerHTML = str;
  return template.content.firstElementChild;
};

export const showScreen = (view) => {
  appContainer.replaceChild(view.element, appContainer.querySelector(`.main`));
};

export const isAnswerPresent = (elements) => {
  return elements.some((element) => {
    return element.checked;
  });
};

export const renderNextScreen = (game) => {
  const level = LEVELS[game.currentLevel];
  if (game.time === 0) {
    return showScreen(loss(screen.timeout));
  }
  if (game.mistakes > MISTAKES_ALLOWED) {
    return showScreen(loss(screen.attempts));
  }
  if (game.isComplete) {
    return showScreen(win(screen.winner, game));
  }
  return level.type === ARTIST_LEVEL ? showScreen(artist(game, level)) : showScreen(genre(game, level));
};

export const getMinutes = (time, leadZero = false) => {
  const minutes = Math.floor(time / SECONDS_PER_MINUTE);
  if (leadZero) {
    return minutes < 10 ? `0${minutes}` : minutes;
  }
  return minutes;
};

export const getSeconds = (time, leadZero = false) => {
  const seconds = time % SECONDS_PER_MINUTE;
  if (leadZero) {
    return seconds < 10 ? `0${seconds}` : seconds;
  }
  return seconds;
};
