let moverA;
let moverB;
let gravity;
let wind;
let showVector = false;

function setup() {
  setCanvasContainer('mySketchGoesHere', 2, 1, true);
  moverA = new Mover(width / 3, 30, 10);
  moverB = new Mover((2 * width) / 3, 30, 2);
  gravity = createVector(0, 0.1);
  wind = createVector(0.1, 0);
}

function draw() {
  background(255);

  let gravityA = p5.Vector.mult(gravity, moverA.mass);
  moverA.applyForce(gravityA);
  let gravityB = p5.Vector.mult(gravity, moverB.mass);
  moverB.applyForce(gravityB);

  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }

  if (moverA.contactEdge()) {
    let c = 0.1;
    let friction = moverA.velocity.copy();
    friction.mult(-1);
    friction.mult(c);

    moverA.applyForce(friction);
  }

  if (moverB.contactEdge()) {
    let c = 0.5;
    let friction = moverB.velocity.copy();
    friction.mult(-1);
    friction.mult(c);

    moverB.applyForce(friction);
  }

  moverA.update();
  moverB.update();

  moverA.bounceEdges();
  moverB.bounceEdges();

  moverA.display();
  moverB.display();

  if (showVector) {
    moverA.displayVectors();
    moverB.displayVectors();
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    showVector = !showVector;
  }
}
