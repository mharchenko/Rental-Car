export const formatNumberWithSpaces = (number) => {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
