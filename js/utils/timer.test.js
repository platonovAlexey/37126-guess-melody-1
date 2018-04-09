import assert from 'assert';
import Timer from './timer';

describe(`Test timer`, () => {
  it(`Should create new timer with setted time`, () => {
    const timer = new Timer(12);
    assert.strictEqual(timer.remainingTime, 12);
  });

  it(`Should count down`, () => {
    const timer = new Timer(12);
    timer.tick();
    timer.tick();
    timer.tick();
    assert.strictEqual(timer.remainingTime, 9);
  });

  it(`Should return true if counter ends`, () => {
    const timer = new Timer(1);
    assert.strictEqual(timer.tick(), true);
  });

  it(`Should return true on tick if created with 0 seconds remaining`, () => {
    const timer = new Timer(0);
    assert.strictEqual(timer.tick(), true);
  });

  it(`Should return true if counter continues`, () => {
    const timer = new Timer(2);
    assert.strictEqual(timer.tick(), false);
  });
});
