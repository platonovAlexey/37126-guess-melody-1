import {getMusicPlayer} from './player';

export default (level) => `${getMusicPlayer(level)}
<form class="main-list">
  ${[...level.answers].map((answer, index) => {
    return `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${answer.correct || false}"/>
      <label class="main-answer" for="answer-${index}">
        <img class="main-answer-preview" src="${answer.image}"
             alt="${answer.artist}" width="134" height="134">
        ${answer.artist}
      </label>
    </div>`;
  }).join(``)}
</form>`;
