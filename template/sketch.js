/* globals SVG */
const canvasW = 512;
const canvasH = 512;

window.setup = () => {
  createCanvas(canvasW, canvasH, SVG);

  noFill();

  stroke(0);
  strokeWeight(2);
};

window.draw = () => {
  ellipse(width / 2, height / 2, 100, 100);
};
