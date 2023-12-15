class Uni {
  constructor(azimuth, zenith, rad, beginRad) {
    //고개를 좌우로 하는 각 (방위각)
    this.azimuth = azimuth;
    this.azimVel = 0; //방위각의 속도 초기화
    this.azimAcc; //방위각의 가속도

    //고개를 위아래로 하는 각 (경사각) <나는 배고픈각>
    this.zenith = zenith;
    this.zeniVel = 0; //경사각의 속도 초기화
    this.zeniAcc; //경사각의 가속도

    //반지름 (끝점) 초기화
    this.rad = rad;
    //시작점 반지름 초기화
    this.beginRad = beginRad;
  }

  //무작위로 가속도를 설정하는 메서드
  randomAcc() {
    this.azimAcc = random((-0.15 * TAU) / 360, (0.15 * TAU) / 360);
    this.zeniAcc = random((-0.15 * TAU) / 360, (0.15 * TAU) / 360);
    //가속도를 무작위로 설정
    //TAU는 전체 원주율을 나타냄.
    //우리모두ㅡ 다함꼐 차차차
  }

  update() {
    // constrain : 값을 최솟값과 최대값 사이에 제한한다.
    // constrain (제한할 숫자, 최소 한계, 최대 한계)
    this.azimVel += this.azimAcc;
    this.azimVel = constrain(this.azimVel, (-1 * TAU) / 360, (1 * TAU) / 360);
    this.azimuth += this.azimVel;

    this.zeniVel += this.zeniAcc;
    this.zeniVel = constrain(this.zeniVel, (-1 * TAU) / 360, (1 * TAU) / 360);
    this.zenith += this.zeniVel;
  }

  display() {
    for (let i = 0; i <= 5; i++) {
      const fraction = i / 5;
      const point = this.polarToCartesian(
        lerp(this.beginRad, this.rad, fraction)
      );
      ellipse(point.x, point.y, 5);
    }

    const endPoint = this.polarToCartesian(this.rad);
    const beginPoint = this.polarToCartesian(this.beginRad);

    console.log('begin', beginPoint);
    console.log('end', endPoint);

    line(beginPoint.x, beginPoint.y, endPoint.x, endPoint.y);
    ellipse(beginPoint.x, beginPoint.y, 1);
    ellipse(endPoint.x, endPoint.y, 5);
  }

  polarToCartesian(rad) {
    return {
      x: rad * sin(this.zenith) * cos(this.azimuth),
      y: rad * sin(this.zenith) * sin(this.azimuth),
      z: rad * cos(this.zenith),
    };
  }
}
