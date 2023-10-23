class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = rad;
    this.speedMx = speedMx;
    this.forceMx = forceMx;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.speedMx);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  display() {
    const angle = this.vel.heading();
    fill(127);
    stroke(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    beginShape();
    vertex(this.rad * 2, 0);
    vertex(-this.rad * 2, -this.rad);
    vertex(-this.rad * 2, this.rad);
    endShape(CLOSE);
    pop();
  }

  seek(target) {
    const steer = p5.Vector.sub(target, this.pos);
    steer.setMag(this.speedMx);
    steer.sub(this.vel);
    steer.limit(this.forceMx);
    this.applyForce(steer);
  }
}
