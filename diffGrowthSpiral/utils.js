/**
 * Write full screen drawing code and use this function to do
 * to make it appear in a grid of drawings. AKA do tranlate()
 * and scale() for me to make sequence 'animations' for static output
 *
 * @param {int} row the index of the row you want to draw in
 * @param {int} col the index of the column you want to draw in
 * @param {int} nRows the number of rows in the grid (for scaling cell to screen)
 * @param {int} nCols the number of columns in the grid (for scaling cell to screen)
 * @param {Number} borderSize the number of pixels to pad each cell with
 */
export const drawInGridCell = (row, col, nRows, nCols, borderSize = 0) => {
  // Using width instead of height for no good reason
  const cellSize = width / max([nRows, nCols]);

  const gridW = cellSize * nCols;
  const gridH = cellSize * nRows;

  // Scaling for initial grid
  let scl = 1 / max([nRows, nCols]);
  // Adjust scale for requested border size
  scl *= (cellSize - 2 * borderSize) / cellSize;

  const startX = (width / 2) - (gridW / 2);
  const startY = (height / 2) - (gridH / 2);

  const x = startX + col * cellSize;
  const y = startY + row * cellSize;

  translate(x, y);
  scale(scl, scl);
};
