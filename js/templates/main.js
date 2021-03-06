import artistAnswers from './artist-answer';
import genreAnswers from './genre-answer';
import {QuestionType} from '../data/game-data';

export default (level) => {
  const content = level.type === QuestionType.ARTIST
    ?
    `${artistAnswers(level)}`
    :
    `${genreAnswers(level.answers)}`;
  return `
    <div class="main-wrap">
      <h2 class="title main-title">${level.question}</h2>
      ${content}
    </div>
  </section>`.trim();
};
