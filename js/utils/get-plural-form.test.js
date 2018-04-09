import assert from 'assert';
import handleThrow from './handle-assert-throw';
import getPluralForm from './get-plural-form';

const forms = [`минута`, `минуты`, `минут`];

const firstForm = [
  1, 21, 31, 41, 51, 61, 71, 81, 91, 101, 121, 131, 141, 151, 161, 171, 181,
  191, 201, 221, 231, 241, 251, 261, 271, 281, 291
];

const secondForm = [
  2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54, 62, 63, 64, 72, 73,
  74, 82, 83, 84, 92, 93, 94, 102, 103, 104, 122, 123, 124, 132, 133, 134, 142,
  143, 144, 152, 153, 154, 162, 163, 164, 172, 173, 174, 182, 183
];

const lastForm = [
  0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 26, 27, 28,
  29, 30, 35, 36, 37, 38, 39, 40, 45, 46, 47, 48, 49, 50, 55, 56, 57, 58, 59,
  60, 65, 66, 67, 68, 69, 70, 75, 76, 77
];

describe(`pluralForm()`, () => {
  it(`should give right result with numbers \
which ends with 1 excluding numbers which ends with 11`, () => {
        const rightResult = `минута`;
        firstForm.forEach((num) => {
          assert.strictEqual(getPluralForm(num, forms), rightResult, num);
        });
      });

  it(`should give right result with numbers \
which ends with 2 — 4 excluding numbers which ends with 12 — 14`, () => {
        const rightResult = `минуты`;
        secondForm.forEach((num) => {
          assert.strictEqual(getPluralForm(num, forms), rightResult, num);
        });
      });

  it(`should give right result with other numbers`, () => {
    const rightResult = `минут`;
    lastForm.forEach((num) => {
      assert.strictEqual(getPluralForm(num, forms), rightResult, num);
    });
  });

  it(`shouldn't give same result as numbers which ends with 1 excluding 11`, () => {
    const rightResult = `минута`;
    secondForm.forEach((num) => {
      assert.notStrictEqual(getPluralForm(num, forms), rightResult, num);
    });
    lastForm.forEach((num) => {
      assert.notStrictEqual(getPluralForm(num, forms), rightResult, num);
    });
  });

  it(`shouldn't give same result as numbers which ends with 2 — 4 \
excluding 12 — 14`, () => {
        const rightResult = `минуты`;
        firstForm.forEach((num) => {
          assert.notStrictEqual(getPluralForm(num, forms), rightResult, num);
        });
        lastForm.forEach((num) => {
          assert.notStrictEqual(getPluralForm(num, forms), rightResult, num);
        });
      });

  it(`shouldn't give same result as other numbers`, () => {
    const rightResult = `минут`;
    firstForm.forEach((num) => {
      assert.notStrictEqual(getPluralForm(num, forms), rightResult, num);
    });
    secondForm.forEach((num) => {
      assert.notStrictEqual(getPluralForm(num, forms), rightResult, num);
    });
  });

  it(`should throw an error if invoked with incompatible data types`, () => {
    const expectedIntegerMsg = `First passed argument is not integer`;
    handleThrow(getPluralForm, [[], []], expectedIntegerMsg);
    handleThrow(getPluralForm, [``, []], expectedIntegerMsg);
    handleThrow(getPluralForm, [`2`, []], expectedIntegerMsg);
    handleThrow(getPluralForm, [{}, []], expectedIntegerMsg);
    handleThrow(getPluralForm, [true, []], expectedIntegerMsg);
    handleThrow(getPluralForm, [false, []], expectedIntegerMsg);
    handleThrow(getPluralForm, [NaN, []], expectedIntegerMsg);
    handleThrow(getPluralForm, [Infinity, []], expectedIntegerMsg);
    handleThrow(getPluralForm, [-Infinity, []], expectedIntegerMsg);

    const expectedArrayMsg = `Second passed argument is not instance of Array`;
    handleThrow(getPluralForm, [1, ``], expectedArrayMsg);
    handleThrow(getPluralForm, [1, {}], expectedArrayMsg);
    handleThrow(getPluralForm, [1, true], expectedArrayMsg);
    handleThrow(getPluralForm, [1, false], expectedArrayMsg);
    handleThrow(getPluralForm, [1, `[1, 2]`], expectedArrayMsg);
    handleThrow(getPluralForm, [1, 3], expectedArrayMsg);
    handleThrow(getPluralForm, [1, NaN], expectedArrayMsg);
  });

  it(`should throw an error if elements in forms array are not of type string`, () => {
    const expectedMsg = `Elements in array of forms must be a strings`;
    handleThrow(getPluralForm, [1, [1, 2, 3]], expectedMsg);
    handleThrow(getPluralForm, [1, [[], `k`, {}]], expectedMsg);
    handleThrow(getPluralForm, [1, [null, `минуты`, `минут`]], expectedMsg);
  });
});
