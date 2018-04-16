import {stringToElement, renderNextScreen, isAnswerPresent} from '../util';
import getHeader from '../templates/header';
import getContent from '../templates/main';
import {processUserAnswer, isSelectedCorrect} from "../data/game-data";
import {bindPlayerEvents} from "../templates/player";

export default (data, level) => {
  const html = `
  ${getHeader(data)}
  ${getContent(level)}`;
  const gameScreen = stringToElement(html);
  const checkboxes = Array.from(gameScreen.getElementsByTagName(`input`));
  const submit = gameScreen.querySelector(`.genre-answer-send`);
  bindPlayerEvents(gameScreen);
  checkboxes.forEach((it) => {
    it.onchange = () => {
      submit.disabled = !isAnswerPresent(checkboxes);
    };
  });
  submit.onclick = (evt) => {
    evt.preventDefault();
    const isCorrectAnswer = isSelectedCorrect(checkboxes);
    const dataUpdate = processUserAnswer(isCorrectAnswer, data);
    renderNextScreen(dataUpdate);
  };

  return gameScreen;
};
