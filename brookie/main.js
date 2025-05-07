const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Spot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = (Math.random() * 10) + 10;
        this.xVel = Math.random() * 5 + 1;
        this.hasHalo = Math.random() < 0.2;
    }

    drawCircle(ctx, x, y, r, color) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    draw(ctx) {
        if(this.hasHalo) {
            this.drawCircle(ctx, this.x, this.y, this.radius + 5, "rgb(117, 161, 219)");
            this.drawCircle(ctx, this.x, this.y, this.radius, "rgb(206, 48, 82)");
        }
        else {
            this.drawCircle(ctx, this.x, this.y, this.radius, "rgb(116, 121, 104)");
        }
    }

    update() { 
        this.x += this.xVel;
        this.y = (Math.sin(this.x / 200) * 2) + this.y;
    }
}

let spots = [];

function spawnSpots() {
    for(let i = 0; i < 30; i++) {
        spots.push(new Spot(-200, Math.random() * (canvas.height - (canvas.height / 3))));
    }
}

// initial spawn
spawnSpots();

// spawn 10 spots every second
setInterval(() => {
    spawnSpots();
}, 2000);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spotIndiciesToRemove = [];

    spots.forEach((s, idx) => {
        s.draw(ctx);
        s.update();

        if(s.x - s.radius > canvas.width) {
            spotIndiciesToRemove.push(idx);
        }
    });

    // remove off screen spots
    for(let i = spotIndiciesToRemove.length - 1; i >= 0; i--) {
        spots.splice(spotIndiciesToRemove[i], 1);
    }

    setTimeout(() => requestAnimationFrame(animate), 60 / 1000);
}

animate();
