import {stringToElement, renderNextScreen} from '../util';
import getHeader from '../templates/header';
import getContent from '../templates/main';
import {processUserAnswer} from "../data/game-data";
import {bindPlayerEvents} from "../templates/player";

export default (data, level) => {
  const html = `
  ${getHeader(data)}
  ${getContent(level)}`;
  const gameScreen = stringToElement(html);
  const answersForm = gameScreen.querySelector(`.main-list`);

  bindPlayerEvents(gameScreen);
  answersForm.onclick = (evt) => {
    if (evt.target.className === `main-answer-r`) {
      const isCorrectAnswer = evt.target.value === `true`;
      const dataUpdate = processUserAnswer(isCorrectAnswer, data);
      renderNextScreen(dataUpdate);
    }
  };

  return gameScreen;
};
