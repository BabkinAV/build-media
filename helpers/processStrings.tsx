const processExcerpt = (inputStr: string): string => {
  let filteredString = inputStr.replace(
    /(<[^>]*>?)|(\/n)|(\[\&hellip\;\])/gm,
    ''
  );

  if (filteredString.length > 50) {
    return filteredString.substring(0, 100) + '...';
  }

  return filteredString;
};

export default processExcerpt;
