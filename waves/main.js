const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#fca103', '#03a9fc', '#03fc84', '#fc030b', '#9f5eff', '#fff45e'];

class Particle {
    constructor(x, y, containerWidth, containerHeight) {
        this.x = x;
        this.y = y;
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.radius = 5;
        this.xVel = Math.random() * 3 * (Math.random() > 0.5 ? -1 : 1);
        this.yVel = Math.random() * 3 * (Math.random() > 0.5 ? -1 : 1);
        this.trail = [{x: this.x, y: this.y}]; // list of objects with x and y attributes
        this.trailColor = colors[Math.floor(Math.random() * colors.length)];
    }

    draw(ctx) {
        // draw the particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        // draw the trail
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        
        this.trail.forEach(point => {
            ctx.lineTo(point.x, point.y);
        })

        ctx.strokeStyle = this.trailColor;
        ctx.stroke();
    }

    update() {
        this.x += this.xVel + Math.cos(this.y * Math.PI / 180) //+ Math.random() * 15 - 7.5;
        this.y += this.yVel * Math.sin(this.x * Math.PI / 180) //+ Math.random() * 15 - 7.5;

        this.trail.push({x: this.x, y: this.y});

        // if(this.trail.length > 100) {
        //     this.trail.shift();
        // }
    }
}

let particles = [];

const initparticles = () => {
    for(let i = 0; i < 100; i++) {
        let particle = new Particle(Math.random() * canvas.width, Math.random() * canvas.height);
        particles.push(particle);
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(c => {
        c.draw(ctx);
        c.update();
    })

    requestAnimationFrame(animate);
}

initparticles();
animate();
