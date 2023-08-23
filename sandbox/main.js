const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lastUpdateTime = new Date();
let mouseIsDown = false;
let mouseX = 0;
let mouseY = 0;

class Sandbox {
    constructor() {
        this.cellSize = 10;
        this.cellsAcross = Math.floor(canvas.width / this.cellSize);
        this.cellsDown = Math.floor(canvas.height / this.cellSize);
        this.grid = this.initSandbox();
    }

    /*
    create a grid of cells
    true means the cells has sand, false is an empty cell
    all cells start out empty
    */
    initSandbox() {
        let sandbox = [];

        for(let i = 0; i < this.cellsDown; i++) {
            let row = [];
            for(let j = 0; j < this.cellsAcross; j++) {
                // row.push(Math.random() > 0.8);
                row.push(false);
            }

            sandbox.push(row);
        }

        return sandbox;
    }

    spawnSand(x, y) {
        for(let i = 0; i < this.cellsDown; i++) {
            for(let j = 0; j < this.cellsAcross; j++) {
                let cellY = i * this.cellSize;
                let cellX = j * this.cellSize;

                if(x >= cellX && x <= cellX + this.cellSize && y >= cellY && y <= cellY + this.cellSize) {
                    this.grid[i][j] = true;
                }
            }
        }
    }

    /*
    Retrieve a cell value at position i, j in this.grid
    if i or j are out of bounds, returns true so it is treated as a filled cell
    */
    getCellAtCoords(i, j) {
        let cellValue = true;

        if(i >= 0 && i <= this.cellsDown - 1 && j >= 0 && j <= this.cellsAcross - 1) {
            cellValue = this.grid[i][j];
        }

        return cellValue;
    }

    draw(ctx) {
        for(let i = 0; i < this.cellsDown; i++) {
            for(let j = 0; j < this.cellsAcross; j++) {
                // skip drawing dead cells
                if(!this.getCellAtCoords(i, j)) {
                    continue;
                }

                let x = j * this.cellSize;
                let y = i * this.cellSize;

                ctx.beginPath();
                ctx.rect(x, y, this.cellSize, this.cellSize);
                ctx.fillStyle = this.grid[i][j] ? '#e0b31d' : 'black';
                ctx.fill();
            }
        }
    }

    update() {
        for(let i = this.cellsDown - 1; i >= 0; i--) {
            for(let j = this.cellsAcross - 1; j >= 0; j--) {
                // if at bottom of grid or current cell is empty, skip iteration
                if(i == this.cellsDown - 1 || !this.getCellAtCoords(i, j)) {
                    continue;
                }

                // cell directly below empty - move to that cell
                if(!this.getCellAtCoords(i + 1, j)) {
                    this.grid[i][j] = false;
                    this.grid[i + 1][j] = true;
                }
                // cell below and left is available - move to that cell
                else if(!this.getCellAtCoords(i + 1, j - 1) && this.getCellAtCoords(i + 1, j + 1)) {
                    this.grid[i][j] = false;
                    this.grid[i + 1][j - 1] = true;
                }
                // cell below and right is available - move to that cell
                else if(this.getCellAtCoords(i + 1, j - 1) && !this.getCellAtCoords(i + 1, j + 1)) {
                    this.grid[i][j] = false;
                    this.grid[i + 1][j + 1] = true;
                }
                // cells below right and below left are available - pick one at random
                else if(!this.getCellAtCoords(i + 1, j - 1) && !this.getCellAtCoords(i + 1, j + 1)) {
                    this.grid[i][j] = false;

                    if(Math.random() >= 0.5) {
                        this.grid[i + 1][j - 1] = true;
                    }
                    else {
                        this.grid[i + 1][j + 1] = true;
                    }
                }
            }
        }
    }
}

let sandbox = new Sandbox();

document.addEventListener('mousedown', (ev) => {
    mouseIsDown = true;
    mouseX = ev.clientX;
    mouseY = ev.clientY;
});

document.addEventListener('mousemove', (ev) => {
    mouseX = ev.clientX;
    mouseY = ev.clientY;
});

document.addEventListener('mouseup', (ev) => {
    mouseIsDown = false;
});

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(mouseIsDown) {
        sandbox.spawnSand(mouseX, mouseY);
    }

    sandbox.draw(ctx);

    let currentTime = new Date();

    if((currentTime.getTime() - lastUpdateTime.getTime()) >= 10) {
        sandbox.update();
        lastUpdateTime = currentTime;
    }

    requestAnimationFrame(animate);
}

animate();
