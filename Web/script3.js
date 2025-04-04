const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;
let running = false;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 25,
  color: "blue",
  opacity: 0,
  fading: false,
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = `rgba(0, 0, 255, ${this.opacity})`;
    ctx.fill();
  },
};

function clear() {
  ctx.fillStyle = "rgb(26, 5, 61)"; // Aquí se define el color del fondo del canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clear();
  
  if (ball.opacity > 0) {
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
  }
  
  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius
  ) {
    ball.vy = -ball.vy;
  }
  if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }

  

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("click", (e) => {
  ball.x = e.clientX;
  ball.y = e.clientY;
  ball.opacity = 1; // Restablecer opacidad
  
  running = true;
  raf = window.requestAnimationFrame(draw);

  
  
  if (!running) {
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.opacity = 1; // Aparece completamente
    ball.fading = false;
    running = true;
    raf = window.requestAnimationFrame(draw); 
  }
});

ball.draw();