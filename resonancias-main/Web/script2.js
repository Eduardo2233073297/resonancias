const canvas = document.getElementById("canvas"); 
const ctx = canvas.getContext("2d");

// Círculos (balones) definidos en un array
const balls = [
  { x: 100, y: 100, radius: 25, color: "red", dx: 2, dy: 2, opacity: 0, fading: 0.02 },
  { x: 200, y: 150, radius: 30, color: "red", dx: 2, dy: -2, opacity: 0, fading: 0.02 },
  { x: 300, y: 200, radius: 40, color: "red", dx: -2, dy: 2, opacity: 0, fading: 0.02 },
  { x: 150, y: 250, radius: 35, color: "red", dx: 3, dy: -3, opacity: 0, fading: 0.02 },
  { x: 400, y: 100, radius: 20, color: "red", dx: -3, dy: 3, opacity: 0, fading: 0.02 },
];

// Función para dibujar todos los círculos
function drawBalls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de redibujar

  balls.forEach(ball => {
    if (ball.opacity > 0) {
      // Mover el círculo
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Modificar opacidad para efecto de desvanecimiento
      ball.opacity -= 0.02;
      if (ball.opacity <= 0) {
        ball.opacity = 0;
      }

      // Colisiones con los bordes del canvas
      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx; // Invertir dirección en el eje X
      }
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy; // Invertir dirección en el eje Y
      }

      // Dibujar el círculo con opacidad
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 0, 0, ${ball.opacity})`;
      ctx.fill();
    }
  });
}

// Función de animación
function animate() {
  drawBalls(); // Dibujar los círculos
  requestAnimationFrame(animate); // Llamar a la función de nuevo para crear el loop de animación
}

// Llamar a la función para comenzar la animación
animate();

// Evento para mostrar y desaparecer las figuras al hacer clic en la pantalla
document.addEventListener("click", () => {
  balls.forEach(ball => {
    ball.opacity = 1; // Hacer que las figuras aparezcan
  });

  setTimeout(() => {
    balls.forEach(ball => {
      ball.opacity = 0; // Hacer que las figuras desaparezcan después de 1 segundo
    });
  }, 1000);
});

