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

let mouse;
let toMouse;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
  reset();
}

function draw() {
  background('white');
  update();
  display();
}

function display() {
  fill('black');
  stroke(0);
  ellipse(pos.x, pos.y, rad * 2);

  strokeWeight(3);
  stroke('black');
  cv.set(pos.x, pos.y);
  mv.set(mouseX, mouseY);
  cvToMv = p5.Vector.sub(mv, cv);
  translate(cv.x, cv.y);

  line(0, 0, cvToMv.x, cvToMv.y);

  strokeWeight(5);
  stroke('blue');
  posPoint.set(pos.x + vel.x, pos.y + vel.y);
  cvToPo = p5.Vector.sub(posPoint, cv);

  line(0, 0, cvToPo.x * 10, cvToPo.y * 10);
}

function reset() {
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);

  toMouse = createVector();
  mouse = createVector();

  cv = createVector();
  mv = createVector();
  accPoint = createVector();
  posPoint = createVector();
  cvToPo = createVector();
}

function update() {
  mouse.set(mouseX, mouseY);
  toMouse = p5.Vector.sub(mouse, pos);
  console.log(toMouse.x, toMouse.y);

  acc = createVector(toMouse.x, toMouse.y);
  acc.normalize();
  acc.mult(0.1);

  vel.limit(5);
  vel.add(acc);
  pos.add(vel);
}
