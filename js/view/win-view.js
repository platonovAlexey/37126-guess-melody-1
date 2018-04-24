import {getMinutes, getSeconds} from '../util';
import {getScore, getMessage, getFastAnswers, SCREENS} from "../data/game-data";
import AbstractView from './view';

export default class WinView extends AbstractView {
  constructor(game) {
    super();
    this.content = SCREENS.winner;
    this.game = game;
  }
  get template() {
    const totalScore = getScore(this.game.userAnswers);
    const totalMistakes = this.game.mistakes;
    const result = {
      score: totalScore,
      time: this.game.time,
      mistakes: totalMistakes,
      fast: getFastAnswers(this.game.userAnswers),
      statMessage: getMessage([], {
        score: totalScore,
        mistakes: totalMistakes
      })
    };
    return `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">${this.content.heading}</h2>
      <div class="main-stat">За&nbsp;${getMinutes(result.time)}&nbsp;минуты и ${getSeconds(result.time)}&nbsp;секунд
        <br>вы&nbsp;набрали ${result.score} баллов (${result.fast} быстрых)
        <br>совершив ${result.mistakes} ошибки</div>
      <span class="main-comparison">${result.statMessage}</span>
      <span role="button" tabindex="0" class="main-replay">${this.content.button}</span>
    </section>`.trim();
  }
  bind() {
    const replayButton = this.element.querySelector(`.main-replay`);
    replayButton.onclick = () => {
      this.onReplay();
    };
  }
  onReplay() {

  }
}
