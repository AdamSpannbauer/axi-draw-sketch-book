import Path from './path.js';
import Node from './node.js';

export const genNodeSpiral = (
  startR = 30,
  endR = 200,
  totalAngle = Math.PI * 3,
  nNodes = 100,
  forces = {
    repulsionForce: 0.9,
    attractionForce: 0.3,
    alignmentForce: 0.99,
  },
) => {
  const nodes = [];
  const angleStep = totalAngle / nNodes;
  for (let a = 0; a <= totalAngle; a += angleStep) {
    const r = map(a, 0, totalAngle, startR, endR);

    const x = cos(a) * r + width / 2;
    const y = sin(a) * r + height / 2;
    const node = new Node(x, y);

    nodes.push(node);
  }

  return new Path(nodes, forces);
};
