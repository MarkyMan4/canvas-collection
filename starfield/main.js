const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Star {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 0;
        this.xVel = Math.random() * (Math.random() >= 0.5 ? -1 : 1);
        this.yVel = Math.random() * (Math.random() >= 0.5 ? -1 : 1);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;
        this.xVel *= 1.05;
        this.yVel *= 1.05;
        this.radius += 0.07;
    }
}

let stars = [];

// spawn stars
window.setInterval(() => {
    for(let i = 0; i < 50; i++) {
        stars.push(new Star(canvas));
    }
}, 100);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let starsIdxsToRemove = [];
    stars.forEach((s, idx) => {
        s.draw();
        s.update();

        if(s.x + s.radius < 0 || s.x - s.radius > canvas.width || s.y + s.radius < 0 || s.y - s.radius > canvas.height) {
            starsIdxsToRemove.push(idx);
        }
    });

    // remove offscreen stars
    for(let i = starsIdxsToRemove.length - 1; i >= 0; i--) {
        stars.splice(starsIdxsToRemove[i], 1);
    }

    setTimeout(() => requestAnimationFrame(animate), 1000 / 60);
}

animate();
