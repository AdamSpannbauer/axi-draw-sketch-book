import { noisyLine } from './noiseUtils.js';

export class NoisyHLineCircle {
  constructor({
    x, y, r, nScl = 0.001, nSize = 30, nSeed = 42, lineGap = 4,
  }) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.nScl = nScl;
    this.nSize = nSize;
    this.nSeed = nSeed;
    this.lineGap = lineGap;
  }

  ptInCircle({ x, y }) {
    const { x: cx, y: cy, r: cr } = this;
    const sqD = (x - cx) ** 2 + (y - cy) ** 2;

    return sqD < cr ** 2;
  }

  drawOutline() {
    const { x, y, r } = this;
    ellipse(x, y, r * 2, r * 2);
  }

  drawLines() {
    const {
      x: cx, y: cy, r: cr, nScl, nSize, nSeed, lineGap,
    } = this;

    const offset = cr + nSize * 1.2;
    const x1 = cx - offset;
    const y1 = cy - offset;
    const x2 = cx + offset;
    const y2 = cy + offset;

    for (let y = y1; y < y2; y += lineGap) {
      noisyLine({
        x1,
        y1: y,
        x2,
        y2: y,
        maskFunc: (newPt) => this.ptInCircle(newPt),
        nScl,
        nSize,
        nSeed,
      });
    }
  }

  draw() {
    this.drawOutline();
    this.drawLines();
  }
}
