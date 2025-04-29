let brokenChains = [];
let fadingLight = [];
let fallingPetals = [];
let darkMists = [];
let slowOrbs = [];

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

  for (let mist of darkMists) {
    mist.update();
    mist.display();
  }

  for (let orb of slowOrbs) {
    orb.update();
    orb.display();
  }
}

function mousePressed() {
  if (mouseY < height) { // Solo si clic en canvas
    brokenChains.push(new BrokenChain(mouseX, mouseY));
    fadingLight.push(new FadingLight(mouseX, mouseY));
    fallingPetals.push(new FallingPetal(mouseX, mouseY));
    darkMists.push(new DarkMist(mouseX, mouseY));
    slowOrbs.push(new SlowOrb(mouseX, mouseY));
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

// NIEBLA MORADA OSCURA MEJORADA (con parpadeo)
class DarkMist {
  constructor(x, y) {
    this.x = x + random(-50, 50);
    this.y = y + random(-50, 50);
    this.size = random(100, 150);
    this.baseOpacity = 100;
    this.opacity = this.baseOpacity;
    this.vx = random(-0.3, 0.3);
    this.vy = random(-0.3, 0.3);
    this.oscillationSpeed = random(0.5, 1.5); // velocidad del parpadeo
    this.time = random(1000); // desfase para que no todas parpadeen igual
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.time += this.oscillationSpeed;
    
    // Parpadeo suave usando seno (oscila la opacidad)
    this.opacity = this.baseOpacity + sin(this.time) * 30;

    // Además, la niebla se va desvaneciendo lentamente
    this.baseOpacity -= 0.1;
  }

  display() {
    noStroke();
    fill(75, 0, 130, this.opacity); // Morado oscuro
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.baseOpacity <= 0;
  }
}

// NUEVO: ORBES LENTOS (SlowOrb)
class SlowOrb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 40);
    this.opacity = 180;
    this.vx = random(-0.2, 0.2);
    this.vy = random(-0.2, 0.2);
    this.color = color(random(50, 100), random(50, 100), random(100, 150));
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.5;
  }

  display() {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.opacity);
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.opacity <= 0;
  }
}

