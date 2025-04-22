let gentleCircles = [];
let floatingRectangles = [];
let shiftingGrid = [];

function setup() {
  createCanvas(windowWidth, 500);
  noStroke();
  background(200, 240, 235);
  ellipseMode(RADIUS);

  document.body.style.margin = 0;
  document.body.style.overflow = 'hidden';
}

function draw() {
  background(200, 240, 235, 30);

  for (let c of gentleCircles) {
    c.update();
    c.display();
  }

  for (let r of floatingRectangles) {
    r.update();
    r.display();
  }

  for (let g of shiftingGrid) {
    g.update();
    g.display();
  }

  if (mouseIsPressed) {
    floatingRectangles.push(new Rectangle(mouseX, mouseY));
  }
}

function mousePressed() {
  for (let i = 0; i < 6; i++) {
    gentleCircles.push(new Circle(mouseX + random(-30, 30), mouseY + random(-30, 30)));
  }
  shiftingGrid.push(new Grid(mouseX, mouseY));
}

// --- CÍRCULOS SUAVES ---
class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(15, 30);
    this.opacity = 180;
    this.color = color(random(180, 255), random(180, 255), random(180, 255), this.opacity);
    this.speed = random(0.2, 0.5);
  }

  update() {
    this.y -= this.speed;
    this.opacity -= 0.3;
    this.color.setAlpha(this.opacity);
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

// --- RECTÁNGULOS FLUCTUANTES ---
class Rectangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = random(40, 80);
    this.height = random(20, 50);
    this.opacity = 200;
    this.color = color(random(200, 255), random(180, 220), random(220, 255), this.opacity);
    this.speed = random(0.3, 0.8);
  }

  update() {
    this.x += sin(frameCount * this.speed) * 2;
    this.y += cos(frameCount * this.speed) * 2;
    this.opacity -= 0.5;
    this.color.setAlpha(this.opacity);
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}

// --- CUADRÍCULA CAMBIANDO ---
class Grid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(15, 30);
    this.spacing = 15;
    this.numRows = 5;
    this.numCols = 5;
    this.opacity = 100;
    this.color = color(random(150, 200), random(150, 200), random(150, 200), this.opacity);
  }

  update() {
    this.opacity -= 1;
    this.color.setAlpha(this.opacity);
  }

  display() {
    noFill();
    stroke(this.color);
    strokeWeight(2);

    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        let offsetX = this.x + i * (this.size + this.spacing);
        let offsetY = this.y + j * (this.size + this.spacing);
        ellipse(offsetX, offsetY, this.size);
      }
    }
  }
}
