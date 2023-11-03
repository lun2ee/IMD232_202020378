class Traffic {
  constructor() {
    this.vehicles = [];
    // 여러 vehicle을 갖고있어라.(vehicles 배열은 여러 차량을 저장하기 위한 빈 배열이다.)
  }

  run() {
    this.vehicles.forEach((eachVehicle) => {
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
