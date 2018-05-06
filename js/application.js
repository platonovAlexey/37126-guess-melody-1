import {initialState as initial} from './data/game-data';
import welcome from './controller/welcome';
import result from './controller/result';
import level from './controller/level';
import loader from './controller/loader';
import timer from './timer';
import adapt from './data/data-adapter';
import Loader from './loader';

const ControllerId = {
  WELCOME: ``,
  LEVEL: `level`,
  RESULT: `result`
};

const saveGame = (data) => window.btoa(JSON.stringify(data));
const loadGame = (data) => {
  let output;
  try {
    const decodedData = window.atob(data);
    output = JSON.parse(decodedData);
  } catch (error) {
    output = data;
  }
  return output;
};

export default class Application {

  static load() {
    Application.showLoader();
    Loader.loadData().
        then(adapt).
        then((levels) => {
          Application.init(levels);
        }).
        catch((error) => {
          Application.showLoader({
            heading: `Ой, что-то не так...`,
            message: error.message,
            button: `Попробовать ещё раз`
          });
        });
  }

  static init(levels) {
    this.levels = levels;

    Application.routes = {
      [ControllerId.WELCOME]: welcome,
      [ControllerId.LEVEL]: level,
      [ControllerId.RESULT]: result
    };

    const getChangeHash = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`=`);
      Application.changeHash(id, loadGame(data));
    };
    window.onhashchange = getChangeHash;
    getChangeHash();

    timer.start();
  }

  static changeHash(id, data) {
    const controller = Application.routes[id];
    if (controller) {
      controller.init(data);
    }
  }

  static showLoader(content) {
    loader.init(content);
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static showLevel(state = Object.assign({}, initial)) {
    location.hash = `${ControllerId.LEVEL}=${saveGame(state)}`;
  }

  static showResult(game) {
    location.hash = `${ControllerId.RESULT}=${saveGame(game)}`;
  }
}
