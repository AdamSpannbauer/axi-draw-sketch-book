/* global SVG */

import { genNodeSpiral } from './genSpiral.js';
import { drawInGridCell } from './utils.js';

const canvasW = 512;
const canvasH = 512;

const NROWS = 3;
const NCOLS = 3;
const drawEvery = 64;

const totalDeltaAngle = Math.PI * 3;
const nNodes = 100;
const nNewNodes = 5;

const FORCES = {
  repulsionForce: 0.5,
  attractionForce: 0.7,
  alignmentForce: 0.5,
};

let path;

window.setup = () => {
  createCanvas(canvasW, canvasH, SVG);

  noFill();

  stroke(0);
  strokeWeight(2);

  path = genNodeSpiral(30, 200, totalDeltaAngle, nNodes, FORCES);
};

let rowI = 0;
let colJ = 0;
window.draw = () => {
  path.update(nNewNodes);

  if (frameCount % drawEvery === 0 || frameCount === 1) {
    drawInGridCell(rowI, colJ, NROWS, NCOLS);
    path.draw();

    colJ += 1;
    if (colJ >= NCOLS) {
      colJ = 0;
      rowI += 1;
    }

    if (rowI >= NROWS) {
      noLoop();
    }
  }
};
