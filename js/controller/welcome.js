import {showScreen} from '../util';
import WelcomeView from '../view/welcome-view';
import App from '../application';


class Welcome {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    showScreen(this.view);
    this.view.onStart = () => {
      App.showLevel();
    };
  }
}

export default new Welcome();
