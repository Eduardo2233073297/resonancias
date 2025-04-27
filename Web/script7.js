let creepyEyes = [];
let ghostShadows = [];
let inkTrails = [];
let drawingInk = false;

function setup() {
  let canvas = createCanvas(windowWidth, 500); // Limito el canvas a 500px de alto
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  noStroke();
  background(0, 0, 30);

  document.body.style.margin = 0;
  // IMPORTANTE: no bloquear el scroll
  // document.body.style.overflow = 'hidden';  <-- Esto lo QUITAMOS
}

function draw() {
  background(0, 0, 0, 30);

  for (let eye of creepyEyes) {
    eye.update();
    eye.display();
  }

  for (let ghost of ghostShadows) {
    ghost.update();
    ghost.display();
  }

  for (let i = inkTrails.length - 1; i >= 0; i--) {
    inkTrails[i].update();
    inkTrails[i].display();
    if (inkTrails[i].isDead()) {
      inkTrails.splice(i, 1);
    }
  }

  if (drawingInk) {
    for (let i = 0; i < 2; i++) {
      inkTrails.push(new Ink(mouseX + random(-5, 5), mouseY + random(-5, 5)));
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 4; i++) {
    creepyEyes.push(new Eye(mouseX + random(-100, 100), mouseY + random(-50, 50)));
  }

  for (let i = 0; i < 3; i++) {
    ghostShadows.push(new Ghost(mouseX, mouseY));
  }

  drawingInk = true;
}

function mouseReleased() {
  drawingInk = false;
}

// -------------------- CLASES --------------------

class Eye {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 60;
  }

  update() {}

  display() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let angle = atan2(dy, dx);
    let pupilX = this.x + cos(angle) * 10;
    let pupilY = this.y + sin(angle) * 10;
    fill(0);
    ellipse(pupilX, pupilY, 20, 20);
  }
}

class Ghost {
  constructor(x, y) {
    this.x = x + random(-30, 30);
    this.y = y + random(-30, 30);
    this.size = random(40, 80);
    this.opacity = 200;
    this.vx = random(-1, 1);
    this.vy = random(-1, -3);
  }

  update() {
    this.y += this.vy;
    this.x += this.vx;
    this.opacity -= 2;
  }

  display() {
    fill(200, this.opacity);
    ellipse(this.x, this.y, this.size, this.size * 1.2);
    fill(0, this.opacity);
    ellipse(this.x - 10, this.y - 5, 10, 10);
    ellipse(this.x + 10, this.y - 5, 10, 10);
  }

  isDead() {
    return this.opacity <= 0;
  }
}

class Ink {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(10, 30);
    this.opacity = 255;
  }

  update() {
    this.r += 0.5;
    this.opacity -= 3;
  }

  display() {
    fill(20, this.opacity);
    ellipse(this.x, this.y, this.r);
  }

  isDead() {
    return this.opacity <= 0;
  }
}
