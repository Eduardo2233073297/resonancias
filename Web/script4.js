let tears = [];
let clouds = [];
let roots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(22, 0, 56); // Fondo gris azulado
  ellipseMode(RADIUS);
}

function draw() {
  background(22, 0, 56, 30); // Fondo que deja un rastro de transparencia

  // Animación de Lágrimas de luz
  for (let t of tears) {
    t.update();
    t.display();
  }

  // Animación de Nubes flotantes
  for (let cloud of clouds) {
    cloud.update();
    cloud.display();
  }

  // Animación de Raíces que se hunden
  for (let root of roots) {
    root.update();
    root.display();
  }
}

function mousePressed() {
  // Activar animaciones con el mouse
  for (let i = 0; i < 5; i++) {
    tears.push(new Tear(mouseX + random(-20, 20), mouseY + random(-20, 20)));
  }

  for (let i = 0; i < 3; i++) {
    clouds.push(new Cloud(mouseX + random(-30, 30), mouseY + random(-30, 30)));
  }

  for (let i = 0; i < 3; i++) {
    roots.push(new Root(mouseX + random(-10, 10), mouseY + random(-10, 10)));
  }
}

// --- CÍRCULOS FLOTANTES (Lágrimas de luz) ---
class Tear {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 10);
    this.opacity = 255;
    this.speed = random(1, 3);
    this.color = color(135, 206, 250, this.opacity); // Azul claro
  }

  update() {
    this.y += this.speed; // Las lágrimas caen
    this.opacity -= 1; // Se desvanecen
    this.color.setAlpha(this.opacity);
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// --- NUBES FLOTANTES ---
class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(40, 70);
    this.opacity = 200;
    this.speed = random(0.1, 0.3);
    this.color = color(220, 220, 255, this.opacity); // Nubes blancas
  }

  update() {
    this.y -= this.speed; // Las nubes suben lentamente
    this.opacity -= 0.5; // Se desvanecen
    this.color.setAlpha(this.opacity);
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// --- RAÍCES QUE SE HUNDEN ---
class Root {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 0;
    this.opacity = 255;
    this.speed = random(0.2, 0.5);
    this.color = color(80, 60, 45, this.opacity); // Raíces marrones
  }

  update() {
    this.length += this.speed; // Crecen hacia abajo
    this.opacity -= 0.1; // Se desvanecen lentamente
    this.color.setAlpha(this.opacity);
  }

  display() {
    stroke(this.color);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.length);
  }
}
