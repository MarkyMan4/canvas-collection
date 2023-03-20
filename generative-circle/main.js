const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let balls = [];

/* configs controlled by user */

const getIntegerInput = (elementId) => {
    return parseInt(document.getElementById(elementId).value)
}

let running = false;
let showTrails = false;
let numBalls = getIntegerInput('num-balls-inp');
let ballRadius = getIntegerInput('ball-radius-inp');
let ballSpeed = getIntegerInput('ball-speed-inp');

// functions to set configs
const toggleRunning = () => {
    running = !running;

    if(running) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls = [];
        initBalls();
        animate();
    }
}

const toggleTrails = () => {
    showTrails = !showTrails;
}

const setNumBalls = () => {
    numBalls = getIntegerInput('num-balls-inp');
}

const setBallRadius = () => {
    ballRadius = getIntegerInput('ball-radius-inp');
}

const setBallSpeed = () => {
    ballSpeed = getIntegerInput('ball-speed-inp');
}

/* end config */

class Ball {
    constructor(x, y, radius, xVel, yVel) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xVel = xVel;
        this.yVel = yVel;
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;
    }
}

// create balls at the center of the screen
// they all move outward from the center in a circle
const initBalls = () => {
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let angle = 0;
    let angleIncrement = 360 / numBalls;

    for(let i = 0; i < numBalls; i++) {
        let angleRadians = angle * (Math.PI / 180);
        let xVel = Math.cos(angleRadians) * ballSpeed;
        let yVel = Math.sin(angleRadians) * ballSpeed;

        balls.push(new Ball(x, y, ballRadius, xVel, yVel));
        
        angle += angleIncrement;
    }
}

const drawAndUpdateBalls = () => {
    for(let i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'MediumSeaGreen';
        ctx.strokeStyle = 'black';
        ctx.fill();
        ctx.stroke();

        balls[i].update();

        if(balls[i].x - balls[i].radius <= 0 || balls[i].x + balls[i].radius >= canvas.width) {
            balls[i].xVel *= -1;
        }

        if(balls[i].y - balls[i].radius <= 0 || balls[i].y + balls[i].radius >= canvas.height) {
            balls[i].yVel *= -1;
        }
    }
}

const animate = () => {
    if(!showTrails) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    console.log(balls[0].xVel)

    drawAndUpdateBalls();

    if(running) {
        requestAnimationFrame(animate);
    }
}

initBalls();
