/* globals SVG */
const canvasW = 512;
const canvasH = 512;

const saveCoolDown = 60;
let framesSinceSave = 0;

window.setup = () => {
  createCanvas(canvasW, canvasH, SVG);
  background(30);

  noFill();

  stroke(0);
  strokeWeight(20);
};

window.draw = () => {
  framesSinceSave += 1;

  ellipse(width / 2, height / 2, 100, 100);
};

window.mouseClicked = () => {
  if (framesSinceSave >= saveCoolDown) {
    save();
    framesSinceSave = 0;
  }
};
