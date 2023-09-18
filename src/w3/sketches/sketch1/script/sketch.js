let posX;
let posY;
let posXAdd = 3;
let posYAdd = -2;

function setup() {
  // 한번 실행 계속 실행이 안됨
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background(255);
  posX = width / 2;
  posY = height / 2;
}

function draw() {
  // 계속 실행이됨
  background(255);
  // posX += 5;
  // posY += 3;
  // (Pos 값 설정한) 중앙에 있는 모습을 보여주지 않음
  ellipse(posX, posY, 50);
  posX += posXAdd;
  posY += posYAdd;
  // 어떤 방향으로 (각도)
  // 얼마나 (길이)
  // posX++;
  // posX = posX + 1;
}
