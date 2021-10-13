/* globals SVG */
import { MoireCircle } from './moireCircle.js';

const canvasW = 512;
const canvasH = 512;

window.setup = () => {
  createCanvas(canvasW, canvasH, SVG);

  noFill();

  stroke(0);
  strokeWeight(2);
};

window.draw = () => {
  clear();

  const mCircle = new MoireCircle({
    x: width / 2,
    y: height / 2,
    r: 200,
    palette: [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
  });
  mCircle.draw();

  noLoop();
};
