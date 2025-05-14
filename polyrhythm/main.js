const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ball {
    constructor(xOffset, yOffset, distFromCenter, radius) {
        this.x = xOffset;
        this.y = yOffset;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.distFromCenter = distFromCenter;
        this.radius = radius;
        this.angle = 0;
        this.angleDelta = (Math.PI / 180) * (1 - ((distFromCenter / (radius * 2)) * 0.02));
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    update() {
        this.x = (this.distFromCenter * Math.cos(this.angle)) + this.xOffset;
        this.y = (this.distFromCenter * Math.sin(this.angle)) + this.yOffset;

        this.angle += this.angleDelta;
    }
}

let balls = [];
const BALL_RADIUS = 5;

for(let i = BALL_RADIUS * 2; i < canvas.height / 2; i += BALL_RADIUS * 2) {
    balls.push(new Ball(canvas.width / 2, canvas.height / 2, i, BALL_RADIUS));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(b => {
        b.draw(ctx);
        b.update();
    });

    requestAnimationFrame(animate);
}

animate();
