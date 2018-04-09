export default (count, forms) => {
  if (!Number.isInteger(count)) {
    throw new TypeError(`First passed argument is not integer`);
  }
  if (!Array.isArray(forms)) {
    throw new TypeError(`Second passed argument is not instance of Array`);
  }
  if (!forms.every((title) => typeof title === `string`)) {
    throw new TypeError(`Elements in array of forms must be a strings`);
  }

  const mod10 = count % 10;
  const mod100 = count % 100;
  if ((mod10 === 1) && (count % 100 !== 11)) {
    return forms[0];
  } else if ((mod10 === 2 || mod10 === 3 || mod10 === 4) &&
      !(mod100 === 12 || mod100 === 13 || mod100 === 14)) {
    return forms[1];
  } else {
    return forms[2];
  }
};
