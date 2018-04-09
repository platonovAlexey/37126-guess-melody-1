export default class Timer {
  constructor(seconds) {
    if (!Number.isInteger(seconds)) {
      throw new TypeError(`Passed argument is not integer`);
    }
    this._remainingTime = seconds;
    this._isDone = seconds === 0;
  }

  tick() {
    if (!this._isDone) {
      this._remainingTime--;
      if (this._remainingTime === 0) {
        this._isDone = true;
      }
    }
    return this._isDone;
  }

  get remainingTime() {
    return this._remainingTime;
  }
}
