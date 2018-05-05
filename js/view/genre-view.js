import AbstractView from './view';
import {isAnswerPresent} from '../util';
import {isSelectedCorrect, ALARM_TIME} from '../data/game-data';
import {bindPlayerEvents} from "../templates/player";
import getHeader from '../templates/header';
import getContent from '../templates/main';
import {getMinutes, getSeconds} from "../util";

export default class GenreView extends AbstractView {
  constructor(data, level) {
    super();
    this.data = data;
    this.level = level;
    this.timer = this.element.querySelector(`.timer-value`);
    this.mins = this.element.querySelector(`.timer-value-mins`);
    this.secs = this.element.querySelector(`.timer-value-secs`);
  }
  get template() {
    return `
    ${getHeader(this.data)}
    ${getContent(this.level)}`.trim();
  }
  bind() {
    const checkboxes = Array.from(this.element.getElementsByTagName(`input`));
    const submit = this.element.querySelector(`.genre-answer-send`);
    checkboxes.forEach((it) => {
      it.onchange = () => {
        submit.disabled = !isAnswerPresent(checkboxes);
      };
    });

    submit.onclick = (evt) => {
      evt.preventDefault();
      const isCorrectAnswer = isSelectedCorrect(checkboxes);
      this.onAnswer(isCorrectAnswer, this.data);
    };

    const players = this.element.querySelectorAll(`.player`);
    bindPlayerEvents(players);
  }
  onTimerTick() {
    this.mins.innerHTML = getMinutes(this.data.time, true);
    this.secs.innerHTML = getSeconds(this.data.time, true);
    if (this.data.time < ALARM_TIME) {
      this.timer.classList.add(`timer-value--finished`);
    }
  }
  onAnswer() {

  }
}
