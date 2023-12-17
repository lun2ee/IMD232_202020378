let p0, p1;

function setup() {
  createCanvas(600, 600);

  var canvas = document.createElement('mySketchGoesHere');
  canvas.id = 'mySketchGoesHere';

  document.body.appendChild(canvas);
  p0 = new Particle(0, 300); //(x,y)_anchor
  p1 = new Particle(300, 0);
  p2 = new Particle(400, 0);
  p3 = new Particle(600, 300); //(x,y)_anchor
}
function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);
  //   line(p0.x, p0.y, p1.x, p1.y);

  //   p1.x = mouseX;
  //   p1.y = mouseY;

  //   p0.update();
  p1.update();
  p2.update();
  //   p3.update();

  let delta = 0.05;
  colorMode(HSB);
  //delta 의 값이 작아질수록, 점의 개수가 늘어남

  //0에서 100% 까지 t 를 반복_control point 를 반복
  //t 는 lerp(x0,x1,0.5) 중에서 0.5에 해당_0.5 는 선의 중앙 50%

  noFill();

  for (let t = 0; t <= 1.00001; t += delta) {
    // stroke(t * 360, 255, 255);
    let v = cubic(p0, p1, p2, p3, t);

    // vertex(v.x, v.y);
    //x0+(x1-x0)*t  t=0.2 공식을 적용
    // let x = p0.x + (p1.x - p0.x) * t;
    // let y = p0.y + (p1.y - p0.y) * t;
    //lerp 함수를 사용하여 선긋기
    // let x1 = lerp(p0.x, p1.x, t);
    // let y1 = lerp(p0.y, p1.y, t);
    // let x2 = lerp(p1.y, p2.y, t);
    // let y2 = lerp(p1.y, p2.y, t);
    // line(x1, y1, x2, y2);
    // let x = lerp(x1, x2, t);
    // let y = lerp(y1, y2, t);
  }
}

function cubic(p0, p1, p2, p3, t) {
  let v1 = quadratic(p0, p1, p2, t);
  let v2 = quadratic(p1, p2, p3, t);
  let x = lerp(v1.x, v2.x, t);
  let y = lerp(v1.y, v2.y, t);

  //   line(v1.x, v1.y, v2.x, v2.y);
  return createVector(x, y);
}

function quadratic(p0, p1, p2, t) {
  let x1 = lerp(p0.x, p1.x, t);
  let y1 = lerp(p0.y, p1.y, t);
  let x2 = lerp(p1.x, p2.x, t);
  let y2 = lerp(p1.y, p2.y, t);
  let x = lerp(x1, x2, t);
  let y = lerp(y1, y2, t);

  line(x1, y1, x2, y2);
  return createVector(x, y);
}
