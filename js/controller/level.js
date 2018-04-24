import {processUserAnswer, initialState as initial, LEVELS, ARTIST_LEVEL} from "../data/game-data";
import {showScreen} from '../util';
import App from '../application';
import GenreView from '../view/genre-view';
import ArtistView from '../view/artist-view';
import timer from '../timer';

class Level {
  init(game) {
    this.game = typeof game === `undefined` ? Object.assign({}, initial) : game;
    this.level = LEVELS[this.game.currentLevel];
    if (!this.level) {
      App.showResult(this.game);
      return;
    }
    this.setView();
    let answerTime = 0;
    showScreen(this.view);
    this.view.onAnswer = (userAnswerStatus, currentState) => {
      const stateUpdate = processUserAnswer(userAnswerStatus, currentState, answerTime);
      App.showLevel(stateUpdate);
    };
    timer.onTick = () => {
      this.view.data.time = timer.time;
      this.view.onTimerTick();
      if (timer.time === 0) {
        App.showResult(this.game);
      }
      answerTime++;
    };
  }

  setView() {
    this.view
        = this.level.type === ARTIST_LEVEL
        ?
        new ArtistView(this.game, this.level)
        :
        new GenreView(this.game, this.level);
  }
}

export default new Level();
