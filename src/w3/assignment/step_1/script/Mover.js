class Mover {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.rad = rad;
  }

  createRandomAcc() {
    this.acc = p5.Vector.random2D();
    this.acc.mult(0.05);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  display() {
    stroke('black');
    strokeWeight(4);
    fill('white');
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }
}
