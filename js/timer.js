import {TIME_TOTAL} from "./data/game-data";

const SECOND = 1000;

class Timer {
  constructor(newTime) {
    if (newTime < 0 || !Number.isInteger(newTime)) {
      throw new Error(`Parameter must be positive integer number`);
    }
    this._time = newTime;
    this._isOn = false;
  }

  set time(newTime) {
    this._time = newTime;
  }

  get time() {
    return this._time;
  }

  get isOn() {
    return this._isOn;
  }

  tick() {
    if (this.time !== 0) {
      this._time--;
      return true;
    }
    return this.time !== 0;
  }

  start() {
    this._isOn = true;
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
    this._isOn = false;
  }

  onTick() {

  }
}

export default new Timer(TIME_TOTAL);
