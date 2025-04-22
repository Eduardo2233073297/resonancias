let brokenChains = [];
let fadingLight = [];
let fallingPetals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(230, 230, 255); // Fondo suave, con colores pasteles
}

function draw() {
  background(230, 230, 255, 20); // Fondo con leve transparencia

  // Animación de Cadenas Rotas
  for (let chain of brokenChains) {
    chain.update();
    chain.display();
  }

  // Animación de Luz Perdida
  for (let light of fadingLight) {
    light.update();
    light.display();
  }

  // Animación de Caída de Pétalos
  for (let petal of fallingPetals) {
    petal.update();
    petal.display();
  }
}

function mousePressed() {
  // Activar animaciones al presionar el mouse
  brokenChains.push(new BrokenChain(mouseX, mouseY));
  fadingLight.push(new FadingLight(mouseX, mouseY));
  fallingPetals.push(new FallingPetal(mouseX, mouseY));
}

// --- Cadenas Rotas ---
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
    this.y += this.speed; // La cadena cae lentamente
    this.opacity -= 1; // La opacidad disminuye
  }

  display() {
    fill(100, 100, 100, this.opacity); // Color gris para representar las cadenas
    ellipse(this.x, this.y, this.length, 10); // Representación de un eslabón de cadena
    this.length *= 0.98; // El eslabón se hace más pequeño conforme cae
  }
}

// --- Luz Perdida ---
class FadingLight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 100;
    this.opacity = 255;
    this.color = color(255, 255, 255);
  }

  update() {
    this.radius -= 1; // La luz se reduce
    this.opacity -= 1; // La luz se desvanece lentamente
  }

  display() {
    noFill();
    strokeWeight(4);
    stroke(255, this.opacity);
    ellipse(this.x, this.y, this.radius); // El haz de luz se reduce
  }
}

// --- Caída de Pétalos ---
class FallingPetal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 20);
    this.speed = random(1, 2);
    this.opacity = 255;
    this.color = color(random(150, 255), random(50, 150), random(100, 200)); // Colores suaves
  }

  update() {
    this.y += this.speed; // El pétalo cae
    this.opacity -= 2; // Se desvanece lentamente
  }

  display() {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.opacity);
    ellipse(this.x, this.y, this.size, this.size); // Dibuja el pétalo
  }
}
