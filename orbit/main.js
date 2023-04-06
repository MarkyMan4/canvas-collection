const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(xOffset, yOffset, radius, angle, angleDelta, orbitRadius, color) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.x = xOffset + orbitRadius;
        this.y = yOffset;
        this.radius = radius;
        this.angle = angle;
        this.angleDelta = angleDelta;
        this.orbitRadius = orbitRadius;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x = (this.orbitRadius * Math.cos(this.angle)) + this.xOffset;
        this.y = (this.orbitRadius * Math.sin(this.angle)) + this.yOffset;
        this.angle += this.angleDelta;
    }
}

class OrbitEffect {
    COLORS = ['#1f75ff', '#e61c55', '#981ce6', '#007334', '#e38a1e', '#eff22e', '#1ee880', '#db001d'];

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];

        this.initParticles();
    }

    initParticles() {
        for(let i = 0; i < 100; i++) {
            let p = new Particle(
                canvas.width / 2,
                canvas.height / 2,
                (Math.random() * 10) + 10,
                0,
                (Math.PI / 180) * (Math.random() * 2 + 0.2),
                (Math.random() * 1000) + 50,
                this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
            );
    
            this.particles.push(p);
        }
    }

    drawAndUpdateParticles() {
        this.particles.forEach(p => {
            p.draw(this.ctx);
            p.update();
        })
    }
}

let effect = new OrbitEffect(canvas, ctx);

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.drawAndUpdateParticles();
    requestAnimationFrame(animate);
}

animate();
