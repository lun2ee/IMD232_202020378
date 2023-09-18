function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);

  background('white');
  noStroke();
  fill('red');
}

function draw() {
  background(255);
  circle(mouseX, mouseY, 50);
}
