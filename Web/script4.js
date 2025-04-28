let tears = [];
let clouds = [];
let roots = [];
let sparkles = [];
let threads = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight * 0.8);
  canvas.parent('canvas-container');
  noStroke();
  background(22, 0, 56); // Fondo azul oscuro
  ellipseMode(RADIUS);
}

function draw() {
  background(22, 0, 56, 30); // Fondo con rastro de transparencia

  for (let t of tears) {
    t.update();
    t.display();
  }

  for (let cloud of clouds) {
    cloud.update();
    cloud.display();
  }

  for (let root of roots) {
    root.update();
    root.display();
  }

  for (let sparkle of sparkles) {
    sparkle.update();
    sparkle.display();
  }

  for (let thread of threads) {
    thread.update();
    thread.display();
  }
}

function mousePressed() {
  for (let i = 0; i < 5; i++) {
    tears.push(new Tear(mouseX + random(-20, 20), mouseY + random(-20, 20)));
  }
  for (let i = 0; i < 3; i++) {
    clouds.push(new Cloud(mouseX + random(-30, 30), mouseY + random(-30, 30)));
  }
  for (let i = 0; i < 3; i++) {
    roots.push(new Root(mouseX + random(-10, 10), mouseY + random(-10, 10)));
  }
  for (let i = 0; i < 6; i++) {
    sparkles.push(new Sparkle(mouseX + random(-15, 15), mouseY + random(-15, 15)));
  }
  for (let i = 0; i < 6; i++) {
    threads.push(new Thread(mouseX + random(-25, 25), mouseY + random(-25, 25)));
  }
}

// --- LÁGRIMAS ---
class Tear {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 10);
    this.opacity = 255;
    this.speed = random(1, 3);
    this.color = color(135, 206, 250, this.opacity);
  }

  update() {
    this.y += this.speed;
    this.opacity -= 1;
    this.color.setAlpha(this.opacity);
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// --- NUBES ---
class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(40, 70);
    this.opacity = 200;
    this.speed = random(0.1, 0.3);
    this.color = color(220, 220, 255, this.opacity);
  }

  update() {
    this.y -= this.speed;
    this.opacity -= 0.5;
    this.color.setAlpha(this.opacity);
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// --- RAÍCES ---
class Root {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 0;
    this.opacity = 255;
    this.speed = random(0.2, 0.5);
    this.color = color(80, 60, 45, this.opacity);
  }

  update() {
    this.length += this.speed;
    this.opacity -= 0.1;
    this.color.setAlpha(this.opacity);
  }

  display() {
    stroke(this.color);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.length);
    noStroke();
  }
}

// --- DESTELLOS (Sparkles) ---
class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(2, 5);
    this.opacity = 200;
    this.speed = random(0.3, 0.7);
    this.color = color(50, 100, 200, this.opacity); // Azul profundo
  }

  update() {
    this.y += this.speed;
    this.opacity -= 0.5;
    this.color.setAlpha(this.opacity);
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// --- HILOS (Threads) ---
class Thread {
  constructor(x, y) {
    this.path = [];
    this.x = x;
    this.y = y;
    this.opacity = 200;
    this.color = color(100, 0, 150, this.opacity); // Púrpura oscuro
    this.angle = random(TWO_PI);
    this.speed = 0.5;
  }

  update() {
    this.angle += random(-0.05, 0.05);
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    this.path.push(createVector(this.x, this.y));

    if (this.path.length > 50) {
      this.path.shift();
    }

    this.opacity -= 0.2;
    this.color.setAlpha(this.opacity);
  }

  display() {
    noFill();
    stroke(this.color);
    beginShape();
    for (let v of this.path) {
      vertex(v.x, v.y);
    }
    endShape();
    noStroke();
  }
}
