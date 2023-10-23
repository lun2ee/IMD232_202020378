class Emitter {
  constructor() {
    this.particles = [];
    this.pos = createVector(x, y);
  }
  addParticle() {
    this.particles.push(new this.Particles(this.pos.x, this.pos.y));
  }
  update() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
    }
  }
  display() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].display();
    }
  }
}
