let vehicle;
let mVec;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  vehicle = new Vehicle(width / 2, height / 2, 1, 6, 8, 0.2);
  mVec = createVector();
}

function draw() {
  background(255);

  mVec.set(mouseX, mouseY);

  fill(127);
  stroke(0);
  strokeWeight(2);
  circle(mVec.x, mVec.y, 48);

  vehicle.seek(mVec);
  vehicle.update();
  vehicle.display();
}
