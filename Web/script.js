let paths = [];
let framesBetweenParticles = 5;
let nextParticleFrame = 0;
let previousParticlePosition;
let particleFadeFrames = 300;
let extraAnimations = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight * 0.8); // canvas grande
  canvas.parent('canvas-container');
  colorMode(HSB);
  angleMode(DEGREES);
  previousParticlePosition = createVector();
  noStroke();
}

function draw() {
  background(49, 98, 99, 0.1);

  for (let path of paths) {
    path.update();
    path.display();
  }

  for (let i = extraAnimations.length - 1; i >= 0; i--) {
    extraAnimations[i].update();
    extraAnimations[i].display();
    if (extraAnimations[i].isDead()) {
      extraAnimations.splice(i, 1);
    }
  }
}

function mousePressed() {
  // Solo agregar si se hace clic DENTRO del canvas
  if (mouseY < height) {
    nextParticleFrame = frameCount;
    paths.push(new Path());
    previousParticlePosition.set(mouseX, mouseY);
    createParticle();

    spawnRandomAnimation(mouseX, mouseY); // Ahora sí, solo cuando clickeas
  }
}

function mouseDragged() {
  if (frameCount >= nextParticleFrame) {
    createParticle();
  }
}

function createParticle() {
  let mousePosition = createVector(mouseX, mouseY);
  let velocity = p5.Vector.sub(mousePosition, previousParticlePosition);
  velocity.mult(0.05);
  let lastPath = paths[paths.length - 1];
  lastPath.addParticle(mousePosition, velocity);
  nextParticleFrame = frameCount + framesBetweenParticles;
  previousParticlePosition.set(mouseX, mouseY);
}

function spawnRandomAnimation(x, y) {
  let choice = random(["circles", "stars"]);
  if (choice === "circles") {
    for (let i = 0; i < int(random(5, 15)); i++) {
      extraAnimations.push(new ColorCircle(x + random(-50, 50), y + random(-50, 50)));
    }
  } else {
    for (let i = 0; i < int(random(5, 20)); i++) {
      extraAnimations.push(new HappyStar(x + random(-60, 60), y + random(-60, 60)));
    }
  }
}

// Tus clases originales:
class Path {
  constructor() {
    this.particles = [];
  }

  addParticle(position, velocity) {
    let particleHue = (this.particles.length * 30) % 360;
    this.particles.push(new Particle(position, velocity, particleHue));
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }

  connectParticles(particleA, particleB) {
    let opacity = particleA.framesRemaining / particleFadeFrames;
    stroke(255, opacity);
    line(
      particleA.position.x,
      particleA.position.y,
      particleB.position.x,
      particleB.position.y
    );
  }

  display() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].framesRemaining <= 0) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].display();
        if (i < this.particles.length - 1) {
          this.connectParticles(this.particles[i], this.particles[i + 1]);
        }
      }
    }
  }
}

class Particle {
  constructor(position, velocity, hue) {
    this.position = position.copy();
    this.velocity = velocity.copy();
    this.hue = hue;
    this.drag = 0.95;
    this.framesRemaining = particleFadeFrames;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(this.drag);
    this.framesRemaining--;
  }

  display() {
    let opacity = this.framesRemaining / particleFadeFrames;
    noStroke();
    fill(this.hue, 80, 90, opacity);
    circle(this.position.x, this.position.y, 24);
  }
}

class ColorCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(10, 40);
    this.hue = random(360);
    this.alpha = 255;
  }

  update() {
    this.r += 1.5;
    this.alpha -= 3;
  }

  display() {
    fill(this.hue, 100, 100, this.alpha / 255);
    ellipse(this.x, this.y, this.r);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

class HappyStar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 25);
    this.hue = random(360);
    this.alpha = 255;
    this.angle = random(360);
    this.speed = random(1, 4);
  }

  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    this.alpha -= 4;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(frameCount % 360);
    fill(this.hue, 100, 100, this.alpha / 255);
    this.drawStar(0, 0, this.size, this.size / 2, 5);
    pop();
  }

  drawStar(x, y, radius1, radius2, npoints) {
    let angle = 360 / npoints;
    beginShape();
    for (let a = 0; a < 360; a += angle) {
      let sx = cos(a) * radius1;
      let sy = sin(a) * radius1;
      vertex(sx, sy);
      sx = cos(a + angle / 2) * radius2;
      sy = sin(a + angle / 2) * radius2;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  isDead() {
    return this.alpha <= 0;
  }
}
