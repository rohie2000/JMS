const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const fruitNameEl = document.getElementById("fruitName");
const messageEl = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
const atlas = new Image();
const grass = new Image();
atlas.src = "assets/sprite-atlas.png";
grass.src = "assets/grass-flowers.png";

const boardSize = 18;
const cell = canvas.width / boardSize;
const tickMs = 128;
const atlasCellW = 1448 / 4;
const atlasCellH = 1086 / 3;
let imagesLoaded = 0;

const sprites = {
  apple: [0, 0],
  pear: [1, 0],
  banana: [2, 0],
  orange: [3, 0],
  strawberry: [0, 1],
  grapes: [1, 1],
  fire: [2, 1],
  grasshopper: [3, 1],
  head: [0, 2],
  body: [2, 2],
};

const fruitTypes = [
  { key: "apple", name: "Apfel" },
  { key: "pear", name: "Birne" },
  { key: "banana", name: "Banane" },
  { key: "orange", name: "Orange" },
  { key: "strawberry", name: "Erdbeere" },
  { key: "grapes", name: "Trauben" },
];

const dirs = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

let snake;
let direction;
let queuedDirection;
let fruit;
let fires;
let score;
let gameOverUntil;
let surpriseUntil;
let lastTick;
let running;
const loadedImages = new Set();

function resetGame() {
  snake = [
    { x: 8, y: 9 },
    { x: 7, y: 9 },
    { x: 6, y: 9 },
  ];
  direction = dirs.right;
  queuedDirection = dirs.right;
  score = 0;
  gameOverUntil = 0;
  surpriseUntil = 0;
  lastTick = 0;
  running = true;
  fires = placeFires(2 + Math.floor(Math.random() * 2));
  fruit = placeFruit();
  updateHud();
  hideMessage();
}

function placeFires(amount) {
  const placed = [];
  while (placed.length < amount) {
    const pos = randomCell();
    const distanceFromStart = Math.abs(pos.x - 8) + Math.abs(pos.y - 9);
    if (distanceFromStart > 4 && !occupied(pos, placed)) {
      placed.push(pos);
    }
  }
  return placed;
}

function placeFruit() {
  let pos;
  do {
    pos = randomCell();
  } while (occupied(pos, snake) || occupied(pos, fires));

  return {
    ...pos,
    type: fruitTypes[Math.floor(Math.random() * fruitTypes.length)],
  };
}

function randomCell() {
  return {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}

function occupied(pos, list) {
  return list.some((item) => item.x === pos.x && item.y === pos.y);
}

function setDirection(next) {
  const dir = dirs[next];
  if (!dir) return;
  if (dir.x + direction.x === 0 && dir.y + direction.y === 0) return;
  queuedDirection = dir;
}

function tick(now) {
  if (!running) return;
  if (gameOverUntil && now > gameOverUntil) {
    resetGame();
  }

  if (!lastTick || now - lastTick >= tickMs) {
    lastTick = now;
    if (!gameOverUntil) moveSnake(now);
  }

  draw(now);
  requestAnimationFrame(tick);
}

function moveSnake(now) {
  direction = queuedDirection;
  const head = snake[0];
  const next = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };

  const hitWall = next.x < 0 || next.x >= boardSize || next.y < 0 || next.y >= boardSize;
  const hitSelf = occupied(next, snake);
  const hitFire = occupied(next, fires);

  if (hitWall) {
    return;
  }

  if (hitSelf || hitFire) {
    showMessage(hitFire ? "Verbrannt! Neustart..." : "Tot! Neustart...");
    gameOverUntil = now + 950;
    return;
  }

  snake.unshift(next);

  if (next.x === fruit.x && next.y === fruit.y) {
    score += 1;
    surpriseUntil = now + 1200;
    fruit = placeFruit();
    updateHud();
  } else {
    snake.pop();
  }
}

function updateHud() {
  scoreEl.textContent = String(score);
  fruitNameEl.textContent = fruit?.type.name ?? "Apfel";
}

function showMessage(text) {
  messageEl.textContent = text;
  messageEl.hidden = false;
}

function hideMessage() {
  messageEl.hidden = true;
}

