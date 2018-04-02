import getElement from '../utils/get-element';
import show from '../utils/show';
import greeting from './greeting';

const template = `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <h2 class="title">Увы и ах!</h2>
  <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`;

const el = getElement(template);
el.querySelector(`.main-replay`).addEventListener(`click`, () => {
  show(greeting);
});

export default el;
