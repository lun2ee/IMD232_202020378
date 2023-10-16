class Mover {
  constructor(x, y, m) {
    this.mass = m;
    this.radius = m ** (1 / 2) * 8;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.velocityVisualization = createVector(0, 0);
    this.accelerationVisualization = createVector(0, 0);
  }

  applyForce(force) {
    let forceDividedByMass = p5.Vector.div(force, this.mass);
    this.acceleration.add(forceDividedByMass);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.velocityVisualization.set(this.velocity);
    this.velocityVisualization.mult(10);

    this.accelerationVisualization.set(this.acceleration);
    this.accelerationVisualization.mult(100);

    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    ellipse(this.position.x, this.position.y, 2 * this.radius);
  }

  displayVectors() {
    noFill();
    stroke('red');
    line(
      this.position.x,
      this.position.y,
      this.position.x + this.velocityVisualization.x,
      this.position.y + this.velocityVisualization.y
    );
    stroke('blue');
    line(
      this.position.x,
      this.position.y,
      this.position.x + this.accelerationVisualization.x,
      this.position.y + this.accelerationVisualization.y
    );
  }

  contactEdge() {
    return this.position.y >= height - this.radius;
  }

  bounceEdges() {
    let bounce = -0.5;
    if (this.position.x > width - 1 - this.radius) {
      this.position.x -= width - 1 - this.radius;
      this.position.x *= -1;
      this.position.x += width - 1 - this.radius;
      this.velocity.x *= bounce;
    } else if (this.position.x < this.radius) {
      this.position.x -= 0 + this.radius;
      this.position.x *= -1;
      this.position.x += 0 + this.radius;
      this.velocity.x *= bounce;
    }
    if (this.position.y > height - 1 - this.radius) {
      this.position.y -= height - 1 - this.radius;
      this.position.y *= -1;
      this.position.y += height - 1 - this.radius;
      this.velocity.y *= bounce;
    }
  }
}
