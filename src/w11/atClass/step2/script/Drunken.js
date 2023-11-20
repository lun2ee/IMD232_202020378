class Drunken {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D;
    this.vel.mult(5);
    this.acc = createVector();
    this.mass = 1;
  }
  applyForce(force) {
    const calaAcc = p5.Vector.div(force, this.mass);
    this.acc.add(calaAcc);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  display() {
    stroke(0);
  }
}
