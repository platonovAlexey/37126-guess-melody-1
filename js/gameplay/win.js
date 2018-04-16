import {stringToElement, showScreen, getMinutes, getSeconds} from '../util';
import {SCREENS as screen, getScore, getMessage, getFastAnswers} from "../data/game-data";
import welcome from './welcome';

export default (content, game) => {
  const totalScore = getScore(game.userAnswers);
  const totalMistakes = game.mistakes;
  const result = {
    score: totalScore,
    time: game.time,
    mistakes: totalMistakes,
    fast: getFastAnswers(game.userAnswers),
    statMessage: getMessage([], {
      score: totalScore,
      mistakes: totalMistakes
    })
  };
  const html = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${content.heading}</h2>
    <div class="main-stat">За&nbsp;${getMinutes(result.time)}&nbsp;минуты и ${getSeconds(result.time)}&nbsp;секунд
      <br>вы&nbsp;набрали ${result.score} баллов (${result.fast} быстрых)
      <br>совершив ${result.mistakes} ошибки</div>
    <span class="main-comparison">${result.statMessage}</span>
    <span role="button" tabindex="0" class="main-replay">${content.button}</span>
  </section>`;

  const gameScreen = stringToElement(html);
  gameScreen.querySelector(`.main-replay`).onclick = () => {
    showScreen(welcome(screen.welcome));
  };

  return gameScreen;
};
