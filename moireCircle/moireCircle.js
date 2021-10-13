import { NoisyHLineCircle } from './noisyLineCircle.js';

export class MoireCircle {
  constructor({
    x, y, r, nLayers = 3, nScl = 0.001, nSize = 50, nSeedStep = 2, lineGap = 4, palette = [0],
  }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.nLayers = 2;
    this.nSeedStep = nSeedStep;

    this.palette = palette;

    this.lineCircles = Array.from({ length: nLayers }, (_, i) => {
      const c = new NoisyHLineCircle({
        x, y, r, nScl, nSize, lineGap, nSeed: i * nSeedStep,
      });

      return c;
    });
  }

  draw() {
    this.lineCircles.forEach((c, i) => {
      stroke(this.palette[i % this.palette.length]);
      c.drawLines();
      if (i === this.lineCircles.length - 1) c.drawOutline();
    });
  }
}
