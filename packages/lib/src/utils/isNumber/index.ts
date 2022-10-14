export const isNumber = (input: any) => {
  if (input === '' || input === null) {
    return false;
  }

  return !isNaN(input);
};
