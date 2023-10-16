let emitter;
let particle;
let g;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);

  colorMode(HSL, 360, 100, 100);
  particle = new Ball(width / 2, 0, 1, 0, 100, 50);

  emitter = new Emitter(width / 2, height);

  g = createVector(0, 0.1);

  background('white');
}
function draw() {
  background('white');
  const scaledG = p5.Vector.mult(g, particle.mass);
  particle.applyForce(scaledG);
  particle.update();
  particle.display();

  emitter.createBall();
  emitter.applyGravity(g);
  emitter.update();
  emitter.display();
  console.log(emitter.balls.length);
  //한없이 뜨는거 해결?
}
