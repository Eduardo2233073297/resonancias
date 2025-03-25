document.addEventListener("click", (event) => {
    const shapes = ["circle", "square", "triangle"];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  
    const shapeElement = document.createElement("div");
    shapeElement.classList.add("shape", randomShape);
    shapeElement.style.left = `${event.clientX - 25}px`;
    shapeElement.style.top = `${event.clientY - 25}px`;
  
    document.body.appendChild(shapeElement);
  
    // Animación de desvanecimiento
    setTimeout(() => {
      shapeElement.style.opacity = "0";
      setTimeout(() => {
        shapeElement.remove();
      }, 500); // Espera medio segundo antes de eliminar
    }, 1000); // Desaparece después de 1 segundo
  });