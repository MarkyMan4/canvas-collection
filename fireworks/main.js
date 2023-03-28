const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*
a particle is a circle that gets smaller over time and moves with a random velocity
*/
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.xVel = Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1);
        this.yVel = Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1);
        this.radius = (Math.random() * 10) + 5;
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;
        this.radius -= 0.15;
    }
}

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2;
    }
}

const colors = ['#37b358', '#1990ff', '#8b2fed', '#ed2f49', '#ed882f'];
let particles = [];
let stars = [];

const initStars = () => {
    for(let i = 0; i < 1000; i++) {
        stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

const drawStars = () => {
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    })
}

const spawnFirework = () => {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let color = colors[Math.floor(Math.random() * colors.length)];

    for(let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y, color));
    }
}

const drawAndUpdateParticles = () => {
    let indicesToRemove = [];

    particles.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.update();

        if(p.radius <= 0.2) {
            indicesToRemove.push(idx);
        }
    });

    // remove particles that are too small
    // go in reverse order so indices aren't messed up as they get removed
    for(let i = indicesToRemove.length - 1; i >= 0; i--) {
        particles.splice(indicesToRemove[i], 1);
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(Math.random() < 0.1) {
        spawnFirework();
    }

    drawStars();
    drawAndUpdateParticles();

    requestAnimationFrame(animate);
}

initStars();
animate();
