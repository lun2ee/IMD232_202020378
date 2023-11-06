let traffic;
// Traffic 객체를 저장할 변수
let infiniteOffset = 80;
//화면 경계를 넘어가기 위한 offset 값

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  // 캔버스를 HTML 요소에 배치하는 설정
  colorMode(HSL, 360, 100, 100, 100);
  //   컬러모드를 HSL로 설정하여 색상을 조절
  background('white');
  //   배경색은 ("흰색")
  traffic = new Traffic();
  // Traffic 객체를 생성하고 변수에 할당
  for (let n = 0; n < 10; n++) {
    //반복문을 시작한다.
    //n변수가 0에서 9까지 10번 반복된다.
    traffic.addVehicle(random(width), random(height));
    //반복문 내부에서 traffic 객체의 addVehicle메서드를 호출하여 차량을 추가한다.
    // random(width) 및 random(height)는 캔버스 내에서 무자위로 선택된 x와 y 좌표를 나타낸다. 이것을 차량을 무작위 위치에서 배치하는 데 사용된다.
  }
}

function draw() {
  background('white');
  //// 매 프레임마다 배경색을 흰색으로 지정하여 새로운 프레임을 그림
  traffic.run();
  //Traffic 객체의 run() 함수를 호출하여 차량들을 업데이트하고 표시
}

function mouseDragged() {
  traffic.addVehicle(mouseX, mouseY);
  // 마우스를 드래그할 때마다 새로운 차량을 마우스 위치에 추가
}
