const canvas = document.getElementById('menu-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class RainDrop {
    constructor(x, y, maxY) {
        this.x = x;
        this.y = y;
        this.maxY = maxY;
        this.radius = Math.random() * 2;

        this.speed = (Math.random() * 2) + 2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'DodgerBlue';
        ctx.fill();
    }

    update() {
        this.y += this.speed;
    }
}

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
        ctx.strokeStyle = `rgba(42, 78, 196, ${this.alpha})`;
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

        this.spawnRain();

    }

    spawnRain() {
        for(let i = 0; i < 2; i++) {
            let rainDrop = new RainDrop(
                Math.random() * canvas.width,
                -5,
                (Math.random() * (canvas.height / 2)) + (canvas.height / 2)
            );
            this.rainDrops.push(rainDrop);
        }
    }

    drawAndUpdateRainDrops() {
        let indicesToRemove = [];
        this.rainDrops.forEach((r, idx) => {
            r.draw(this.ctx);
            r.update();

            if(r.y >= r.maxY) {
                indicesToRemove.push(idx);
            }
        });

        for(let i = indicesToRemove.length - 1; i >= 0; i--) {
            let rainDrop = this.rainDrops[indicesToRemove[i]];
            this.ripples.push(new Ripple(rainDrop.x, rainDrop.y));
            this.rainDrops.splice(indicesToRemove[i], 1);
        }
    }

    drawAndUpdateRipples() {
        let indicesToRemove = [];
        this.ripples.forEach((r, idx) => {
            r.draw(this.ctx);
            r.update();

            if(r.alpha <= 0.05) {
                indicesToRemove.push(idx);
            }
        });

        for(let i = indicesToRemove.length - 1; i >= 0; i--) {
            this.ripples.splice(indicesToRemove[i], 1);
        }
    }

    update() {
        this.drawAndUpdateRainDrops();
        this.drawAndUpdateRipples();
    }
}

let effect = new RainEffect(canvas, ctx);
let lastSpawnTime = new Date();

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    let currentTime = new Date();

    if(currentTime.getTime() - lastSpawnTime.getTime() >= 100) {
        effect.spawnRain();
        lastSpawnTime = currentTime;
    }

    requestAnimationFrame(animate);
}

animate();
