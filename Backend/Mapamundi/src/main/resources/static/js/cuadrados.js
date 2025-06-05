document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fondo-cuadrados');
    const ctx = canvas.getContext('2d');
  
    const squareSize = 40;
    const speed = 0.5;
    const direction = 'diagonal';
    const borderColor = '#757780';
    const hoverFillColor = '#011627';
  
    let numSquaresX, numSquaresY;
    let gridOffset = { x: 0, y: 0 };
    let hoveredSquare = null;
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      numSquaresX = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY = Math.ceil(canvas.height / squareSize) + 1;
    }
  
    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const startX = Math.floor(gridOffset.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.y / squareSize) * squareSize;
  
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.x % squareSize);
          const squareY = y - (gridOffset.y % squareSize);
  
          if (
            hoveredSquare &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }
  
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    }
  
    function animate() {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'diagonal':
          gridOffset.x = (gridOffset.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.y = (gridOffset.y - effectiveSpeed + squareSize) % squareSize;
          break;
        // otros casos omitidos porque usamos solo 'diagonal'
      }
  
      drawGrid();
      requestAnimationFrame(animate);
    }
  
    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
  
      const startX = Math.floor(gridOffset.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.y / squareSize) * squareSize;
  
      const hoveredX = Math.floor((mouseX + gridOffset.x - startX) / squareSize);
      const hoveredY = Math.floor((mouseY + gridOffset.y - startY) / squareSize);
  
      if (!hoveredSquare || hoveredSquare.x !== hoveredX || hoveredSquare.y !== hoveredY) {
        hoveredSquare = { x: hoveredX, y: hoveredY };
      }
    });
  
    canvas.addEventListener('mouseleave', () => {
      hoveredSquare = null;
    });
  
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
  });
  