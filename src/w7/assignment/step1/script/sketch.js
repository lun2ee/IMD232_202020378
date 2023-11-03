let traffic;
let infiniteOffset = 80;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  //   캔버스 크기 설정
  background('white');
  //   배경색은 ("흰색")
  traffic = new Traffic();
}

function draw() {
  background('white');
  //   배경색은 ("흰색")
  traffic.run();
}

function mouseDragged() {
  traffic.addVehicle(mouseX, mouseY);
}
