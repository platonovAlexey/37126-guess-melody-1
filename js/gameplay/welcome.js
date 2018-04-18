import {renderNextScreen} from '../util';
import {initialState as initial, SCREENS} from "../data/game-data";
import WelcomeView from '../view/welcome-view';
import timer from '../timer';

const welcome = new WelcomeView(SCREENS.welcome);
welcome.onStart = () => {
  renderNextScreen(Object.assign({}, initial));
  timer.start();
};

export default () => welcome;
