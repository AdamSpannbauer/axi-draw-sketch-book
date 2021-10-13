import { onScreen } from './utils.js';

export const addNoise = ({ x, y }, nScl = 0.001, nSize = 32, nSeed = 0) => {
  const nx = noise(x * nScl, y * nScl, nSeed);
  const ny = noise(x * nScl, y * nScl, nSeed + 42);

  const dx = map(nx, 0, 1, -nSize, nSize);
  const dy = map(ny, 0, 1, -nSize, nSize);

  return { x: x + dx, y: y + dy };
};

export const noisyLine = ({
  x1, y1, x2, y2, maskFunc = () => true, nScl = 0.001, nSize = 32, nSeed = 0, nPoints = null,
}) => {
  if (nPoints === null) {
    const d = dist(x1, y1, x2, y2);
    // eslint-disable-next-line no-param-reassign
    nPoints = map(d, 0, height, 2, 512);
  }

  let drawing = false;
  for (let i = 0; i < nPoints; i += 1) {
    const x = map(i, 0, nPoints - 1, x1, x2);
    const y = map(i, 0, nPoints - 1, y1, y2);

    const newPt = addNoise({ x, y }, nScl, nSize, nSeed);
    const drawPt = onScreen(newPt) && maskFunc(newPt);

    if (drawPt) {
      if (!drawing) beginShape();
      drawing = true;

      const { x: noisyX, y: noisyY } = newPt;
      vertex(noisyX, noisyY);
    } else {
      if (drawing) endShape();
      drawing = false;
    }
  }
  if (drawing) endShape();
};
