const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class RainDrop {
    COLORS = [[3, 252, 198], [252, 3, 44], [211, 3, 252], [3, 90, 252], [217, 123, 0], [44, 191, 25], [240, 233, 29], [255, 97, 218]];

    constructor(x, y, radius, maxY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.maxY = maxY;
        this.speed = (Math.random() * 5) + 5;
        this.tailLength = 10 * this.speed;

        this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        // draw the tail
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.tailLength);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
        ctx.stroke();

        // draw the rain drop
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
        ctx.fill();
    }
}

class Ripple {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radiusX = 1;
        this.radiusY = 0.15;
        this.radiusXDelta = 0.5;
        this.radiusYDelta = 0.15;
        this.alpha = 1;
        this.alphaDelta = 0.005;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
        console.log(`rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha})`);
        ctx.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha})`;
        ctx.stroke();
    }

    update() {
        this.radiusX += this.radiusXDelta;
        this.radiusY += this.radiusYDelta;
        this.alpha -= this.alphaDelta;
    }
}

class RainEffect {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.rainDrops = [];
        this.ripples = [];

        this.spawnRainDrops();
    }

    spawnRainDrops() {
        for(let i = 0; i < 5; i++) {
            let rainDrop = new RainDrop(
                Math.random() * this.canvas.width, 
                -5, 
                Math.random() * 2,
                (Math.random() * (canvas.height / 2)) + (canvas.height / 2)
            );
            this.rainDrops.push(rainDrop);
        }
    }

    drawAndUpdate() {
        // rain drops
        let indicesToRemove = [];

        this.rainDrops.forEach((r, i) => {
            r.draw(this.ctx);
            r.update();

            if(r.y >= r.maxY) {
                indicesToRemove.push(i);
            }
        });

        indicesToRemove.reverse().forEach(i => {
            let rainDrop = this.rainDrops[i];
            this.ripples.push(new Ripple(rainDrop.x, rainDrop.y, rainDrop.color));
            this.rainDrops.splice(i, 1);
        });

        // ripples
        indicesToRemove = [];
        
        this.ripples.forEach((r, i) => {
            r.draw(this.ctx);
            r.update();

            if(r.alpha <= 0.05) {
                indicesToRemove.push(i);
            }
        });

        indicesToRemove.reverse().forEach(i => {
            this.ripples.splice(i, 1);
        });
    }
}

let effect = new RainEffect(canvas, ctx);
let lastUpdateTime = new Date();

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let currentTime = new Date();

    if(currentTime.getTime() - lastUpdateTime.getTime() >= 500) {
        effect.spawnRainDrops();
        lastUpdateTime = currentTime;
    }

    effect.drawAndUpdate();

    requestAnimationFrame(animate);
}

animate();
