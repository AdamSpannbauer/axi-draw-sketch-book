const canvasW = 512;
const canvasH = 512;

const saveCoolDown = 60;
let framesSinceSave = saveCoolDown;

const wavyCircle = (r, nPoints = 50) => {
  const da = TWO_PI / nPoints;

  const rScl = 0.6;
  const minR = r * (1 - rScl);
  const maxR = r * (1 + rScl);

  beginShape();
  for (let i = 0; i < nPoints; i += 1) {
    const ai = da * i;
    const ri = map(noise(ai, frameCount * 0.01), 0, 1, minR, maxR);

    const x = cos(ai) * ri;
    const y = sin(ai) * ri;

    if (i === 0)curveVertex(x, y);
    curveVertex(x, y);
  }
  endShape(CLOSE);
};

window.setup = () => {
  createCanvas(canvasW, canvasH, SVG);
  background(255);

  noFill();

  stroke(0);
  strokeWeight(2);
};

window.draw = () => {
  translate(width / 2, height / 2);
  framesSinceSave += 1;

  const perc = map(frameCount, 0, 10, 1, 0.1);
  wavyCircle(200 * perc);

  if (frameCount >= 10) noLoop();
};

window.mouseClicked = () => {
  if (framesSinceSave >= saveCoolDown) {
    save();
    framesSinceSave = 0;
  }
};
