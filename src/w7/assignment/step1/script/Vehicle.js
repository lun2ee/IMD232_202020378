class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    this.pos = createVector(x, y);
    // 위치에대한 변수 = 백터로 만들어줄것이다(constructor에서 x,y 값을 받아서 초기의 위치로 삼으려고 함.).
    this.vel = p5.Vector.random2D();
    // 속도에대한 변수 = 길이는 1이고, 방향은 무작위인, 초기 속도를 만들어놓고 시작.
    this.acc = createVector();
    // 가속도에대한 변수 = 백터로 만들어줄것이다.
    this.mass = mass;
    // 질량에대한 변수 = 값을 받아올것
    this.rad = rad;
    // 반지름에대한 변수 = 값을 받아올것
    this.speedMx = speedMx;
    // 최대 속력에 대한 변수 = 값을 받아올것
    this.forceMx = forceMx;
    // 최대힘에 대한 변수 = 값을 받아올것
    this.neighborhooodRad = 50;
    this.color = color;
    // 칼라에대한 변수 = 값을 받아올것
  }
  cohesion(others) {
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          steer.add(each.pos);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      steer.sub(this.pos);
      steer.setMag(this.speedMx);
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  align(others) {
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          steer.add(each.vel);
          //   steer.add(p5.Vector.normalize(each.vel));
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      steer.setMag(this.speedMx);
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  separate(others) {
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        const dist = this.pos.dist(each.pos);
        if (dist > 0 && this.rad + each.rad > dist) {
          const distNormal = dist / (this.rad + each.rad);
          const towardMeVec = p5.Vector.sub(this.pos, each.pos);
          towardMeVec.setMag(1 / distNormal);
          steer.add(towardMeVec);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      steer.setMag(this.speedMx);
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  applyForce(force) {
    const forcDivedByMass = p5.Vector.div(force, this.mass);
    // 외부에서 힘을 받아오는데,이 힘을 나눠줘야한다. =  (force를 mass로 나누도록 함.)
    this.acc.add(forceDivedByMass);
    // 최종적으로 acc에다가 적용
  }
  update() {
    this.vel.add(this.acc);
    // velocity 에다가 acc 를 더해줌,
    this.vel.limit(this.speedMx);
    // velocity 는 최대치가 아무리 커지더라도 speedMx 로 한계치가 걸려야 한다.
    this.pos.add(this.vel);
    // position 에다가 vel 를 더해줌,
    this.acc.mult(0);
    // 가속도는 매번 초기화가 되어야해서 (0)
  }
  borderInfinite() {
    if (this.pos.x < -infinteOffset) {
      this.pos.x = width + infiniteOffset;
    } else if (this.pos.x > width + infiniteOffset) {
      this.pos.x = -infiniteOffset;
    }
    if (this.pos.y < -infinteOffset) {
      this.pos.y = height + infiniteOffset;
    } else if (this.pos.x > height + infiniteOffset) {
      this.pos.y = -infiniteOffset;
    }
  }

  display() {
    push();
    // push()는 그래픽 상태를 저장하는 p5.js 함수 이다. (특징)이는 이전 그래픽 상태를 후속 그리기 작업이 현재 그래픽 상태를 변경하지 않도록 한다.
    translate(this.pos.x, this.pos.y);
    // 현재 객체의 위치 this.pos 를 기준으로 그림을 그리기 위해 캔버스 내에서의 좌표를 이동시킨다.
    rotate(this.vel.heading());
    noStroke();
    // 그림을 그릴때 선은 그리지 않을 것.
    fill(this.color);
    // 우리가 변수로 지정해준 칼라로 칠할 것
    beginShape();
    // 다각형을 그리기 시작한다.
    vertex(this.rad, 0);
    // 다각형의 한 꼭지점을 나타내며, 이꼭지점을 현재 객체의 중심에서 반지름(this.rad) 만큼 떨어진 위치에 있다.
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    // 각도 -135도에 대한 코사인과 사인값을 계산하여 그릴 다각형의 정점을 추가한다.
    vertex(0, 0);
    // 0,0 위치에다가 찍어줄것이다.
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    // 각도 135도에 대한 코사인과 사인값을 계산하여 그릴 다각형의 정점을 추가한다.
    endShape(CLOSE);
    // 다각형을 마감하여 그림을 완료한다.
    pop();
    // 그래픽 상태를 이전 상태로 복원한다.
  }
}
