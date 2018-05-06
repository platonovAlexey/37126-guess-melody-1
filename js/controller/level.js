import {processUserAnswer, QuestionType, MISTAKES_ALLOWED} from "../data/game-data";
import {showScreen} from '../util';
import App from '../application';
import GenreView from '../view/genre-view';
import ArtistView from '../view/artist-view';
import timer from '../timer';

class Level {
  init(game) {
    this.game = game;
    timer.time = this.game.time;
    if (!timer.isOn) {
      timer.start();
    }
    this.level = App.levels[this.game.currentLevel];
    if (!this.level || this.game.mistakes > MISTAKES_ALLOWED) {
      App.showResult(this.game);
      return;
    }
    this._setView();
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

  _setView() {
    this.view
        = this.level.type === QuestionType.ARTIST
        ?
        new ArtistView(this.game, this.level)
        :
        new GenreView(this.game, this.level);
  }
}

export default new Level();
