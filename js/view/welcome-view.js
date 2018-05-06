import {SCREENS} from "../data/game-data";
import AbstractView from './abstract-view';

export default class WelcomeView extends AbstractView {
  constructor() {
    super();
    this.content = SCREENS.welcome;
  }
  get template() {
    return `
    <section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">${this.content.rules.heading}</h2>
      <p class="text main-text">${this.content.rules.text}</p>
    </section>`.trim();
  }
  bind() {
    const playButton = this.element.querySelector(`.main-play`);
    playButton.onclick = () => {
      this.onStart();
    };
  }
  onStart() {

  }
}
