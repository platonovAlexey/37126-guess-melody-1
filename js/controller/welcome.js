import {showScreen} from '../util';
import WelcomeView from '../view/welcome-view';
import App from '../application';
import timer from '../timer';

class Welcome {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    showScreen(this.view);
    this.view.onStart = () => {
      App.showLevel();
      timer.start();
    };
  }
}

export default new Welcome();
