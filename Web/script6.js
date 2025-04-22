let fallingRaindrops = [];
let fadingBubbles = [];
let witheredLeaves = [];

function setup() {
  createCanvas(windowWidth, 500);
  colorMode(HSB);
  background(210, 30, 50); // Fondo en tonos tristes
  noStroke();
}

function draw() {
  background(210, 30, 50, 0.1); // Fondo con transparencia suave para efectos sutiles

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
}

// Animación al hacer clic: gotas de lluvia
function mousePressed() {
  for (let i = 0; i < 5; i++) {
    fallingRaindrops.push(new FallingRaindrop(mouseX + random(-30, 30), mouseY));
  }
}

// Animación al mantener el clic y mover el mouse: burbujas desvanecidas
function mouseDragged() {
  fadingBubbles.push(new FadingBubble(mouseX, mouseY));
}

// Animación al mantener el clic: hojas marchitas
function mousePressed() {
  for (let i = 0; i < 3; i++) {
    witheredLeaves.push(new WitheredLeaf(mouseX + random(-20, 20), mouseY));
  }
}

// FallingRaindrop - Gotas de lluvia que caen lentamente
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

// FadingBubble - Burbujas que suben y se desvanecen
class FadingBubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 30);
    this.alpha = 255;
    this.speed = random(1, 2);
  }

  update() {
    this.y -= this.speed;
    this.alpha -= 3;
  }

  display() {
    fill(210, 50, 80, this.alpha / 255);
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// WitheredLeaf - Hojas marchitas que giran y caen
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
    fill(160, 50, 50, this.alpha / 255); // Color de hojas marchitas
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}
