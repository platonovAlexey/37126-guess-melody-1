import {showScreen} from '../util';
import LossView from "../view/loss-view";
import WinView from "../view/win-view";
import App from '../application';
import {SCREENS, MISTAKES_ALLOWED} from "../data/game-data";

class Result {
  init(game) {
    this.game = game;
    this.setView();
    showScreen(this.view);
    this.view.onReplay = () => {
      App.showWelcome();
    };
  }

  setView() {
    if (this.game.time === 0) {
      this.view = new LossView(SCREENS.timeout);
    }
    if (this.game.mistakes > MISTAKES_ALLOWED) {
      this.view = new LossView(SCREENS.attempts);
    }
    if (this.game.isComplete) {
      this.view = new WinView(this.game);
    }
  }
}

export default new Result();
