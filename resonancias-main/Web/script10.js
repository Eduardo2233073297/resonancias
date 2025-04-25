let bloodSplats = [];
let spiders = [];
let floatingGhosts = [];

function setup() {
  createCanvas(windowWidth, 500);
  noStroke();
  angleMode(DEGREES);
  background(137, 151, 196);

  document.body.style.margin = 0;
  document.body.style.overflow = 'hidden';
}

function draw() {
  background(137, 151, 196, 20); // fondo oscuro con leve transparencia

  for (let i = bloodSplats.length - 1; i >= 0; i--) {
    bloodSplats[i].update();
    bloodSplats[i].display();
    if (bloodSplats[i].isDead()) {
      bloodSplats.splice(i, 1);
    }
  }

  for (let i = spiders.length - 1; i >= 0; i--) {
    spiders[i].update();
    spiders[i].display();
    if (spiders[i].isDead()) {
      spiders.splice(i, 1);
    }
  }

  for (let i = floatingGhosts.length - 1; i >= 0; i--) {
    floatingGhosts[i].update();
    floatingGhosts[i].display();
    if (floatingGhosts[i].isDead()) {
      floatingGhosts.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 5; i++) {
    bloodSplats.push(new Blood(mouseX + random(-30, 30), mouseY + random(-30, 30)));
  }

  for (let i = 0; i < 3; i++) {
    spiders.push(new Spider(mouseX + random(-50, 50)));
  }

  for (let i = 0; i < 2; i++) {
    floatingGhosts.push(new FloatingGhost(mouseX, mouseY));
  }
}

// ---------- BLOOD ----------
class Blood {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(5, 30);
    this.opacity = 255;
    this.v = random(0.5, 2);
  }

  update() {
    this.y += this.v;
    this.opacity -= 2;
  }

  display() {
    fill(150, 0, 0, this.opacity);
    ellipse(this.x, this.y, this.r);
  }

  isDead() {
    return this.opacity <= 0;
  }
}

// ---------- SPIDER ----------
class Spider {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.size = random(15, 30);
    this.speed = random(1, 2);
    this.alpha = 255;
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.alpha -= 5;
    }
  }

  display() {
    stroke(200, this.alpha);
    line(this.x, 0, this.x, this.y);
    noStroke();
    fill(0, 0, 0, this.alpha);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// ---------- FLOATING GHOST ----------
class FloatingGhost {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.opacity = 255;
    this.size = random(40, 70);
    this.vx = random(-1.5, 1.5);
    this.vy = random(-0.5, -2);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 1.5;
  }

  display() {
    fill(255, this.opacity);
    ellipse(this.x, this.y, this.size, this.size * 1.2);
    fill(0, this.opacity);
    ellipse(this.x - 10, this.y - 5, 8, 8);
    ellipse(this.x + 10, this.y - 5, 8, 8);
  }

  isDead() {
    return this.opacity <= 0;
  }
}
