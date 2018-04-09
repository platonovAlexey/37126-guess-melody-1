import assert from 'assert';
import handleThrow from './handle-assert-throw';
import getScore from './get-score';

describe(`getScore(answers, remainingNotes)`, () => {
  it(`Should return a number that lies in interval [1, 20] \
if invoked with 10 answers and 0 - 3 remaining notes`, () => {
        for (let k = 0; k < 100; k++) { // 100 раз проверим с разными данными
          const answers = [];
          for (let i = 0; i < 10; i++) { // 10 ответов
            answers[i] = {
              timeInSec: Math.floor(Math.random() * 45) // время от 0 до 45
            };
          }
          // от 0 до 3 оставшихся нот
          const result = getScore(answers, Math.floor(Math.random() * 4));
          assert(result >= 1 && result <= 20);
        }
      });

  it(`Should throw an error if invoked with < 10 or > 10 answers`, () => {
    const answers = [];
    for (let i = 0; i < 9; i++) {
      answers[i] = {
        timeInSec: Math.floor(Math.random() * 45)
      };
    }
    const expectedMsg = `Array of answers must have length === 10`;
    handleThrow(getScore, [answers, Math.floor(Math.random() * 4)], expectedMsg);

    for (let i = 9; i < 12; i++) {
      answers[i] = {
        timeInSec: Math.floor(Math.random() * 45)
      };
    }

    handleThrow(getScore, [answers, Math.floor(Math.random() * 4)], expectedMsg);
  });

  it(`Should throw an error if invoked with < 0 or > 3 remaining notes`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      answers[i] = {
        timeInSec: Math.floor(Math.random() * 45)
      };
    }

    const expectedMsg = `Number of remaining notes must lie in interval 0 — 3`;
    handleThrow(getScore, [answers, -1], expectedMsg);
    handleThrow(getScore, [answers, 4], expectedMsg);
  });

  it(`Should throw an error if invoked with not integer of remaining notes`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      answers[i] = {
        timeInSec: Math.floor(Math.random() * 45)
      };
    }

    const expectedMsg = `Second passed argument is not integer`;
    handleThrow(getScore, [answers, 0.215123], expectedMsg);
    handleThrow(getScore, [answers, 123.91823213], expectedMsg);
    handleThrow(getScore, [answers, Math.PI], expectedMsg);
  });

  it(`Should throw an error if invoked with incompatible data types`, () => {
    const expectedArrayMsg = `First passed argument is not instance of Array`;
    handleThrow(getScore, [``, 1], expectedArrayMsg);
    handleThrow(getScore, [{}, 1], expectedArrayMsg);
    handleThrow(getScore, [true, 1], expectedArrayMsg);
    handleThrow(getScore, [false, 1], expectedArrayMsg);
    handleThrow(getScore, [`[1, 2]`, 1], expectedArrayMsg);
    handleThrow(getScore, [3, 1], expectedArrayMsg);
    handleThrow(getScore, [NaN, 1], expectedArrayMsg);

    const expectedIntegerMsg = `Second passed argument is not integer`;
    handleThrow(getScore, [[], []], expectedIntegerMsg);
    handleThrow(getScore, [[], ``], expectedIntegerMsg);
    handleThrow(getScore, [[], `2`], expectedIntegerMsg);
    handleThrow(getScore, [[], {}], expectedIntegerMsg);
    handleThrow(getScore, [[], true], expectedIntegerMsg);
    handleThrow(getScore, [[], false], expectedIntegerMsg);
    handleThrow(getScore, [[], NaN], expectedIntegerMsg);
    handleThrow(getScore, [[], Infinity], expectedIntegerMsg);
    handleThrow(getScore, [[], -Infinity], expectedIntegerMsg);
  });

  it(`Should return 10 if invoked with 10 slow answers \
and 3 remaining notes`, () => {
        const answers = [];
        for (let i = 0; i < 10; i++) {
          answers[i] = {
            timeInSec: Math.floor(Math.random() * (50 - 30) + 30) // время от 30 до 50
          };
        }
        const result = getScore(answers, 3);
        assert.strictEqual(result, 10);
      });

  it(`Should return 20 if invoked with 10 fast answers \
and 3 remaining notes`, () => {
        const answers = [];
        for (let i = 0; i < 10; i++) {
          answers[i] = {
            timeInSec: Math.floor(Math.random() * 29) // время от 0 до 29
          };
        }
        const result = getScore(answers, 3);
        assert.strictEqual(result, 20);
      });

  it(`Should return 16 if invoked with 10 fast answers \
and 1 remaining note`, () => {
        const answers = [];
        for (let i = 0; i < 10; i++) {
          answers[i] = {
            timeInSec: Math.floor(Math.random() * 29) // время от 0 до 29
          };
        }
        const result = getScore(answers, 1);
        assert.strictEqual(result, 16);
      });

  it(`Should return 16 if invoked with 8 fast answers, 2 slow answers \
and 2 remaining note`, () => {
        const answers = [];
        for (let i = 0; i < 8; i++) { // 8 быстрых
          answers[i] = {
            timeInSec: Math.floor(Math.random() * 29) // время от 0 до 29
          };
        }
        for (let i = 8; i < 10; i++) { // 2 медленных
          answers[i] = {
            timeInSec: Math.floor(Math.random() * (45 - 30) + 30) // время от 30 до 45
          };
        }
        const result = getScore(answers, 2);
        assert.strictEqual(result, 16);
      });
});
