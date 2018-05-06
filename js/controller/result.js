import {showScreen} from '../util';
import LossView from "../view/loss-view";
import WinView from "../view/win-view";
import App from '../application';
import {SCREENS, MISTAKES_ALLOWED, TIME_TOTAL, getScore} from "../data/game-data";
import timer from '../timer';
import Loader from '../loader';

class Result {
  init(game) {
    timer.stop();
    this.game = game;
    this._setView();
    if (!this.view) {
      App.showLoader();
    } else {
      showScreen(this.view);
      this.view.onReplay = () => {
        App.showWelcome();
      };
    }
  }

  _setView() {
    if (this.game.time === 0) {
      this.view = new LossView(SCREENS.timeout);
    }
    if (this.game.mistakes > MISTAKES_ALLOWED) {
      this.view = new LossView(SCREENS.attempts);
    }
    if (this.game.isComplete) {
      const that = this;

      Result.uploadResults({
        time: TIME_TOTAL - this.game.time,
        score: getScore(this.game.userAnswers)
      });
      Result.getLeaderBoard().
          then((board) => {
            that.view = new WinView(that.game, board);
            return that.view;
          }).then((view) => {
            showScreen(view);
            view.onReplay = () => {
              App.showLevel();
            };
          });
    }
  }

  static uploadResults(data) {
    Loader.saveResults(data);
  }

  static getLeaderBoard() {
    return Loader.loadResults().then((result) => result.map((it) => it.score));
  }
}

export default new Result();
