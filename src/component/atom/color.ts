export const colors = {
  main: '#4d6492',
  sub: '#2f5580',
  subRed: '#E8D2D4',
  white: '#fff',
  black: '#000',
  side: '#3d92a4',
  item: '#2c3f55',
  backItem: '#c0bbc0',
};

export const convertHexToRGBA = (hexCode: string, opacity: number) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
};
