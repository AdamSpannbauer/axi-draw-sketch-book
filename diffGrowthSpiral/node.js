export default class Node {
  constructor(x, y) {
    this.p = createVector(x, y);
  }

  get x() {
    return this.p.x;
  }

  set x(x) {
    this.p.x = x;
  }

  get y() {
    return this.p.y;
  }

  set y(y) {
    this.p.y = y;
  }
}
