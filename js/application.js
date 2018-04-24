import welcome from './controller/welcome';
import result from './controller/result';
import level from './controller/level';

export default class Application {

  static showWelcome() {
    welcome.init();
  }

  static showLevel(state) {
    level.init(state);
  }

  static showResult(game) {
    result.init(game);
  }
}
