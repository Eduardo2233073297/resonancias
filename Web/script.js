// ----------- Código p5.js -----------
let paths = [];
let framesBetweenParticles = 5;
let nextParticleFrame = 0;
let previousParticlePosition;
let particleFadeFrames = 300;

function setup() {
  createCanvas(1500, 455);
  colorMode(HSB);
  previousParticlePosition = createVector();
  // Configuración del body para permitir interacciones de clic
  document.body.style.margin = 0;
  document.body.style.overflow = 'hidden';
}

function draw() {
  background(49, 98, 99);
  for (let path of paths) {
    path.update();
    path.display();
  }
}

function mousePressed() {
  nextParticleFrame = frameCount;
  paths.push(new Path());
  previousParticlePosition.set(mouseX, mouseY);
  createParticle();
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
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
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

// ----------- Código de shapes HTML -----------
// Este código ahora usa JavaScript puro para crear las formas y animarlas sin HTML directo

document.addEventListener("click", (event) => {
  const shapes = ["circle", "square", "triangle"];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  // Crea un contenedor de forma usando JavaScript
  const shapeElement = document.createElement("div");
  shapeElement.classList.add("shape", randomShape);

  // Establece la posición de la forma
  shapeElement.style.position = "absolute";
  shapeElement.style.width = "50px";
  shapeElement.style.height = "50px";
  shapeElement.style.left = `${event.clientX - 25}px`;
  shapeElement.style.top = `${event.clientY - 25}px`;
  shapeElement.style.transition = "opacity 0.5s ease";
  shapeElement.style.pointerEvents = "none";
  
  // Agrega la forma al cuerpo del documento
  document.body.appendChild(shapeElement);

  // Establece los estilos de las formas
  if (randomShape === "circle") {
    shapeElement.style.backgroundColor = "rgba(255, 100, 100, 0.7)";
    shapeElement.style.borderRadius = "50%";
  } else if (randomShape === "square") {
    shapeElement.style.backgroundColor = "rgba(100, 255, 100, 0.7)";
  } else if (randomShape === "triangle") {
    shapeElement.style.width = "0";
    shapeElement.style.height = "0";
    shapeElement.style.borderLeft = "25px solid transparent";
    shapeElement.style.borderRight = "25px solid transparent";
    shapeElement.style.borderBottom = "50px solid rgba(100, 100, 255, 0.7)";
    shapeElement.style.background = "none";
  }

  // Animación de desvanecimiento
  setTimeout(() => {
    shapeElement.style.opacity = "0";
    setTimeout(() => {
      shapeElement.remove();
    }, 500);
  }, 1000);
});

