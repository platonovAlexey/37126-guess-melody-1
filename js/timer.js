import {TIME_TOTAL} from "./data/game-data";

const SECOND = 1000;

class Timer {
  constructor(newTime) {
    if (newTime < 0 || !Number.isInteger(newTime)) {
      throw new Error(`Parameter must be positive integer number`);
    }
    this._time = newTime;
  }

  set time(newTime) {
    this._time = newTime;
  }

  get time() {
    return this._time;
  }

  tick() {
    if (this.time !== 0) {
      this._time--;
      return true;
    }
    return this.time !== 0;
  }

  start() {
    this.interval = setInterval(() => {
      if (this.tick()) {
        this.onTick();
      } else {
        this.stop();
      }
    }, SECOND);
  }

  stop() {
    clearInterval(this.interval);
    this._time = TIME_TOTAL;
  }

  onTick() {

  }
}

export default new Timer(TIME_TOTAL);
