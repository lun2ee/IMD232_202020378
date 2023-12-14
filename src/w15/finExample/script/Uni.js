class Uni {
  constructor(azimuth, zenith, rad, beginRad) {
    //고개를 좌우로 하는 각 (방위각)
    this.azimuth = azimuth;
    this.azimVel = 0;
    this.azimAcc;

    //고개를 위아래로 하는 각 (경사각) <나는 배고픈각>
    this.zenith = zenith;
    this.zeniVel = 0;
    this.zeniAcc;

    //반지름 (끝점)
    this.rad = rad;
    //시작점 반지름
    this.beginRad = beginRad;
  }

  randomAcc() {
    this.azimAcc = random((-0.15 * TAU) / 360, (0.15 * TAU) / 360);
    this.zeniAcc = random((-0.15 * TAU) / 360, (0.15 * TAU) / 360);
    //우리모두ㅡ 다함꼐 차차차
  }

  update() {
    this.azimVel += this.azimAcc;
    this.azimVel = constrain(this.azimVel, (-3 * TAU) / 360, (3 * TAU) / 360);
    this.azimuth += this.azimVel;

    this.zeniVel += this.zeniAcc;
    this.zeniVel = constrain(this.zeniVel, (-3 * TAU) / 360, (3 * TAU) / 360);
    this.zenith += this.zeniVel;
  }

  display() {
    const endPoint = this.polarToCartesian(this.rad);
    const beginPoint = this.polarToCartesian(this.beginRad);
    console.log('begin', beginPoint);
    //소누성 그는 고누성
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
