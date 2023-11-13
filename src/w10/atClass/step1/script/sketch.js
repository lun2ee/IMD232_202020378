const tiles = [];
const rowNum = 10,
  colNum = 10;

function setup() {
  setCanvasContainer('mySketchGoesHere', 1, 1, true);

  const w = width / colNum;
  const h = w;
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col;
      const y = h * row;
      const newTile = new ToggleTile(x, y, w, h);
      tiles.push(newTile);
    }
  }
  background(255);
}

function draw() {
  background(255);

  tiles.forEach((each) => {
    each.display(mouseX, mouseY);
  });
}

function mouseClicked() {
  for (let idx = 0; idx < tiles.length; idx++)
    if (tiles[idx].toggleState(mouseX, mouseY)) break;
}
