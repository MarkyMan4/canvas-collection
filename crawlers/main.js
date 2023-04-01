const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Crawler {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.xVel = Math.random() * 5 - 2.5;
        this.yVel = Math.random() * 5 - 2.5;
        this.trail = [{x: this.x, y: this.y}];
    }

    draw(ctx) {
        // draw crawler
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        // draw trail
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);

        this.trail.forEach(t => {
            ctx.lineTo(t.x, t.y);
        });

        ctx.strokeStyle = 'white';
        ctx.stroke();
    }

    update() {
        this.x += this.xVel + (Math.random() * 10 - 5);
        this.y += this.yVel + (Math.random() * 10 - 5);

        // add new x and y to trail
        this.trail.push({x: this.x, y: this.y});

        if(this.trail.length > 250) {
            this.trail.shift();
        }
    }
}

let crawlers = [];


/* event listeners */

document.addEventListener('mousedown', (event) => {
    for(let i = 0; i < 20; i++) {
        crawlers.push(new Crawler(event.clientX, event.clientY));
    }
})

/* end event listeners */

const clearCrawlers = () => {
    crawlers = [];
}

const initCrawlers = () => {
    for(let i = 0; i < 100; i++) {
        let crawler = new Crawler(Math.random() * canvas.width, Math.random() * canvas.height);
        crawlers.push(crawler);
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    crawlers.forEach(c => {
        c.draw(ctx);
        c.update();
    })

    requestAnimationFrame(animate);
}

initCrawlers();
animate();
