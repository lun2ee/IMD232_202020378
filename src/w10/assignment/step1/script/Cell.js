class Cell {
  constructor(x, y, w, h, isClickable = true) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isClickable = isClickable;
    this.state = false;
    this.nextState = this.state;
    this.neighbors = [];
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  calcNextState() {
    const winCount = this.neighbors.reduce((count, neighbor) => {
      if (neighbor && (neighbor.state + 1) % 3 === this.state) {
        return count + 1;
      }
      return count;
    }, 0);

    if (winCount <= 2) {
      // 방어: 이길 수 있는 셀이 2개 이하일 때
      this.nextState = this.state;
    } else {
      // 점령당함: 이길 수 있는 셀이 2개 초과일 때
      const winningNeighbors = this.neighbors.filter(
        (neighbor) => neighbor && (neighbor.state + 1) % 3 === this.state
      );
      this.nextState =
        winningNeighbors.length > 0 ? winningNeighbors[0].state : this.state;
    }
  }

  update() {
    this.state = this.nextState;
  }

  isHover(mx, my) {
    return (
      this.x < mx && this.x + this.w > mx && this.y < my && this.y + this.h > my
    );
  }

  toggleState(mx, my) {
    if (!this.isClickable) return false;
    if (!this.isHover(mx, my)) return false;
    this.state = !this.state;
    return true;
  }

  display(mx, my) {
    push();
    translate(this.x, this.y);
    stroke(this.isHover(mx, my) ? 'red' : 'black');

    switch (this.state) {
      case 0: // rock
        fill(255, 0, 255);
        break;
      case 1: // paper
        fill(255, 255, 0);
        break;
      case 2: // scissors
        fill(0, 255, 255);
        break;
      default:
        fill(255);
        break;
    }

    rect(0, 0, this.w, this.h);
    pop();
  }
}
