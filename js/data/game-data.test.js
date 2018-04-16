import assert from 'assert';
import {getScore, getMessage, timer, isSelectedCorrect} from './game-data';

const fastAnswers = new Array(10).fill({
  correct: true,
  time: 29
});

const normalAnswers = new Array(10).fill({
  correct: true,
  time: 30
});

const leaderBoard = [4, 5, 8, 10, 11];

describe(`getScore`, () => {
  it(`should return 20 when player answered correctly every question in less then 30 seconds`, () => {
    assert.equal(20, getScore(fastAnswers));
  });
  it(`should return 10 when correct answer given in 30 seconds and more`, () => {
    assert.equal(10, getScore(normalAnswers));
  });
  it(`should return -1 when player gave less than 10 answers`, () => {
    assert.equal(-1, getScore(normalAnswers.pop()));
  });
  it(`should return 4 when player gave 2 wrong answers (no fast)`, () => {
    assert.equal(4, getScore([{correct: true, time: 30}, {correct: false, time: 30}, {correct: true, time: 30}, {correct: true, time: 30}, {correct: true, time: 30}, {correct: false, time: 30}, {correct: true, time: 30}, {correct: true, time: 30}, {correct: true, time: 30}, {correct: true, time: 30}]));
  });
});

describe(`getMessage`, () => {
  it(`should return correct message when player is first player`, () => {
    const message = `Вы заняли 1 место из 1 игроков. Это лучше чем у 0% игроков`;
    assert.equal(message, getMessage([], {
      score: 8,
      mistakes: 1
    }));
  });
  it(`should return correct message when player is second player and gained same score as first player`, () => {
    const message = `Вы заняли 2 место из 2 игроков. Это лучше чем у 0% игроков`;
    assert.equal(message, getMessage([8], {
      score: 8,
      mistakes: 1
    }));
  });
  it(`should return correct message when player is second player and gained highest score`, () => {
    const message = `Вы заняли 1 место из 2 игроков. Это лучше чем у 50% игроков`;
    assert.equal(message, getMessage([8], {
      score: 10,
      mistakes: 1
    }));
  });
  it(`should return correct message when player gained highest score`, () => {
    const message = `Вы заняли 1 место из 5 игроков. Это лучше чем у 80% игроков`;
    assert.equal(message, getMessage([2, 4, 10, 12], {
      score: 15,
      mistakes: 1
    }));
  });
  it(`should return correct message when player gained lowest score`, () => {
    const message = `Вы заняли 4 место из 4 игроков. Это лучше чем у 0% игроков`;
    assert.equal(message, getMessage([2, 5, 10], {
      score: 1,
      mistakes: 1
    }));
  });
  it(`should return corresponding message with player's stats`, () => {
    const message = `Вы заняли 4 место из 6 игроков. Это лучше чем у 33% игроков`;
    assert.equal(message, getMessage(leaderBoard, {
      score: 8,
      mistakes: 1
    }));
  });
  it(`should return corresponding message with player's stats`, () => {
    const message = `Вы заняли 3 место из 10 игроков. Это лучше чем у 70% игроков`;
    assert.equal(message, getMessage([1, 2, 3, 6, 9, 2, 4, 5, 10], {
      score: 9,
      mistakes: 1
    }));
  });
});

describe(`Timer`, () => {
  it(`should not accept negative number`, () => {
    assert.throws(() => timer(-3));
  });
  it(`should not accept decimal number`, () => {
    assert.throws(() => timer(3.2));
  });
  it(`should accept only number`, () => {
    assert.throws(() => timer(`1`));
    assert.throws(() => timer([]));
    assert.throws(() => timer({}));
    assert.throws(() => timer(NaN));
    assert.throws(() => timer(null));
  });
  it(`should decrease time by 1 on every tick`, () => {
    const myTimer = timer(60);
    myTimer.tick();
    assert.equal(59, myTimer.value);
  });
  it(`should not return negative values`, () => {
    const myTimer = timer(1);
    myTimer.tick();
    myTimer.tick();
    assert.notEqual(-1, myTimer.value);
  });
  it(`should return false when time is over`, () => {
    const myTimer = timer(1);
    assert.equal(false, myTimer.tick());
  });
});

describe(`isSelectedCorrect`, () => {
  it(`should return false when no correct answer`, () => {
    assert.equal(false, isSelectedCorrect([
      {
        checked: true,
        value: `false`
      },
      {
        checked: false,
        value: `false`
      },
      {
        checked: false,
        value: `true`
      }
    ]));
  });
  it(`should return true when correct answer present`, () => {
    assert.equal(true, isSelectedCorrect([
      {
        checked: true,
        value: `true`
      },
      {
        checked: false,
        value: `false`
      },
      {
        checked: false,
        value: `false`
      }
    ]));
  });
  it(`should return true when 2 correct answer present`, () => {
    assert.equal(true, isSelectedCorrect([
      {
        checked: true,
        value: `true`
      },
      {
        checked: false,
        value: `false`
      },
      {
        checked: true,
        value: `true`
      },
      {
        checked: false,
        value: `false`
      }
    ]));
  });
  it(`should return false when 1 selected from 2 correct`, () => {
    assert.equal(false, isSelectedCorrect([
      {
        checked: true,
        value: `true`
      },
      {
        checked: false,
        value: `false`
      },
      {
        checked: false,
        value: `false`
      },
      {
        checked: false,
        value: `true`
      }
    ]));
  });
  it(`should return false when 1 selected from 2 correct`, () => {
    assert.equal(false, isSelectedCorrect([
      {
        checked: false,
        value: `true`
      },
      {
        checked: true,
        value: `true`
      },
      {
        checked: false,
        value: `false`
      },
      {
        checked: false,
        value: `false`
      }
    ]));
  });
});
