let pos;
let vel;
let acc;
let rad = 30;

let cv;
let mv;
let accPoint;
let posPoint;
let cvToMv;
let cvToPo;
let cvToAc;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
  reset();
}

function draw() {
  background('white');
  update();
  infiniteEdge();
  display();
}

function display() {
  fill('black');
  stroke(1);
  ellipse(pos.x, pos.y, rad * 2);

  strokeWeight(2);
  stroke('black');
  cv.set(pos.x, pos.y);
  mv.set(mouseX, mouseY);
  cvToMv = p5.Vector.sub(mv, cv);
  translate(cv.x, cv.y);

  line(0, 0, cvToMv.x, cvToMv.y);

  strokeWeight(2);
  stroke('blue');
  accPoint.set(acc.x + pos.x, acc.y + pos.y);
  cvToAc = p5.Vector.sub(accPoint, cv);
  line(0, 0, cvToAc.x * 100, cvToAc.y * 100);
  console.log(mag(cvToAc.x, cvToAc.y));

  strokeWeight(3);
  stroke('purple');
  posPoint.set(pos.x + vel.x, pos.y + vel.y);
  cvToPo = p5.Vector.sub(posPoint, cv);

  line(0, 0, cvToPo.x * 10, cvToPo.y * 10);
}

function reset() {
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);
  acc = createVector();
  cv = createVector();
  mv = createVector();
  accPoint = createVector();
  posPoint = createVector();
  cvToPo = createVector();
}

function update() {
  acc = p5.Vector.random2D();
  acc.mult(2);
  vel.limit(5);
  vel.add(acc);
  pos.add(vel);
}

function infiniteEdge() {
  if (pos.x < 0) {
    pos.x += width;
  } else if (pos.x > width) {
    pos.x -= width;
  }
  if (pos.y < 0) {
    pos.y += height;
  } else if (pos.y > height) {
    pos.y -= height;
  }
}