function draw(now) {
  drawGround();
  fires.forEach((fire, index) => drawSprite("fire", fire.x, fire.y, 1.32 + Math.sin(now / 110 + index) * 0.05));
  drawSprite(fruit.type.key, fruit.x, fruit.y, 1.08);
  drawSnake();
  if (now < surpriseUntil) drawSurprise(now);
}

function drawGround() {
  ctx.drawImage(grass, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(16, 42, 15, 0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(245, 238, 212, 0.14)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= boardSize; i += 1) {
    const p = Math.round(i * cell) + 0.5;
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, canvas.height);
    ctx.moveTo(0, p);
    ctx.lineTo(canvas.width, p);
    ctx.stroke();
  }
}

function drawSnake() {
  snake.forEach((part, index) => {
    if (index === 0) {
      drawSnakeHead(part.x, part.y, directionAngle());
    } else {
      const previous = snake[index - 1];
      const next = snake[index + 1] ?? part;
      const angle = Math.abs(previous.x - next.x) >= Math.abs(previous.y - next.y) ? 0 : Math.PI / 2;
      drawRotatedSprite("body", part.x, part.y, angle, 1.2);
    }
  });
}

function drawSnakeHead(gridX, gridY, angle) {
  const sourceX = 0 * atlasCellW + 92;
  const sourceY = 2 * atlasCellH + 26;
  const sourceW = 186;
  const sourceH = 278;
  const width = cell * 0.96;
  const height = cell * 1.34;
  const cx = gridX * cell + cell / 2;
  const cy = gridY * cell + cell / 2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.drawImage(atlas, sourceX, sourceY, sourceW, sourceH, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function directionAngle() {
  if (direction.x === 1) return Math.PI / 2;
  if (direction.x === -1) return -Math.PI / 2;
  if (direction.y === 1) return Math.PI;
  return 0;
}

function drawSurprise(now) {
  const pulse = 1 + Math.sin(now / 80) * 0.06;
  const x = Math.min(boardSize - 2.4, Math.max(0.4, snake[0].x - 0.55));
  const y = Math.min(boardSize - 2.4, Math.max(0.4, snake[0].y - 1.7));
  ctx.save();
  ctx.globalAlpha = Math.min(1, (surpriseUntil - now) / 220);
  drawSprite("grasshopper", x, y, 2.2 * pulse);
  ctx.restore();
}

function drawSprite(name, gridX, gridY, scale = 1) {
  const [sxCell, syCell] = sprites[name];
  const size = cell * scale;
  const dx = gridX * cell + (cell - size) / 2;
  const dy = gridY * cell + (cell - size) / 2;
  ctx.drawImage(
    atlas,
    sxCell * atlasCellW,
    syCell * atlasCellH,
    atlasCellW,
    atlasCellH,
    dx,
    dy,
    size,
    size
  );
}

function drawRotatedSprite(name, gridX, gridY, angle, scale = 1) {
  const [sxCell, syCell] = sprites[name];
  const size = cell * scale;
  const cx = gridX * cell + cell / 2;
  const cy = gridY * cell + cell / 2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.drawImage(
    atlas,
    sxCell * atlasCellW,
    syCell * atlasCellH,
    atlasCellW,
    atlasCellH,
    -size / 2,
    -size / 2,
    size,
    size
  );
  ctx.restore();
}

document.addEventListener("keydown", (event) => {
  const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };
  if (keyMap[event.key]) {
    event.preventDefault();
    setDirection(keyMap[event.key]);
  }
});

document.querySelectorAll("[data-direction]").forEach((button) => {
  button.addEventListener("click", () => setDirection(button.dataset.direction));
});

canvas.addEventListener("pointerdown", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const dx = x - centerX;
  const dy = y - centerY;
  setDirection(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
});

restartButton.addEventListener("click", resetGame);

function startWhenReady(name) {
  loadedImages.add(name);
  imagesLoaded = loadedImages.size;
  if (imagesLoaded === 2 && !running) {
    resetGame();
    requestAnimationFrame(tick);
  }
}

atlas.addEventListener("load", () => startWhenReady("atlas"));
grass.addEventListener("load", () => startWhenReady("grass"));
if (atlas.complete) startWhenReady("atlas");
if (grass.complete) startWhenReady("grass");
