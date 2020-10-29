export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cartToMenu = (x: number, y: number) => {
  let distance = Math.sqrt(x * x + y * y);
  let degrees = Math.atan2(y, x) * (180 / Math.PI); //This takes y first
  degrees = Math.floor(degrees);
  if (degrees < 0) {
    degrees += 360;
  }
  let polarCoor = { distance, degrees };
  return polarCoor;
};
