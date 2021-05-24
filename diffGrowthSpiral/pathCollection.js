export default class PathCollection {
  constructor(paths) {
    this.paths = paths;
  }

  get length() {
    let x = 0;
    this.paths.forEach((p) => { x += p.nodes.length; });
    return x;
  }

  get allNodes() {
    return [].concat(...this.paths.map((x) => x.nodes));
  }

  update() {
    this.paths.forEach((p) => p.update(this.allNodes));
  }

  draw() {
    this.paths.forEach((p) => p.draw());
  }
}
