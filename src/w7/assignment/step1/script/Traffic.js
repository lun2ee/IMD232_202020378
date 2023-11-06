class Traffic {
  constructor() {
    this.vehicles = [];
    // 여러 vehicles를 갖고 있어라 (vehicles 배열은 여러 차량을 저장하기 위한 빈 배열이다.)
  }

  run() {
    this.vehicles.forEach((eachVehicle) => {
      const separate = eachVehicle.separate(this.vehicles);
      //다른 화살표와 부딪힘을 피하려는 힘 계산.
      separate.mult(1);
      // 부딪힘 힘에 가중치 적용
      eachVehicle.applyForce(separate);
      //부딪힘 힘을 화살표에 적용
      const align = eachVehicle.align(this.vehicles);
      // 주위 화살표들과 방향 일치하려는 힘 계산
      align.mult(0.5);
      //벙형 알차 함애 가중치 적용
      eachVehicle.applyForce(align);
      //방향 일치 힘을 화살표에 적용
      const cohesion = eachVehicle.cohesion(this.vehicles);
      //주위 화살표들과 응집하려는 힘 계산.
      cohesion.mult(0.5);
      //응집 힘에 가중치 적용
      eachVehicle.applyForce(cohesion);
      // 차량 또는 객체에 대한 응집력힘을 적용
      eachVehicle.update();
      // 차량 또는 객체의 상태를 업데이트
      eachVehicle.borderInfinite();
      // 차량 또는 객체가 화면 경계를 넘어가는 것을 방지하는 기능을 나타냄.
      eachVehicle.display();
      // 차량 또는 객체를 시각적으로 표시함
    });
  }

  addVehicle(x, y) {
    //새로운 차량(또는 객체)을 생성하고 이를 vehicles 배열에 추가한다.
    //x와 y는 차량의 초기 위치이다.

    // const mass = floor(random(1, 3));
    const mass = 1;
    // mass 는 항상 1이다.

    //새로운 차량을 생성하고 vehicles 배열에 추가한다.
    this.vehicles.push(
      new Vehicle(x, y, mass, mass * 12, 5, 0.1, color(random(360), 100, 40))
    );
    //배열에 새로운 차량 객체를 추가하기 위해 push 함수를 사용한다.
    //x,y 는 차향의 초기 위치를 나타낸다, 해당 함수 호출 시 전달된 값에 따라 설정 된다.
    //mass*12는 차량의 반지름을 설정하는데 사용된다. 질량에 비례하여 반지름이 설정된다.
    // 5는 차량의 최대 속도를 나타낸다.
    // 0.1은 차량의 최대 힘을 나타낸다.
    // color(random(360), 100, 40)은 차량의 색상을 설정한다.
  }
}
