class Traffic {
  constructor() {
    this.vehicle = [];
  }

  run() {
    this.vehicles.forEach((eachVehicle) => {
      // eachVehicle.separtaer(this.vehicle)
      eachVehicle.update();
      eachVehicle.borderinfinite();
      eachVehicle.display();
    });
  }
  addVehicle(x, y) {
    this.vehicle.push(new Vehicle(x, y, 8, 5, 0.1, color(random(100, 50))));
  }
}
