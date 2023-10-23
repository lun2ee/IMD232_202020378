let traffic;
// let vehicle;
// let mVec;
let debug = true;

function setup() {
  setCanvasContainer('mySketchGoesHere', 2, 1, true);

  colorMode(HSL, 360, 100, 100, 100);
  traffic = new Traffic();

  for (let n = 0; n < 20; n++) {
    traffic.addVehicle(random(width), random(height));
  }
  //   colorMode(RGB, 255, 255, 255);
  background(0);
}

function draw() {
  background(0, 100, 100);
  traffic.run();
}
function mouseDragged() {
  traffic.addVehicle(mouseX, mouseY);
}
