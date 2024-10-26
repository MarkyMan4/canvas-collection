const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellsAcross = 100;
const cellSize = canvas.width / cellsAcross;
const cellsDown = Math.floor(canvas.height / cellSize);

const grid = new Grid(cellsAcross, cellsDown, cellSize);

// listener for drawing
window.addEventListener('mousedown', ev => {
    console.log('clicked')
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.draw(ctx);
    window.setTimeout(() => requestAnimationFrame(animate), 200);
}

animate();
