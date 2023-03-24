const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// key is current state
// value is new state for center cell
const rule30 = new Map([
    ['111', 0],
    ['110', 0],
    ['101', 0],
    ['100', 1],
    ['011', 1],
    ['010', 1],
    ['001', 1],
    ['000', 0]
]);

const rule90 = new Map([
    ['111', 0],
    ['110', 1],
    ['101', 0],
    ['100', 1],
    ['011', 1],
    ['010', 0],
    ['001', 1],
    ['000', 0]
]);

const rule110 = new Map([
    ['111', 0],
    ['110', 1],
    ['101', 1],
    ['100', 0],
    ['011', 1],
    ['010', 1],
    ['001', 1],
    ['000', 0]
]);

const rule126 = new Map([
    ['111', 0],
    ['110', 1],
    ['101', 1],
    ['100', 1],
    ['011', 1],
    ['010', 1],
    ['001', 1],
    ['000', 0]
]);

const rule150 = new Map([
    ['111', 1],
    ['110', 0],
    ['101', 0],
    ['100', 1],
    ['011', 0],
    ['010', 1],
    ['001', 1],
    ['000', 0]
]);

const rule182 = new Map([
    ['111', 1],
    ['110', 0],
    ['101', 1],
    ['100', 1],
    ['011', 0],
    ['010', 1],
    ['001', 1],
    ['000', 0]
]);

const ruleData = {
    '30': {
        rules: rule30,
        startIndex: 'center'
    },
    '90': {
        rules: rule90,
        startIndex: 'center'
    },
    '110': {
        rules: rule110,
        startIndex: 'end'
    },
    '126': {
        rules: rule126,
        startIndex: 'center'
    },
    '150': {
        rules: rule150,
        startIndex: 'center'
    },
    '182': {
        rules: rule182,
        startIndex: 'center'
    }
}

const cellSize = 5;
const cellsAcross = canvas.width / cellSize;
const cellsDown = canvas.height / cellSize;

let cells = [];
let selectedRule = ruleData[document.getElementById('rule-select').value];
let running = false;
let enableScrolling = document.getElementById('enable-scroll-inp').checked;
let lastUpdateTime = new Date();

const handleRunClicked = () => {
    running = !running;
    cells = [];

    if(running) {
        document.getElementById('run-btn').innerHTML = 'stop';
        initCells();
        animate();
    }
    else {
        document.getElementById('run-btn').innerHTML = 'run';
    }
}

const handleRuleSelection = () => {
    selectedRule = ruleData[document.getElementById('rule-select').value];
}

const handleEnableScrolling = () => {
    enableScrolling = document.getElementById('enable-scroll-inp').checked;
}

const initCells = () => {
    let row = [];
    for(let i = 0; i < cellsAcross; i++) {
        row.push(0);
    }

    if(selectedRule.startIndex === 'end') {
        row[row.length - 1] = 1;
    }
    else if(selectedRule.startIndex === 'center') {
        let midIndex = Math.floor(row.length / 2);
        row[midIndex] = 1;
    }

    cells.push(row);
}

const updateCells = () => {
    if(enableScrolling && cells.length >= cellsDown) {
        // if cells is at max length, remove first item before adding another
        cells.splice(0, 1);
    }
    else if(cells.length < cellsDown) {
        let newRow = evalRow(cells[cells.length - 1]);
        cells.push(newRow);
    }
}

const evalRow = (row) => {
    let newState = [];

    for(let i = 0; i < row.length; i++) {
        let left = i == 0 ? 0 : row[i - 1];
        let center = row[i];
        let right = i == row.length - 1 ? 0 : row[i + 1];
        let curState = `${left}${center}${right}`;
        newState.push(selectedRule.rules.get(curState));
    }

    return newState;
}

const drawCells = () => {
    for(let i = 0; i < cells.length; i++) {
        for(let j = 0; j < cells[i].length; j++) {
            if(cells[i][j] === 1) {
                ctx.beginPath();
                ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }
    }
}

const animate = () => {
    if(running) {
        let currentTime = new Date();

        if(currentTime.getTime() - lastUpdateTime.getTime() >= 100) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // update and redraw every 0.5 seconds
            drawCells();
            updateCells();
        }

        requestAnimationFrame(animate);
    }
}

// initCells();
// animate();
