import {stringToElement, showScreen} from '../util';
import {SCREENS as screen} from "../data/game-data";
import welcome from './welcome';

export default (content) => {
  const html = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${content.heading}</h2>
    <div class="main-stat">${content.message}</div>
    <span role="button" tabindex="0" class="main-replay">${content.button}</span>
  </section>`;

  const gameScreen = stringToElement(html);
  gameScreen.querySelector(`.main-replay`).onclick = () => {
    showScreen(welcome(screen.welcome));
  };
  return gameScreen;
};
