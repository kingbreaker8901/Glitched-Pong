//Glitched Pong, by Tru and Tommy
//ART-259, Prof. Stannard
//Fall 2023

let ball;
let ballX;
let ballY;
let paddle1;
// let paddle1x;
let paddle2;
// let paddle2x;
let paddlewidth;
let xBallChange;
let yBallChange;
let shapes = ["ellipse", "rect", "triangle"];
let currentShape = "ellipse";
let backgroundImage;
let goalSound;
let scoreLeft = 0;
let scoreRight = 0;
let bgColor;
let soundTimer = 0;
const soundDuration = 1.1;
let winningScore = 20;
let gameState = "start";

function setup() {
  createCanvas(1000, 500);
  ball = new Ball();
  paddle1 = new paddleOne(100, 500);
  paddle2 = new paddleTwo(900, 500);
}

function preload() {
  backgroundImage = loadImage("football.webp");
  goalSound = loadSound("goal.mp3");
}

function draw() {
  background(backgroundImage);

  paddle1.show();
  paddle2.show();

  paddle1.move();
  paddle2.move();

  ball.show();
  ball.move();
  ball.collisionPaddleOne(paddle1);
  ball.collisionPaddleTwo(paddle2);

  let goal = ball.bounce();

  // Play the goal sound
  if (goal === "left") {
    scoreLeft++;
    goalSound.play(); // Play the goal sound
    soundTimer = soundDuration;
    ball.reset();
  } else if (goal === "right") {
    scoreRight++;
    goalSound.play();
    soundTimer = soundDuration;
    ball.reset();
  }

  // Display the scores
  textSize(50);
  stroke(0);
  strokeWeight(2);
  fill(255);
  text(scoreLeft, 50, 50);
  text(scoreRight, width - 70, 50);

  //Sound Timer
  if (soundTimer > 0) {
    soundTimer -= 1 / frameRate();
  }
  if (soundTimer <= 0) {
    goalSound.stop();
  }

  // Check for a winning condition
  if (scoreLeft >= winningScore) {
    text("Left Side Wins!", width / 2 - 200, height / 2);
    noLoop(); // Stop the game loop
  } else if (scoreRight >= winningScore) {
    text("Right Side Wins!", width / 2 - 200, height / 2);
    noLoop(); // Stop the game loop
  }
    if (gameState === "start") {
    startScene(); // Display the start scene
  } else if (gameState === "playing") {
    // playGame();
  } else if (gameState === "gameover") {
    // gameOverScene();
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = random(10);
    this.xSpeed = random(-10);
    this.ySpeed = random(10);
  }

  show() {
    fill(random(255));
    if (currentShape === "ellipse") {
      ellipse(this.x, this.y, this.radius * random(10));
    } else if (currentShape === "rect") {
      rect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * random(10),
        this.radius * random(10)
      );
    } else if (currentShape === "triangle") {
      triangle(
        this.x * random(2),
        this.y  * random(2) - this.radius * random(2),
        this.x * random(2) - this.radius * random(2),
        this.y * random(2) + this.radius * random(2),
        this.x * random(2) + this.radius * random(2),
        this.y * random(2) + this.radius * random(2)
      );
    }
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  bounce() {
    if (this.x - this.radius < 0) {
      this.xSpeed *= -1;
      randomizeShape();
      return "right";
    } else if (this.x + this.radius > width) {
      this.xSpeed *= -1;
      return "left";
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.ySpeed *= -1;
      randomizeShape();
    }
    return null;
  }

  collisionPaddleOne(other) {
    if (this.x - 10 < other.x + other.w / 2) {
      if (this.y < other.y + other.h / 2 && this.y > other.y - other.h / 2) {
        print("something1");
        this.xSpeed *= -1;
      }
    }
  }

  collisionPaddleTwo(other) {
    if (
      this.x + 10 > other.x - other.w / 2 &&
      this.y < other.y + other.h / 2 &&
      this.y > other.y - other.h / 2
    ) {
      print("something2");
      this.xSpeed *= -1;
    }
  }
  
  reset() {
    this.x = width / random(2);
    this.y = height / 1 / random(2);
  }
}

function startScene() {
  background(backgroundImage);
  textSize(50);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Press SPACE to Start", width / 2, height / 2);
}

function randomizeShape() {
  currentShape = random(shapes);
}
function keyPressed() {
  if (gameState === "start" && key === " ") {
    gameState = "playing";
    loop();
  } else if (gameState === "gameover" && key === " ") {
    resetGame();
  }
}

function resetGame() {
  scoreLeft = 0;
  scoreRight = 0;
  ball.reset();
  gameState = "playing";
  loop();
}