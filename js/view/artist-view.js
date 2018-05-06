import AbstractView from './abstract-view';
import {bindPlayerEvents} from "../templates/player";
import getHeader from '../templates/header';
import getContent from '../templates/main';
import {getMinutes, getSeconds} from "../util";
import {ALARM_TIME} from "../data/game-data";

export default class ArtistView extends AbstractView {
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
    const answersForm = this.element.querySelector(`.main-list`);
    answersForm.onclick = (evt) => {
      const target = evt.target;
      if (target.className === `main-answer-r`) {
        const isCorrectAnswer = target.value === `true`;
        this.onAnswer(isCorrectAnswer, this.data);
      }
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
