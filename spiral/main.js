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
        this.angleDelta = (Math.PI / 180) * (5 - (distFromCenter * 0.01));
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

for(let i = 0; i < canvas.height / 2; i += 10) {
    balls.push(new Ball(canvas.width / 2, canvas.height / 2, i, 5));
}
// balls.push(new Ball(canvas.width / 2, canvas.height / 2, 100, 10));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(b => {
        b.draw(ctx);
        b.update();
    });

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    requestAnimationFrame(animate);
}

animate();
