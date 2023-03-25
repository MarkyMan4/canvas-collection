const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xVel = Math.random() * 2 * (Math.random() > 0.5 ? -1 : 1);
        this.yVel = Math.random() * 2 * (Math.random() > 0.5 ? -1 : 1);
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;
    }
}

let balls = [];

const initBalls = () => {
    for(let i = 0; i < 200; i++) {
        let ball = new Ball(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            7
        );

        balls.push(ball);
    }
}

// check if a ball is close to other balls
// if they are, draw a line between them
const drawNetworks = () => {
    balls.forEach(ball1 => {
        balls.forEach(ball2 => {
            let distance = Math.sqrt(Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2));
            if(distance <= 150) {
                ctx.beginPath();
                ctx.moveTo(ball1.x, ball1.y);
                ctx.lineTo(ball2.x, ball2.y);
                ctx.strokeStyle = 'white';
                ctx.stroke();
            }
        });
    });
}

const drawAndUpdateBalls = () => {
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'MediumSeaGreen';
        ctx.strokeStyle = 'white';
        ctx.fill();
        ctx.stroke();

        ball.update();

        if(ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
            ball.xVel *= -1;
        }

        if(ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
            ball.yVel *= -1;
        }
    });
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawNetworks();
    drawAndUpdateBalls();

    requestAnimationFrame(animate);
}

initBalls();
animate();
