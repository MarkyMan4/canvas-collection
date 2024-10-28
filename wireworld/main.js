const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isPaused = true;
const cellsAcross = 100;
const cellSize = canvas.width / cellsAcross;
const cellsDown = Math.floor(canvas.height / cellSize);

const grid = new Grid(cellsAcross, cellsDown, cellSize);

// listener for drawing
document.addEventListener('mousedown', ev => {
    grid.handleClick(ev.clientX, ev.clientY);
});

document.addEventListener("keydown", ev => {
    if(ev.key === " ") {
        isPaused = !isPaused;
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.draw(ctx);

    if(!isPaused) {
        grid.update();
    }

    window.setTimeout(() => requestAnimationFrame(animate), 200);
}

animate();
