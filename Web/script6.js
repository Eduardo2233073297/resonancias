let fallingRaindrops = [];
let fadingBubbles = [];
let witheredLeaves = [];
let floatingMists = [];
let floatingParticles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight * 0.8);
  canvas.parent('canvas-container');
  colorMode(HSB);
  noStroke();
}

function draw() {
  background(265, 95, 17);

  for (let i = fallingRaindrops.length - 1; i >= 0; i--) {
    fallingRaindrops[i].update();
    fallingRaindrops[i].display();
    if (fallingRaindrops[i].isDead()) {
      fallingRaindrops.splice(i, 1);
    }
  }

  for (let i = fadingBubbles.length - 1; i >= 0; i--) {
    fadingBubbles[i].update();
    fadingBubbles[i].display();
    if (fadingBubbles[i].isDead()) {
      fadingBubbles.splice(i, 1);
    }
  }

  for (let i = witheredLeaves.length - 1; i >= 0; i--) {
    witheredLeaves[i].update();
    witheredLeaves[i].display();
    if (witheredLeaves[i].isDead()) {
      witheredLeaves.splice(i, 1);
    }
  }

  for (let mist of floatingMists) {
    mist.update();
    mist.display();
  }

  for (let particle of floatingParticles) {
    particle.update();
    particle.display();
  }
}

function mousePressed() {
  for (let i = 0; i < 3; i++) {
    witheredLeaves.push(new WitheredLeaf(mouseX + random(-20, 20), mouseY));
  }
  for (let i = 0; i < 5; i++) {
    fallingRaindrops.push(new FallingRaindrop(mouseX + random(-30, 30), mouseY));
  }
  for (let i = 0; i < 2; i++) {
    floatingMists.push(new FloatingMist(mouseX, mouseY));
  }
}

function mouseDragged() {
  fadingBubbles.push(new FadingBubble(mouseX, mouseY));
  floatingParticles.push(new FloatingParticle(mouseX, mouseY));
}

// --- CLASES ORIGINALES ---

class FallingRaindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 12);
    this.alpha = 255;
    this.speed = random(2, 4);
  }

  update() {
    this.y += this.speed;
    this.alpha -= 4;
  }

  display() {
    fill(210, 50, 60, this.alpha / 255);
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

class FadingBubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 30);
    this.alpha = 255;
    this.speed = random(1, 2);
  }

  update() {
    this.y += this.speed;
    this.alpha -= 3;
  }

  display() {
    fill(220, 60, 30, this.alpha / 255); // AZUL OSCURO
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}


class WitheredLeaf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 40);
    this.angle = random(0, 360);
    this.speed = random(1, 2);
    this.alpha = 255;
  }

  update() {
    this.x += cos(radians(this.angle)) * this.speed;
    this.y += sin(radians(this.angle)) * this.speed;
    this.alpha -= 4;
    this.angle += random(-5, 5);
  }

  display() {
    fill(160, 50, 50, this.alpha / 255);
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// --- NUEVAS CLASES (GRANDES y LENTAS) ---

class FloatingMist {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(150, 250); // Más grande
    this.speedX = random(-0.5, 0.5);
    this.speedY = random(-0.2, 0.2);
    this.alpha = 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  display() {
    fill(270, 40, 20, this.alpha / 255); // morado oscuro
    ellipse(this.x, this.y, this.size);
  }
}

class FloatingParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(30, 60); // Más grande
    this.speedY = random(-0.5, -1);
    this.alpha = 200;
  }

  update() {
    this.y += this.speedY;
    this.alpha -= 0.5;
  }

  display() {
    fill(270, 50, 30, this.alpha / 255); // morado oscuro más brillante
    ellipse(this.x, this.y, this.size);
  }
}

