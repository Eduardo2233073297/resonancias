let bats = [];
let slidingShadows = [];
let darkPulses = [];
let trailGhosts = [];

function setup() {
  createCanvas(windowWidth, 500);
  noStroke();
  angleMode(DEGREES);
  background(30, 30, 40);

  document.body.style.margin = 0;
  document.body.style.overflow = 'hidden';
}

function draw() {
  background(30, 30, 40, 25);

  for (let i = bats.length - 1; i >= 0; i--) {
    bats[i].update();
    bats[i].display();
    if (bats[i].isDead()) {
      bats.splice(i, 1);
    }
  }

  for (let i = slidingShadows.length - 1; i >= 0; i--) {
    slidingShadows[i].update();
    slidingShadows[i].display();
    if (slidingShadows[i].isDead()) {
      slidingShadows.splice(i, 1);
    }
  }

  for (let i = darkPulses.length - 1; i >= 0; i--) {
    darkPulses[i].update();
    darkPulses[i].display();
    if (darkPulses[i].isDead()) {
      darkPulses.splice(i, 1);
    }
  }

  for (let i = trailGhosts.length - 1; i >= 0; i--) {
    trailGhosts[i].update();
    trailGhosts[i].display();
    if (trailGhosts[i].isDead()) {
      trailGhosts.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 4; i++) {
    bats.push(new Bat(mouseX, mouseY));
  }

  for (let i = 0; i < 3; i++) {
    slidingShadows.push(new Shadow(mouseX + random(-20, 20), mouseY + random(-20, 20)));
  }

  for (let i = 0; i < 3; i++) {
    darkPulses.push(new Pulse(mouseX + random(-30, 30), mouseY + random(-30, 30)));
  }
}

function mouseDragged() {
  trailGhosts.push(new TrailGhost(mouseX, mouseY));
}

// ---------- BAT ----------
class Bat {
  constructor(x, y) {
    this.originX = x;
    this.originY = y;
    this.angle = random(360);
    this.radius = 0;
    this.size = random(10, 20);
    this.opacity = 255;
  }

  update() {
    this.radius += 2;
    this.angle += 10;
    this.opacity -= 3;
  }

  display() {
    let x = this.originX + cos(this.angle) * this.radius;
    let y = this.originY + sin(this.angle) * this.radius;
    fill(20, 0, 0, this.opacity);
    ellipse(x, y, this.size * 1.5, this.size);
  }

  isDead() {
    return this.opacity <= 0;
  }
}

// ---------- SHADOW ----------
class Shadow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sizeX = random(30, 60);
    this.sizeY = random(10, 25);
    this.opacity = 200;
    this.speedX = random(-1, 1);
    this.speedY = random(-0.5, 0.5);

    const colors = [
      [0, 0, 0],
      [255, 255, 255],
      [255, 0, 0]
    ];
    this.color = random(colors);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 1.5;
  }

  display() {
    fill(this.color[0], this.color[1], this.color[2], this.opacity);
    ellipse(this.x, this.y, this.sizeX, this.sizeY);
  }

  isDead() {
    return this.opacity <= 0;
  }
}

// ---------- DARK PULSE ----------
class Pulse {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.opacity = 200;
  }

  update() {
    this.r += 2;
    this.opacity -= 3;
  }

  display() {
    fill(0, 0, 0, this.opacity);
    ellipse(this.x, this.y, this.r);
  }

  isDead() {
    return this.opacity <= 0;
  }
}

// ---------- TRAIL GHOST ----------
class TrailGhost {
  constructor(x, y) {
    this.x = x + random(-5, 5);
    this.y = y + random(-5, 5);
    this.size = random(15, 30);
    this.opacity = 180;
    this.fadeSpeed = random(1, 3);
  }

  update() {
    this.opacity -= this.fadeSpeed;
  }

  display() {
    fill(255, 0, 0, this.opacity); // rojo intenso
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.opacity <= 0;
  }
}
