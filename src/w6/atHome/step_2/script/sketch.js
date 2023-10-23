// let particle;
let particleArray = [];
let gravity = 0;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);

  particle = new Particle(width / 2, 20);
  gravity = createVector(0, 0.05);

  for (let a = 0; a < 8000; a++) {
    particleArray.push(new Particle(width / 2, 20));
  }

  background(255);
}

function draw() {
  particleArray.push(new Particle(width / 2, 20));

  background(255);
  for (let a = 0; a < particleArray.length; a++) {
    particleArray[a].applyForce(gravity);
    particleArray[a].update();
    particleArray[a].display();
  }

  for (let a = particleArray.length - 1; a >= 0; a--) {
    if (particleArray[a].isDead()) {
      particleArray.splice(a, 1);
      //   particleArray.splice(a, 1); -> a번부터 1개를 빼버린다.
      //   Array.splice(3,3) 3번부터 3개를 빼버린다
    }
  }
  console.log(particleArray.length);
}
