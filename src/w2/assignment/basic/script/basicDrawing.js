function setup() {
  setCanvasContainer('p5-canvas', 3, 2, true);
  background('white');
}

function draw() {
  background(200);

  //   루프로 인해 아래서 적용한 설정이 타고 넘어오는 것을 방지하기 위해 초기화
  rectMode(CORNER);
  fill(255);
  colorMode(RGB);
  stroke(0);
  strokeWeight(1);

  rect(0, 50, 400, 500);
  rect(0, 50, 300, 480);
  rect(0, 60, 450, 10);
  rect(300, 55, 50, 550);
  rect(350, 55, 50, 550);
  rect(370, 55, 50, 550);
  fill(255, 204, 0);
  ellipse(500, 220, 130);
  fill('yellow');
  ellipse(500, 200, 100);
  fill('skyblue');
  rect(450, 120, 100, 90, 30, 30, 0, 0);
  // ellipse(200, 100, 50, 25);
  // rect(250, 150, 70, 80);

  rectMode(CENTER);
  // rect(300, 100, 50, 50);
  // ellipse(300, 100, 50, 50);
  // rect(400, 100, 50, 25);
  // ellipse(400, 100, 25, 50);
  fill(225, 127, 0);
  rect(300, 550, 50, 200);
  rect(700, 550, 50, 200);
  rect(500, 450, 500, 50);

  // fill(225, 127, 0);
  // ellipse(100, 200, 50);
  // fill('#00EE40');
  // circle(200, 200, 50);
  // colorMode(HSL);
  // fill(240, 100, 50);
  // rect(300, 200, 50);
  // noStroke();
  // square(400, 200, 50);

  // rect(100, 300, 50, 50, 20);
  // rect(200, 300, 50, 50, 5, 10, 15, 20);

  stroke(0);
  // line(100, 400, 150, 450);

  // stroke('royalblue');
  // line(200, 400, 250, 400);
  stroke('black');
  strokeWeight(1);
  line(500, 0, 500, 120);
  // stroke('slateBlue');
  // strokeWeight(10);
  // line(250, 450, 200, 450);

  stroke(50, 100, 10);
  strokeWeight(2);
  point(300, 400);
  point(310, 400);
  point(320, 400);
  point(330, 400);
  point(340, 400);
  point(350, 400);
  stroke(50, 100, 20);
  strokeWeight(3);
  point(300, 410);
  point(310, 410);
  point(320, 410);
  point(330, 410);
  point(340, 410);
  point(350, 410);
  stroke(50, 100, 30);
  strokeWeight(3);
  point(300, 420);
  point(310, 420);
  point(320, 420);
  point(330, 420);
  point(340, 420);
  point(350, 420);
  stroke(50, 100, 40);
  strokeWeight(4);
  point(300, 430);
  point(310, 430);
  point(320, 430);
  point(330, 430);
  point(340, 430);
  point(350, 430);
}
