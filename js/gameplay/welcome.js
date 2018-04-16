import {stringToElement, renderNextScreen} from '../util';
import {initialState as initial} from "../data/game-data";

export default (content) => {
  const html = `
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">${content.rules.heading}</h2>
    <p class="text main-text">${content.rules.text}</p>
  </section>`;
  const game = Object.assign({}, initial);
  const gameScreen = stringToElement(html);
  gameScreen.querySelector(`.main-play`).onclick = () => {
    renderNextScreen(game);
  };

  return gameScreen;
};
