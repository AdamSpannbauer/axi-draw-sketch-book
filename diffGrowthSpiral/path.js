/* global p5 */
import Node from './node.js';

export default class Path {
  constructor(nodes, forces) {
    this.nodes = nodes;
    this.closeShape = false;

    this.forceFieldRadius = 10;

    const { repulsionForce, attractionForce, alignmentForce } = forces;

    this.repulsionForce = createVector(repulsionForce, 0);
    this.attractionForce = createVector(attractionForce, 0);
    this.alignmentForce = createVector(alignmentForce, 0);
  }

  randNodeIndex() {
    return int(random(1, this.nodes.length - 1));
  }

  addNode() {
    // Insert in random position
    // TODO: (prolly not tho) make insertion go to largest gap
    const i = this.randNodeIndex();

    // Randomly place node a little closer to 1 of its new neighbors
    const weight = random(0.2, 0.8);
    const nodeBefore = this.nodes[i - 1];
    const nodeAfter = this.nodes[i];

    const newNodeLoc = p5.Vector.lerp(nodeBefore.p, nodeAfter.p, weight);
    const newNode = new Node(newNodeLoc.x, newNodeLoc.y);

    this.nodes.splice(i, 0, newNode);
  }

  addNodes(n) {
    // Add n nodes randomly into path
    for (let i = 0; i < n; i += 1) {
      this.addNode();
    }
  }

  applyForces() {
    this.nodes.forEach((n1, i) => {
      this.nodes.forEach((n2, j) => {
        // Dont apply if comparing node to iteself
        if (i === j || (n1.x === n2.x && n1.y === n2.y)) return;

        const sqDist = (n1.x - n2.x) ** 2 + (n1.y - n2.y) ** 2;

        // Don't apply if nodes too far apart
        if (sqDist > this.forceFieldRadius ** 2) return;

        this.applyRepulsion(n1, n2);
      });
    });

    this.nodes.forEach((n, i) => {
      this.applyAttraction(i);
      this.applyAlignment(i);
    });
  }

  applyRepulsion(n1, n2) {
    const a = atan2(n1.y - n2.y, n1.x - n2.x);
    const f = this.repulsionForce.copy();

    f.rotate(a);
    n1.p.add(f);

    f.rotate(PI);
    n2.p.add(f);
  }

  applyAttraction(i) {
    if (i > 0) {
      const f = this.attractionForce.copy();
      const n1 = this.nodes[i - 1];
      const n2 = this.nodes[i];
      const a = atan2(n1.y - n2.y, n1.x - n2.x);

      f.rotate(a);
      n2.p.add(f);
    }

    if (i < this.nodes.length - 2) {
      const f = this.attractionForce.copy();
      const n1 = this.nodes[i];
      const n2 = this.nodes[i + 1];
      const a = atan2(n1.y - n2.y, n1.x - n2.x);

      f.rotate(a + PI);
      n1.p.add(f);
    }
  }

  applyAlignment(i) {
    if (i === 0 || i === this.nodes.length - 1) return;

    const nodeBefore = this.nodes[i - 1];
    const node = this.nodes[i];
    const nodeAfter = this.nodes[i + 1];

    const goalLoc = p5.Vector.lerp(nodeBefore.p, nodeAfter.p, 0.5);

    const f = this.alignmentForce.copy();
    const a = atan2(goalLoc.y - node.y, goalLoc.x - node.x);
    f.rotate(a);
    node.p.add(f);
  }

  update(nNewNodes) {
    const defaultNNewNodes = 15;
    this.applyForces();
    this.addNodes(nNewNodes || defaultNNewNodes);
  }

  draw() {
    push();
    beginShape();

    let started = false;
    this.nodes.forEach(({ x, y }) => {
      if (!started) {
        const offscreen = x < 0 || x > width || y < 0 || y > height;
        if (offscreen) return;
        started = true;
      }

      vertex(x, y);
    });

    if (this.closeShape) {
      endShape(CLOSE);
    } else {
      endShape();
    }
    pop();
  }
}
