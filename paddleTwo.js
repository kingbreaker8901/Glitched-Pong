class paddleTwo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 15;
    this.h = 80;
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(random(255), 0, 0);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= random(10);
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += random(10);
    } else {
      this.y += 0;
    }
  }
}
