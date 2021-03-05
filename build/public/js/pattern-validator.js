const isNullOrUndefined = (item) => {
  if (item === null || item === undefined) {
    return true;
  }
  return false;
};

export { isNullOrUndefined };
