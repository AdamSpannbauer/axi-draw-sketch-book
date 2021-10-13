export const onScreen = ({ x, y }) => {
  if (x < 0) return false;
  if (y < 0) return false;
  if (x > width) return false;
  if (y > height) return false;

  return true;
};
