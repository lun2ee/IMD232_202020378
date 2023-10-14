class MoverWithMass {
  constructor(x, y, mass) {
    // 조정 한것 1 : 더이상 반지름을 받지 않고, 질량을 받도록 조정함.
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.accDisplay = createVector(0, 0);
    this.mass = mass;
    this.radius = this.mass ** 0.5 * 10;
    //조정한 것 2: 반지름은 질량에 비례해서 바뀌도록 함.
    // 길이가 2배가 되면, 무게는 4배가 됨. 두배가 되는 정도로 하려면 제곱근 만큼만 커져야 함.

    // 무거운 물체 vs 가벼운 물체 위에서 떨어뜨렸을때 떨어지는 속도는 같음.(똑같은 중력을 가하고 있기 때문임. )
    //그런데 우리의 시뮬레이션에서는 "오류"가 있음. (무거운것이 훨씬 더 느리게 떨어짐.)
    // 중력은 물체가 가진 질량에 비례해서 적용이 되어야 한다. _step_4
  }
  applyForce(force) {
    let forceDividedByMass = createVector(force.x, force.y);
    forceDividedByMass.div(this.mass);
    this.acc.add(forceDividedByMass);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.accDisplay.set(this.acc);
    this.acc.mult(0);
    // 초기화 시켜주기
  }

  checkEdges() {
    if (this.pos.x < 0) {
      //   // 0보다 얼마나 뚫고 갔는가?
      //   let delta = this.pos.x - 0;
      //   // 그 뚫고 간 거리에 -1을 곱해 방향을 뒤집고,
      //   delta *= -1;
      //   //0을 기준으로 뒤집힌 거리를 더해준다.
      //   this.pos.x = 0 + delta;

      this.pos.x -= 0;
      this.pos.x *= -1;
      this.pos.x += 0;
      this.vel.x *= -1;
    } else if (this.pos.x > width - 1) {
      this.pos.x -= width - 1;
      this.pos.x *= -1;
      this.pos.x += width - 1;
      this.vel.x *= -1;
    }
    if (this.pos.y > height - 1) {
      this.pos.y -= height - 1;
      this.pos.y *= -1;
      this.pos.y += height - 1;
      this.vel.y *= -1;
    }
  }

  display() {
    noStroke();
    fill(0);
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }
  displayVectors() {
    stroke('red');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
    stroke('lime');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.accDisplay.x * 100,
      this.pos.y + this.accDisplay.y * 100
    );
  }
}
