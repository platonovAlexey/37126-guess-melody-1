export default (answers, remainingNotes) => {
  if (!Array.isArray(answers)) {
    throw new TypeError(`First passed argument is not instance of Array`);
  }
  if (!Number.isInteger(remainingNotes)) {
    throw new TypeError(`Second passed argument is not integer`);
  }
  if (answers.length !== 10) {
    throw new Error(`Array of answers must have length === 10`);
  }
  if (remainingNotes < 0 || remainingNotes > 3) {
    throw new Error(`Number of remaining notes must lie in interval 0 — 3`);
  }
  let sum = 0;
  for (let i = 0; i < answers.length; i++) {
    const ans = answers[i];
    sum++;
    if (ans.timeInSec < 30) {
      sum++;
    }
  }
  return sum - (3 - remainingNotes) * 2;
};
