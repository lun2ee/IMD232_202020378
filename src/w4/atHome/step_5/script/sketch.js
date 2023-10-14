let moverA;
let moverB;
let gravity;
let wind;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background(255);
  moverA = new Mover(width / 3, height / 2, 10);
  moverB = new Mover((2 * width) / 3, height / 2, 1);
  gravity = createVector(0, 0.1);
  wind = createVector(0.2, 0);
}

function draw() {
  background(255);

  let gravityA = createVector(gravity.x, gravity.y);
  gravityA.mult(moverA.mass);
  moverA.applyForce(gravityA);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverA.applyForce(wind);
    //마우스를 눌렀을때, 바람이 불게끔 한다.
  }
  if (moverA.contactEdge()) {
    let c = 0.1;
    // let friction = createVector(moverA.vel.x, moverA.vel.y);
    let friction = moverA.vel.copy();
    //moverA 값의 velocity 와는 무관하게 하나의 카피를 떠서 friction에게 주게 되는 것.
    //방향을 뒤집으려면,
    friction.mult(-1);
    friction.mult(c);
    moverA.applyForce(friction);
  }
  moverA.update();
  moverA.checkEdges();
  moverA.display();
  moverA.displayVectors();

  let gravityB = createVector(gravity.x, gravity.y);
  gravityB.mult(moverB.mass);
  moverB.applyForce(gravityB);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverB.applyForce(wind);
  }
  if (moverB.contactEdge()) {
    let c = 0.9;
    let friction = moverB.vel.copy();
    friction.mult(-1);
    friction.mult(c);
    moverB.applyForce(friction);
  }
  //update 의 앞에서 하기
  // 실행 시켰을때 공이 바닥의 마찰면떄문에 클릭바람을 하지 않는 이상 움직임이 멈춤 (힘을 점점 잃게 된다.)
  moverB.update();
  moverB.checkEdges();
  moverB.display();
  moverB.displayVectors();
  //두 질량이 다른 공이 질량이 다르지만 똑같이 떨어지는 것을 볼 수 있다.
  //_중력을 정확하게 시뮬레이션 하는 방법이다.
}
