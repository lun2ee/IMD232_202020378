// let x;
// let y;
let pos;
// let acc;
// let radius = 80;
let vel = [3, 5];

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background(255);
  // pos = createVector(width / 2, height / 2);
  // vel = createVector(3, 5);
  // // vel = createVector(0, 0);
  // // fill('pink');
  // ellipse(pos[0], pos[0], 50);
  pos = [width / 2, height / 2];
  console.log('pos', pos);
  console.log('vel', vel);
}

function draw() {
  background(255);
  // acc = p5.vecter.random20();
  // acc.mult(random(2));
  // vel.add(acc);
  pos[0] += vel[0];
  pos[1] += vel[1];
  ellipse(pos[0], pos[1], 50);
  // if (pos.x < 0) {
  //   vel.x *= -1;
  // } else if (pos.x > width) {
  //   vel.x *= -1;
  // }
  if (pos[0] < 0 || pos[0] > width) {
    vel[0] *= -1;
  }
  if (pos[1] < 0 || pos[1] > height) {
    vel[1] *= -1;
  }
}
