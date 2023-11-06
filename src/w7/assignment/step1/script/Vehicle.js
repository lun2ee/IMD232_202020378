class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    this.pos = createVector(x, y);
    //위치에 대한 변수 = 백터로 만들어 줄것이다 (constructor에서 x,y 값을 받아서 초기의 위치로 삼으려고 함)
    this.vel = p5.Vector.random2D();
    //속도에 대한 변수 = 길이는 1이고, 방향은 무작위인 초기 속도를 만들어 놓고 시작.
    this.acc = createVector();
    //가속도에 대한 변수 = 백터로 만들어 줄것이다.
    this.mass = mass;
    //질량에 대한 변수 = 값을 받아올것
    this.rad = rad;
    //반지름에 대한 변수 = 값을 받아올것
    this.speedMx = speedMx;
    //최대 속력에 대한 변수 = 값을 받아올것
    this.forceMx = forceMx;
    //최대 힘에 대한 변수 = 값을 받아올것
    this.neighborhooodRad = 50;
    // 현재 차량 주변 50단위 내에 있는 다른 차량들을 "주변 차량"으로 간주하고 상호작용에 활용할 것이다.
    this.color = color;
    //칼라에 대한 변수 = 값을 받아올것.
  }

  cohesion(others) {
    //차량이 주변의 다른 차량들과 함께 모이려고 하는 힘을 계산하는 함수

    //주변 차량의 위치를 함께 모으기 위한 변수들을 초기화한다.
    let cnt = 0;
    //함께 모이는 차량의 수를 나타내는 카운터
    const steer = createVector(0, 0);
    //모인 위치를 나타내는 벡터

    others.forEach((each) => {
      //주변 차량들을 반복하며 모이기 위한 위치를 계산한다.
      if (each !== this) {
        // 현재 차량 자체는 제외한다.
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        //주변 차량과의 거리가 neighborhoodRad 이내인 경우,함께 모을 위치로 추가한다.
        if (distSq < this.neighborhooodRad ** 2) {
          steer.add(each.pos);
          //위치를 누적한다.
          cnt++;
          //함께 모이는 차량 수를 증가시킨다.
        }
      }
    });
    if (cnt > 0) {
      //함께 모이는 차량이 있는 경우,
      steer.div(cnt);
      // 모인 위치를 차량 수로 나누어 평균 위치를 계산한다.
      steer.sub(this.pos);
      // 평균 위치와 현재 차량 위치의 차이를 계산한다.
      steer.setMag(this.speedMx);
      // 차량의 최대 속도로 조절한다.
      steer.sub(this.vel);
      // 차량의 현재 속도와의 차이를 계산한다.
      steer.limit(this.forceMx);
      // 차량에 적용할 수 있는 최대 힘으로 제한한다.
    }
    return steer;
    //최종적으로 계산된 모이기 위한 힘을 반환한다.
  }

  align(others) {
    //차량이 주변의 다른 차량들과 방향을 일치시키려고 하는 힘을 계산하는 함수이다.

    //주변 차량들의 방향을 일치시키기 위한 변수들을 초기화한다.
    let cnt = 0;
    //방향을 일치시키는 차량의 수를 나타내는 카운터
    const steer = createVector(0, 0);
    //방향을 일치시킬 차량의 수를 나타내는 벡터
    others.forEach((each) => {
      //주변 차량들을 반복하며 방향을 일치시키기 위한 힘을 계산한다.
      if (each !== this) {
        // 현재 차량 자체는 제외한다.
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        // 주변 차량과의 거리가 neighborhooodRad 이내인 경우, 방향을 일치시키기 위한 힘으로 추가한다.
        if (distSq < this.neighborhooodRad ** 2) {
          steer.add(each.vel);
          //방향을 일치시킬 힘을 누적한다.
          //   steer.add(p5.Vector.normalize(each.vel));
          cnt++;
          //방향을 일치시키는 차량 수를 증가시킨다.
        }
      }
    });
    if (cnt > 0) {
      //방향을 일치시키는 차량이 있는 경우
      steer.div(cnt);
      //방향을 일치시키는 힘을 차량 수로 나누어 평균 힘을 계산한다.
      steer.setMag(this.speedMx);
      //차량의 최대 속도로 조절한다.
      steer.sub(this.vel);
      //차량의 현재 속도와의 차이를 계산한다.
      steer.limit(this.forceMx);
      //차량에 적용할 수 있는 최대 힘으로 제한한다.
    }
    return steer;
    //최종적으로 계산된 방향을 일치시키기 위한 힘을 반환한다.
  }

  separate(others) {
    //차량이 주변의 다른 차량들과 충돌을 피하려고 하는 힘을 계산하는 함수이다.

    //충돌을 피하기 위한 변수들을 초기화한다.
    let cnt = 0;
    //충돌을 피하는 차량의 수를 나타내는 카운터

    const steer = createVector(0, 0);
    //충돌을 피하기 위한 힘을 나타내는 벡터
    others.forEach((each) => {
      //주변 차량들을 반복하며 충돌을 피하기 위한 힘을 계산한다.
      if (each !== this) {
        //현재 차량 자체는 제외한다.
        const dist = this.pos.dist(each.pos);
        //현재 차량과 다른 차량 간의 거리를 계산한다.
        if (dist > 0 && this.rad + each.rad > dist) {
          //충돌을 피하려는 조건을 확인한다.
          // 조건 : 두 차량 사이의 거리가 0보다 크고, 두 차량의 반지름 합보다 작을 때, 충돌을 피하기 위한 행동을 취한다는 것을 의미한다.

          //충돌을 피하기 위해 계산된 벡터를 구한다.
          const distNormal = dist / (this.rad + each.rad);
          //dist 는 현재차량(this)와 다른차량(each) 간의 거리를 나타낸다.
          // this.rad+each.rad는 두 차량의 반지름 합을 나타낸다.
          //disNormal은 두 차량 사이의 거리(dist)를 두차량의 반지름 합(this.rad + each.rad)으로 나눈 비율을 나타낸다.
          // 이 값은 두 차량 사이의 중심 간의 거리가 두 차량의 반지름 합에 대한 상대적인 비율을 나타내며, 이를 "정규하된 거리"라고 할 수 있다.
          //두 차량 사이의 거리를 정규화된 거리로 나누어 힘의 크기를 정규화한다.
          // 이 값은 두차량 사이의 중김 간의 거리가 두 차량의 반지름 합에 대한 상대적인 비율을 나타내며, 이를 "정규화된 거리"라고 할 수 있다.
          const towardMeVec = p5.Vector.sub(this.pos, each.pos);
          //p5.Vector.sub(this.pos, each.pos) 는 현재차량의 위치에서 다른 차량의 위치를 뺸 벡터가를 계산한다.
          towardMeVec.setMag(1 / distNormal);
          // 방향 베거를 정규화된 거리로 나누어서, 두 차량이 서로 향하는 힘을 나타내는 벡터를 계산한다.
          steer.add(towardMeVec);
          // 충돌을 피하기 위한 힘을 누적한다.
          cnt++;
          //충돌을 피하는 차량 수를 증가시킨다.
        }
      }
    });
    if (cnt > 0) {
      //충돌을 피하는 차량이 있는 경우,
      steer.div(cnt);
      //충돌을 피하기 위한 힘을 차량 수로 나누어 평균 힘을 계산한다.
      steer.setMag(this.speedMx);
      //차량의 최대 속도로 조절한다.
      steer.sub(this.vel);
      //차량의 현재 속도와의 차이를 계산한다.
      steer.limit(this.forceMx);
      //차량에 적용할 수 있는 최대 힘으로 제한한다.
    }
    return steer;
    //최종적으로 계산된 충돌을 피하기 위한 힘을 반환한다.
  }

  applyForce(force) {
    const forceDivedByMass = p5.Vector.div(force, this.mass);
    // 외부에서 힘을 받아오는데,이 힘을 나눠줘야한다. =  (force를 mass로 나누도록 함.)
    // 이 조정된 벡터는 외부 힘을 차량의 질량에 따라 조절한 값이다. 질량이 클수록 힘에 민감하게 반응한다.
    //force 는 외부에서 차량에 작용하는 힘을 나타내는 벡터이다.
    //this.mass 는 차량의 질량을 나타낸다.
    //p5.Vector.div(force, this.mass)는 force 벡터를 this.mass 로 나누어서 외부에서 작용하는 힘을 차량의 질량에 대한 가중치를 고려하여 조정한 벡터를 생성한다.
    this.acc.add(forceDivedByMass);
    // 최종적으로 acc에다가 적용
    //this.acc 는 차량의 가속도를 낱내는 벡터이다.
    //forceDivedByMass는 질량에 따라 조정된 외부힘을 나타내는 벡터이다.
    // 조정된 외부힘(forceDivedByMass)을 차량의 가속도에 누적(add)을 시킨다
    //결과적으로 차량은 외부 힘에 따라 가속도가 변하고, 이 가속도를 통해 차량의 속도와 위치가 갱신된다.
  }

  update() {
    this.vel.add(this.acc);
    // velocity 에다가 acc 를 더해줌
    this.vel.limit(this.speedMx);
    // velocity는 최대치가 아무리 커지더하도 speedMx 로 한게치가 걸려야 한다.
    this.pos.add(this.vel);
    // position 에다가 vel을 더해줌.
    this.acc.mult(0);
    // 가속도는 매번 초기화가 되어야해서 (0)
  }

  borderInfinite() {
    // 차량의 현재 위칙 화면 경계를 넘어가면 위치흫 조정하여
    // 반대편 화면으로 나타나게 하는 함수이다.

    //만약 차량이 화면 왼쪽 경계를 넘어간다면,
    if (this.pos.x < -infiniteOffset) {
      //차량의 x 좌표를 화면의 오른쪽 끝으로 이동.
      this.pos.x = width + infiniteOffset;
      //만약 차량이 화면 오른쪽 경계를 넘어간다면,
    } else if (this.pos.x > width + infiniteOffset) {
      //차량의 x 좌표를 화면의 왼쪽 끝으로 이동.
      this.pos.x = -infiniteOffset;
    }

    // 만약 차량이 화면 위쪽 경계를 넘어간다면,
    if (this.pos.y < -infiniteOffset) {
      // 차량의 y좌표를 화면의 아래쪽 끝으로 이동.
      this.pos.y = height + infiniteOffset;
      // 만약 차량이 화면 아래쪽 경계를 넘어간다면,
    } else if (this.pos.y > height + infiniteOffset) {
      // 차량의 y좌표를 화면의 위쪽 끝으로 이동.
      this.pos.y = -infiniteOffset;
      // 차량의 y좌표를 height에 infiniteOffset를 더한 값보다 크면, 차량의 y 좌표를 -infiniteOffset 로 설정하여, 차량을 화면 아래쪽 경계에서 화면 위쪽으로 나타나게 한다.
    }
  }

  display() {
    //그래픽 상태를 저장하는 p5.js함수인 push()를 호출한다.
    //이렇게 함으로써 이전 그래픽 상태를 후속 그리기 작업이 변경하지 않도록 한다.
    push();
    // push()는 그래픽 상태를 저장하는 p5.js 함수 이다. (특징)이는 이전 그래픽 상태를 후속 그리기 작업이 현재 그래픽 상태를 변경하지 않도록 한다.
    translate(this.pos.x, this.pos.y);
    // 현재 객체의 위치 this.pos 를 기준으로 그림을 그리기 위해 캔버스 내에서의 좌표를 이동시킨다.
    rotate(this.vel.heading());
    // 차량의 속도 벡터 this.vel.heading()에 따라 회전한다.
    noStroke();
    //외곽선 없이
    fill(this.color);
    // 색상 this.color로 채워진 도형을 그린다.
    beginShape();
    //모양을 그리기위해 beginShape()를 호출한다.
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
    // noFill();
    // stroke(0, 0, 60);
    // ellipse(0, 0, 2 * this.rad);
    // stroke(0, 0, 80);
    // ellipse(0, 0, 2 * this.neighborhooodRad);
    pop();
    // 그래픽 상태를 이전 상태로 복원한다.
  }
}
