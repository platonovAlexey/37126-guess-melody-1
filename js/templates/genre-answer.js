import {getMusicPlayer} from './player';

export default (answers) => `<form class="genre">
  ${[...answers].map((answer, index) => {
    return `<div class="genre-answer">
      ${getMusicPlayer(answer)}
      <input type="checkbox" name="answer" value="${answer.correct || false}" id="a-${index}">
      <label class="genre-answer-check" for="a-${index}"></label>
    </div>`;
  }).join(``)}
    <button class="genre-answer-send" type="submit" disabled>Ответить</button>
  </form>`;
