let activeAnimations = [];

function setup() {
  let canvas = createCanvas(windowWidth, 525);
  canvas.parent('canvas-container'); // Mantener para que funcione dentro del contenedor
  colorMode(HSB);
  angleMode(DEGREES);
  noStroke();
  background(49, 98, 99);

  document.body.style.margin = 0;
  document.body.style.overflow = 'hidden';
}

function draw() {
  background(49, 98, 99, 0.1);

  for (let i = activeAnimations.length - 1; i >= 0; i--) {
    let anim = activeAnimations[i];
    anim.update();
    anim.display();
    if (anim.isDead()) {
      activeAnimations.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (mouseY < height) { // Aseguramos que solo se active dentro del canvas
    const types = [Confetti, BubbleExplosion, RadiantBurst];
    const Type = random(types);
    for (let i = 0; i < 10; i++) {
      activeAnimations.push(new Type(mouseX, mouseY));
    }
  }
}

// --------- Confetti Partículas ---------
class Confetti {
  constructor(x, y) {
    this.x = x + random(-50, 50);
    this.y = y + random(-50, 50);
    this.size = random(12, 20); // Aumentado
    this.hue = random(360);
    this.vx = random(-2, 2);
    this.vy = random(-1, 3);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // gravedad
    this.alpha -= 3;
  }

  display() {
    fill(this.hue, 80, 100, this.alpha / 255);
    rect(this.x, this.y, this.size, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// --------- Burbujas Expansivas ---------
class BubbleExplosion {
  constructor(x, y) {
    this.x = x + random(-30, 30);
    this.y = y + random(-30, 30);
    this.r = random(20, 40); // Aumentado
    this.hue = random(360);
    this.alpha = 255;
  }

  update() {
    this.r += 2.5; // expansión más rápida
    this.alpha -= 4;
  }

  display() {
    fill(this.hue, 60, 100, this.alpha / 255);
    ellipse(this.x, this.y, this.r);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// --------- Rayos Giratorios ---------
class RadiantBurst {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(360);
    this.length = random(60, 120); // Aumentado
    this.hue = random(360);
    this.alpha = 255;
    this.rotation = random(-3, 3);
  }

  update() {
    this.angle += this.rotation;
    this.alpha -= 4;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    stroke(this.hue, 100, 100, this.alpha / 255);
    strokeWeight(3); // más grueso
    line(0, 0, this.length, 0);
    pop();
  }

  isDead() {
    return this.alpha <= 0;
  }
}
