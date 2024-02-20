// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = 'white';
    this.size = 10;
    this.lineWidth = 3;
    this.realSize = this.size + this.lineWidth;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.realSize >= width) {
      this.x = width - this.realSize;
    }

    if (this.x - this.realSize <= 0) {
      this.x = 0 + this.realSize;
    }

    if (this.y + this.realSize >= height) {
      this.y = height - this.realSize;
    }

    if (this.y - this.realSize <= 0) {
      this.y = 0 + this.realSize;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.realSize + ball.size) {
          ball.exists = false;
        }
      }
    }
  }
}

const evilCirle = new EvilCircle(random(0, width), random(0, height));

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a':
      evilCirle.x -= evilCirle.velX;
      break;
    case 'd':
      evilCirle.x += evilCirle.velX;
      break;
    case 'w':
      evilCirle.y -= evilCirle.velY;
      break;
    case 's':
      evilCirle.y += evilCirle.velY;
      break;
  }
});

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

const ballCounter = document.querySelector('.ball-counter');

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  evilCirle.draw();
  evilCirle.checkBounds();
  evilCirle.collisionDetect();

  let existBalls = 0;
  for (const ball of balls) {
    if (ball.exists) {
      existBalls++;
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }

    ballCounter.textContent = `Ball count: ${existBalls}`;
  }

  requestAnimationFrame(loop);
}

loop();
