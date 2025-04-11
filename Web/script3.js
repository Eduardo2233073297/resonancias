// Define un arreglo para almacenar objetos de copos de nieve
let snowflakes = [];

function setup() {
  createCanvas(1500, 455);

  angleMode(DEGREES); // Usa grados en lugar de radianes

  // Crea los objetos de copos de nieve
  for (let i = 0; i < 300; i++) {
    // Agrega un nuevo objeto de copo de nieve al arreglo
    snowflakes.push(new Snowflake());
  }

  // Crea una descripción accesible para lectores de pantalla
  describe('Copos de nieve cayendo sobre un fondo negro.');
}

function draw() {
  background(color('#150036')); // Fondo negro

  // Actualiza y muestra cada copo de nieve en el arreglo
  let currentTime = frameCount / 60;

  for (let flake of snowflakes) {
    // Actualiza la posición de cada copo de nieve y lo muestra
    flake.update(currentTime);
    flake.display();
  }
}

// Define la clase Snowflake (Copo de Nieve)

class Snowflake {
  constructor() {
    this.posX = 0;
    this.posY = random(-height, 0); // Empieza por encima del canvas
    this.initialAngle = random(0, 360); // Ángulo inicial aleatorio
    this.size = random(2, 5); // Tamaño aleatorio
    this.radius = sqrt(random(pow(width / 2, 2))); // Radio para el movimiento horizontal
    this.color = color(random(200, 256), random(200, 256), random(200, 256)); // Color claro
  }

  update(time) {
    // Define la velocidad angular (grados por segundo)
    let angularSpeed = 35;

    // Calcula el ángulo actual
    let angle = this.initialAngle + angularSpeed * time;

    // La posición X sigue una onda seno
    this.posX = width / 2 + this.radius * sin(angle);

    // Copos de nieve más pequeños caen más lento
    let ySpeed = 2 / this.size;
    this.posY += ySpeed;

    // Cuando el copo llega al fondo, vuelve a subir
    if (this.posY > height) {
      this.posY = -50;
    }
  }

  display() {
    fill(this.color); // Rellena con el color asignado
    noStroke();       // Sin borde
    ellipse(this.posX, this.posY, this.size); // Dibuja el copo
  }
}


