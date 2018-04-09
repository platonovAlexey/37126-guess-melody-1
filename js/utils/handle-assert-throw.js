import assert from 'assert';

export default (fn, args, expectedErrorMessage) => {
  assert.throws(() => {
    fn(...args);
  }, (err) => {
    return err.message === expectedErrorMessage;
  });
};
