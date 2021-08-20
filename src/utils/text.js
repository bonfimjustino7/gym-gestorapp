export const textTruncate = (text: String, maxLenght) => {
  return text?.length > maxLenght
    ? text.slice(0, maxLenght) + '...'
    : text || '';
};

export const sigle = (text: String) => {
  const palavras = text?.split(' ') || [];

  if (!palavras.length) {
    return '';
  } else {
    const siglas = [palavras[0][0], palavras[1][0]];

    return siglas.join('');
  }
};
