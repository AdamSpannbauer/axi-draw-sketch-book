/* globals SVG */
const imgPath = './sonofman.jpg';
const imgScl = 8;
let img;

const maxR = 3;
const minR = 0.5;

window.preload = () => {
  img = loadImage(imgPath);
};

window.setup = () => {
  createCanvas(img.width, img.height, SVG);

  noFill();
  stroke(0);
  strokeWeight(2);

  const newW = int(img.width / imgScl);
  const newH = int(img.height / imgScl);
  img.resize(newW, newH);
};

window.draw = () => {
  clear();

  img.loadPixels();
  for (let y = 0; y < img.height; y += 1) {
    for (let x = 0; x < img.width; x += 1) {
      const index = (x + y * img.width) * 4;
      const r = img.pixels[index + 0];
      const g = img.pixels[index + 1];
      const b = img.pixels[index + 2];
      const a = img.pixels[index + 3];

      // eslint-disable-next-line no-continue
      if (a === 0) continue;

      const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      const radius = map(gray, 0, 245, maxR, 0, true);
      if (radius > minR) ellipse(x * imgScl, y * imgScl, radius * 2, radius * 2);
    }
  }

  noLoop();
};
