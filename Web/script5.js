let brokenChains = [];
let fadingLight = [];
let fallingPetals = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight - 250); // Resta altura de barra + player
  canvas.parent('canvas-container');
  noStroke();
  background(22, 0, 56);
}

function draw() {
  background(22, 0, 56, 20);

  for (let chain of brokenChains) {
    chain.update();
    chain.display();
  }

  for (let light of fadingLight) {
    light.update();
    light.display();
  }

  for (let petal of fallingPetals) {
    petal.update();
    petal.display();
  }
}

function mousePressed() {
  if (mouseY < height) { // Solo si clic en canvas
    brokenChains.push(new BrokenChain(mouseX, mouseY));
    fadingLight.push(new FadingLight(mouseX, mouseY));
    fallingPetals.push(new FallingPetal(mouseX, mouseY));
  }
}

class BrokenChain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = random(50, 100);
    this.angle = random(TWO_PI);
    this.speed = random(1, 2);
    this.opacity = 255;
  }

  update() {
    this.y += this.speed;
    this.opacity -= 1;
  }

  display() {
    fill(100, 100, 100, this.opacity);
    ellipse(this.x, this.y, this.length, 10);
    this.length *= 0.98;
  }
}

class FadingLight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 100;
    this.opacity = 255;
  }

  update() {
    this.radius = max(0, this.radius - 1);
    this.opacity = max(0, this.opacity - 1);
  }

  display() {
    noFill();
    strokeWeight(4);
    stroke(255, this.opacity);
    ellipse(this.x, this.y, this.radius);
  }
}

class FallingPetal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 20);
    this.speed = random(1, 2);
    this.opacity = 255;
    this.color = color(random(150, 255), random(50, 150), random(100, 200));
  }

  update() {
    this.y += this.speed;
    this.opacity -= 2;
  }

  display() {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.opacity);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
