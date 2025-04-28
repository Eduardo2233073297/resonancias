let gentleCircles = [];
let floatingRectangles = [];
let shiftingGrid = [];
let drawing = false;
let clickAnimationType;

function setup() {
  let canvas = createCanvas(windowWidth, 500); // Limito el canvas a 500px de alto
  canvas.parent('canvas-container');
  noStroke();
  background(10, 10, 20);
  ellipseMode(RADIUS);

  document.body.style.margin = 0;
  // No bloqueamos el scroll
}

function draw() {
  background(0, 0, 0, 30);

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

  if (drawing) {
    if (clickAnimationType === 'circles') {
      floatingRectangles.push(new Rectangle(mouseX, mouseY));
    } else if (clickAnimationType === 'grid') {
      gentleCircles.push(new Circle(mouseX + random(-30, 30), mouseY + random(-30, 30)));
    }
  }
}

function mousePressed() {
  clickAnimationType = random(['circles', 'grid']);

  if (clickAnimationType === 'circles') {
    gentleCircles.push(new Circle(mouseX + random(-30, 30), mouseY + random(-30, 30)));
  } else if (clickAnimationType === 'grid') {
    shiftingGrid.push(new Grid(mouseX, mouseY));
  }

  drawing = true;
}

function mouseReleased() {
  drawing = false;
}

function randomPaletteColor(alpha) {
  let palette = [
    color(255, 0, 0, alpha),
    color(255, 255, 255, alpha),
    color(0, 0, 0, alpha)
  ];
  return random(palette);
}

// -------------------- CLASES --------------------

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(15, 30);
    this.opacity = 180;
    this.color = randomPaletteColor(this.opacity);
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

class Rectangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = random(40, 80);
    this.height = random(20, 50);
    this.opacity = 200;
    this.color = randomPaletteColor(this.opacity);
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

class Grid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(15, 30);
    this.spacing = 15;
    this.numRows = 5;
    this.numCols = 5;
    this.opacity = 100;
    this.color = randomPaletteColor(this.opacity);
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
