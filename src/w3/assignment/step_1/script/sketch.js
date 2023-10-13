let mover;

function setup() {
  setCanvasContainer('mySketchGoesHere', 1, 1, true);

  mover = new Mover(width / 2, height / 2, 25);

  background('white');
}

function draw() {
  mover.createRandomAcc();
  mover.update();
  background('white');
  mover.display();
}
