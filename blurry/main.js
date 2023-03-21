const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
const numBallsToSpawn = 75;
const colors = ['#4287f5', '#f5425d', '#06ba45', '#e09b10', '#8715eb', '#f0cf2e', '#e854e3'];
let clearScreen = true;

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        // balls start off blurry, become more focused, and then more blurry again
        this.blur = (Math.random() * 5) + 120;
        this.blurDelta = Math.random() * -1;
        this.xVel = Math.random() * (Math.random() > 0.5 ? 1 : -1);
        this.yVel = Math.random() * (Math.random() > 0.5 ? 1 : -1);
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;
        this.blur += this.blurDelta;

        if(this.blur <= 2) {
            this.blurDelta *= -1;
        }
    }
}

const spawnBalls = () => {
    for(let i = 0; i < numBallsToSpawn; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let radius = Math.random() * 50;
        let color = colors[Math.floor(Math.random() * colors.length)];

        balls.push(new Ball(x, y, radius, color));
    }
}

const drawAndUpdateBalls = () => {
    // draw and update
    for(let i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2 * Math.PI);
        ctx.fillStyle = balls[i].color;
        ctx.filter = `blur(${balls[i].blur}px)`;
        ctx.fill();

        balls[i].update();
    }

    // remove blobs with blurriness > 40 and blobs that are off screen
    for(let i = 0; i < balls.length; i++) {
        if(balls[i].blur > 130 || balls[i].x - balls[i].radius < 0 || balls[i].x + balls[i].radius > canvas.width
            || balls[i].y - balls[i].radius < 0 || balls[i].y + balls[i].radius > canvas.height) {
            balls.splice(i, 1);
        }
    }
}

const animate = () => {
    if(clearScreen) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawAndUpdateBalls();
    
    // spawn more balls if the amount on screen is less than 20
    if(balls.length <= 20) {
        spawnBalls();
    }

    requestAnimationFrame(animate);
}

spawnBalls();
animate();
