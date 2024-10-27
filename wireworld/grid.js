const EMPTY = 0;
const CONDUCTOR = 1;
const HEAD = 2;
const TAIL = 3;

class Grid {
    constructor(cellsAcross, cellsDown, cellSize) {
        this.cellsAcross = cellsAcross;
        this.cellsDown = cellsDown;
        this.cellSize = cellSize;
        this.cells = [];

        // initialize the grid with empty cells
        for(let i = 0; i < cellsDown; i++) {
            let row = [];
            for(let j = 0; j < cellsAcross; j++) {
                row.push(EMPTY);
            }
            this.cells.push(row);
        }
    }

    /*
    handle a click event - determine what cell was clicked and use the following rules:
        - empty -> conductor
        - conductor -> head
        - head -> tail
        - tail -> empty
    */
    handleClick(x, y) {
        // convert x, y coords into grid cell indices
        let xIndex = Math.floor(x / this.cellSize);
        let yIndex = Math.floor(y / this.cellSize);

        switch(this.cells[yIndex][xIndex]) {
        case EMPTY:
            this.cells[yIndex][xIndex] = CONDUCTOR;
            break;
        case CONDUCTOR:
            this.cells[yIndex][xIndex] = HEAD;
            break;
        case HEAD:
            this.cells[yIndex][xIndex] = TAIL;
            break;
        case TAIL:
            this.cells[yIndex][xIndex] = EMPTY;
            break;
        }
    }

    draw(ctx) {
        for(let i = 0; i < this.cellsDown; i++) {
            for(let j = 0; j < this.cellsAcross; j++) {
                let cellColor = null;
                switch(this.cells[i][j]) {
                case CONDUCTOR:
                    cellColor = "yellow";
                    break;
                case HEAD:
                    cellColor = "blue";
                    break;
                case TAIL:
                    cellColor = "red"
                    break;
                }
                ctx.beginPath();
                ctx.rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);

                if(cellColor !== null) {
                    ctx.fillStyle = cellColor;
                    ctx.fill();
                }

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