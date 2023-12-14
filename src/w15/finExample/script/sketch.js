const unis = [];

function setup() {
  createCanvas(800, 800);
  var canvas = document.createElement('mySketchGoesHere');
  canvas.id = 'mySketchGoesHere';

  document.body.appendChild(canvas);

  for (let azimNum = 0; azimNum < 10; azimNum++) {
    for (let zeniNum = 0; zeniNum < 10; zeniNum++) {
      unis.push(new Uni((TAU / 16) * azimNum, (TAU / 8) * zeniNum, 300, 100));
    }
  }

  background('black');
}

function draw() {
  background('black');
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = color(207, 7, 99);
  translate(width / 2, height / 2);
  stroke('white');
  strokeWeight(1);
  unis.forEach((eachUni) => {
    eachUni.randomAcc();
    eachUni.update();
    eachUni.display();
  });
  console.log(unis[0]);
}
