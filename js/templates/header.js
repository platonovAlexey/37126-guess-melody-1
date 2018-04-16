import {getMinutes, getSeconds} from "../util";

const WRONG_ANSWER_TMPL = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

export default (state) =>`
  <section class="main main--level main--level-artist">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${getMinutes(state.time, true)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${getSeconds(state.time, true)}</span>
      </div>
    </svg>
    <div class="main-mistakes">
      ${new Array(state.mistakes).fill(WRONG_ANSWER_TMPL).join(``)}
    </div>`;
