let cv;
let mv;
let cvToMv;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('slateblue');
  cv = createVector(width / 2, height / 2);
  mv = createVector();
  cvTomv = createVector();
}
function draw() {
  background('slateblue');

  mv.set(mouseX, mouseY);
  cvToMv = p5.Vector.sub(mv, cv);
  let mag = cvToMv.mag();
  noStroke();
  fill('white');
  rect(10, 10, mag, 10);

  strokeWeight(2);
  stroke('white');
  translate(cv.x, cv.y);
  line(0, 0, cvToMv.x, cvToMv.y);
  //   길이가 똑같이 대응하는 것을 볼 수 있음 (길이가 얼마냐를 뽑아줌)
  //   mag 는 항상 양수로 나옴
}
