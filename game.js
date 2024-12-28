const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Player object
const player = {
  x: 50,
  y: 300,
  width: 50,
  height: 50,
  color: "blue",
  speed: 5,
};

// Enemy object
const enemy = {
  x: 700,
  y: 300,
  width: 50,
  height: 50,
  color: "red",
  speed: 5,
};

// Draw objects
function drawObject(obj) {
  context.fillStyle = obj.color;
  context.fillRect(obj.x, obj.y, obj.width, obj.height);
}

// Game loop
function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawObject(player);
  drawObject(enemy);

  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
