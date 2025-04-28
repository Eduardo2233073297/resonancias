let confettis = [];
let bubbles = [];
let rays = [];
let currentEffect = "";

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight * 0.8); 
  canvas.parent('canvas-container');
  colorMode(HSB);
  noStroke();
  background(49, 98, 99);
}

function draw() {
  background(49, 98, 99, 0.1);

  // Confetti
  for (let i = confettis.length - 1; i >= 0; i--) {
    confettis[i].update();
    confettis[i].display();
    if (confettis[i].isDead()) {
      confettis.splice(i, 1);
    }
  }

  // Burbujas
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    if (bubbles[i].isDead()) {
      bubbles.splice(i, 1);
    }
  }

  // Rayos felices
  for (let i = rays.length - 1; i >= 0; i--) {
    rays[i].update();
    rays[i].display();
    if (rays[i].isDead()) {
      rays.splice(i, 1);
    }
  }
}

function mousePressed() {
  let randomEffect = random(["confetti", "bubbles"]);
  currentEffect = randomEffect;

  if (randomEffect === "confetti") {
    for (let i = 0; i < 30; i++) {
      confettis.push(new Confetti(mouseX, mouseY));
    }
  } else if (randomEffect === "bubbles") {
    for (let i = 0; i < 20; i++) {
      bubbles.push(new Bubble(mouseX, mouseY));
    }
  }
}

function mouseDragged() {
  currentEffect = "rays";
  for (let i = 0; i < 4; i++) {
    rays.push(new Ray(mouseX, mouseY));
  }
}

// 🎉 CONFETTI
class Confetti {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 10);
    this.hue = random(360);
    this.vel = createVector(random(-1, 1), random(-5, -1));
    this.alpha = 255;
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.vel.y += 0.1;
    this.alpha -= 3;
  }

  display() {
    fill(this.hue, 80, 90, this.alpha / 255);
    rect(this.x, this.y, this.size, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// 🫧 BURBUJAS
class Bubble {
  constructor(x, y) {
    this.x = x + random(-30, 30);
    this.y = y + random(-30, 30);
    this.r = random(10, 40);
    this.hue = random(200, 280); 
    this.alpha = 255;
  }

  update() {
    this.y -= 1;
    this.alpha -= 2;
  }

  display() {
    fill(this.hue, 50, 100, this.alpha / 255);
    ellipse(this.x, this.y, this.r);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// ⚡️ RAYOS FELICES
class Ray {
  constructor(x, y) {
    this.x1 = x;
    this.y1 = y;
    this.len = random(20, 100);
    this.angle = random(TWO_PI);
    this.hue = random(360);
    this.alpha = 255;
  }

  update() {
    this.alpha -= 5;
  }

  display() {
    stroke(this.hue, 100, 100, this.alpha / 255);
    strokeWeight(3);
    let x2 = this.x1 + cos(this.angle) * this.len;
    let y2 = this.y1 + sin(this.angle) * this.len;
    line(this.x1, this.y1, x2, y2);
  }

  isDead() {
    return this.alpha <= 0;
  }
}
