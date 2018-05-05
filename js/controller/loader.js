import {showScreen} from '../util';
import LoaderView from "../view/loader-view";
import App from '../application';
import {SCREENS} from "../data/game-data";

class Loader {
  init(message = SCREENS.loader) {
    this.message = message;
    this.view = new LoaderView(this.message);
    showScreen(this.view);
    this.view.onRetry = () => {
      App.load();
    };
  }
}

export default new Loader();
