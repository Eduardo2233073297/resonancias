let floatingCircles = [];
let rippleWaves = [];
let driftingLines = [];
let curvedLines = [];

function setup() {
  createCanvas(windowWidth, 500);
  noStroke();
  background(137, 151, 196);
  ellipseMode(RADIUS);

  document.body.style.margin = 0;
  document.body.style.overflow = 'hidden';
}

function draw() {
  background(137, 151, 196, 30);

  for (let c of floatingCircles) {
    c.update();
    c.display();
  }

  for (let r of rippleWaves) {
    r.update();
    r.display();
  }

  for (let l of driftingLines) {
    l.update();
    l.display();
  }

  for (let cl of curvedLines) {
    cl.update();
    cl.display();
  }

  if (mouseIsPressed) {
    driftingLines.push(new Line(mouseX, mouseY));
  }
}

function mousePressed() {
  for (let i = 0; i < 6; i++) {
    floatingCircles.push(new Circle(mouseX + random(-30, 30), mouseY + random(-30, 30)));
  }

  rippleWaves.push(new Ripple(mouseX, mouseY));
}

// --- CÍRCULOS FLOTANTES ---
class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(10, 25);
    this.speed = random(0.3, 1);
    this.opacity = 200;
    this.color = color(255, 255, 255, this.opacity);
  }

  update() {
    this.y -= this.speed;
    this.opacity -= 0.5;
    this.color.setAlpha(this.opacity);
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

// --- ONDAS SUAVES ---
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.opacity = 150;
  }

  update() {
    this.radius += 2;
    this.opacity -= 2;
  }

  display() {
    noFill();
    stroke(100, this.opacity);
    strokeWeight(2);
    ellipse(this.x, this.y, this.radius);
  }
}

// --- LÍNEAS SUAVES AL DESLIZAR ---
class Line {
  constructor(x, y) {
    this.path = [];
    this.path.push(createVector(x, y));
    this.color = color(100, 180, 255, 120);
  }

  update() {
    this.path.push(createVector(mouseX, mouseY));
    if (this.path.length > 60) this.path.splice(0, 1);
  }

  display() {
    noFill();
    stroke(this.color);
    strokeWeight(2);
    beginShape();
    for (let p of this.path) {
      curveVertex(p.x, p.y);
    }
    endShape();
  }
}

// --- LÍNEAS CURVAS SIGUIENDO EL MOUSE ---
class CurvedLine {
  constructor() {
    this.points = [];
    this.numPoints = 50;  // Número de puntos para crear la curva
    this.color = color(random(180, 255), random(100, 180), random(180, 255), 150);
  }

  update() {
    this.points.push(createVector(mouseX, mouseY));
    if (this.points.length > this.numPoints) {
      this.points.shift();
    }
  }

  display() {
    noFill();
    stroke(this.color);
    strokeWeight(3);
    
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let prev = this.points[i - 1] || this.points[0];
      let mid = createVector((p.x + prev.x) / 2, (p.y + prev.y) / 2);
      curveVertex(mid.x, mid.y); // Dibujar líneas curvas con el punto medio
    }
    endShape();
  }
}

function mouseMoved() {
  // Al mover el mouse, agregamos una nueva CurvedLine
  curvedLines.push(new CurvedLine());
}
