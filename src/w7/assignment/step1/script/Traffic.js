class Traffic {
  constructor() {
    this.vehicles = [];
    // 여러 vehicle을 갖고있어라.(vehicles 배열은 여러 차량을 저장하기 위한 빈 배열이다.)
  }

  run() {
    this.vehicles.forEach((eachVehicle) => {
      const separate = eachVehicle.separate(this.vehicles); // 다른 화살표와 부딪힘을 피하려는 힘 계산
      separate.mult(1); // 부딪힘 힘에 가중치 적용
      eachVehicle.applyForce(separate); // 부딪힘 힘을 화살표에 적용

      const align = eachVehicle.align(this.vehicles); // 주위 화살표들과 방향 일치하려는 힘 계산
      align.mult(0.5); // 방향 일치 힘에 가중치 적용
      eachVehicle.applyForce(align); // 방향 일치 힘을 화살표에 적용

      const cohesion = eachVehicle.cohesion(this.vehicles); // 주위 화살표들과 응집하려는 힘 계산
      cohesion.mult(0.5); // 응집 힘에 가중치 적용
      eachVehicle.applyForce(cohesion); // 응집 힘을 화살표에 적용
      eachVehicle.update();
      eachVehicle.borderInfinite();
      eachVehicle.display();
    });
  }
  addVehicle(X, Y) {
    const mass = floor(random(1, 3));
    // mass 변수를 생성하고 1과 2 사이의 무작위 값을 할당한다.
    this.vehicles.push(
      new Vehicle(x, y, mass, mass * 16, 5, 0.1, color(random(360), 100, 40))
    );
  }
}
