let lineCount = 0;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  background(0);
}

function draw() {
  translate(width / 2, height / 2);

  if (lineCount < 30) {
    let v = p5.Vector.random2D();
    v.mult(random(100, 300));

    let weight = random(1, 3);

    // 중앙에서 바깥쪽으로 그라데이션 색상 생성
    let gradientColor = createGradientColor();

    strokeWeight(weight);
    strokeGradient(
      gradientColor,
      0,
      0,
      mouseX - width / 2,
      mouseY - height / 2
    );
    lineCount++;
  } else {
    lineCount = 0;
    background(0);
  }
}

// 중앙에서 바깥쪽으로 그라데이션 색상 생성
function createGradientColor() {
  let centerColor = color(0, 0, 255); // 파란색
  let outerColor = color(255, 0, 0); // 빨간색

  return [centerColor, outerColor];
}

// 그라데이션을 포함한 선에 색상 적용 함수
function strokeGradient(colors, x1, y1, x2, y2) {
  for (let i = 0; i <= 1; i += 0.01) {
    let interColor = lerpColor(colors[0], colors[1], i);
    stroke(interColor);
    let x = lerp(x1, x2, i);
    let y = lerp(y1, y2, i);
    point(x, y);
  }
}
