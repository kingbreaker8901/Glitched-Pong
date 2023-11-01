class paddleOne {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 15;
    this.h = 80;
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(0, 0, random(255));
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (keyIsDown(87)) {
      this.y -= random(10);
    } else if (keyIsDown(83)) {
      this.y += random(10);
    } else {
      this.y += 0;
    }
  }
}
