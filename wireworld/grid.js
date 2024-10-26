const EMPTY = 0;
const CONDUCTOR = 1;
const HEAD = 2;
const TAIL = 3;

class Grid {
    constructor(cellsAcross, cellsDown, cellSize) {
        this.cellsAcross = cellsAcross;
        this.cellsDown = cellsDown;
        this.cellSize = cellSize;
        this.grid = [];

        // initialize the grid with empty cells
        for(let i = 0; i < cellsDown; i++) {
            let row = [];
            for(let j = 0; j < cellsAcross; j++) {
                row.push(0);
            }
            this.grid.push(row);
        }
    }

    draw(ctx) {
        for(let i = 0; i < this.cellsDown; i++) {
            for(let j = 0; j < this.cellsAcross; j++) {
                ctx.beginPath();
                ctx.rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                ctx.strokeStyle = "#666666";
                ctx.stroke();
            }
        } 
    }

    /*
    rule:
        - empty -> empty
        - head -> tail
        - tail -> conductor
        - conductor -> head if exactly one or two neighbors are heads, else stay conductor
    */
    update() {

    }
}