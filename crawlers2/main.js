const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let crawlers = [];

class Crawler {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xVel = (Math.random() * 6) - 3;
        this.yVel = (Math.random() * 6) - 3;
        this.trail = [{x: this.x, y: this.y}];
    }

    draw(ctx) {
        // draw trail
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);

        this.trail.forEach(p => {
            ctx.lineTo(p.x, p.y);
        });

        ctx.strokeStyle = 'white';
        ctx.stroke();

        // draw crawler
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    update() {
        this.x += this.xVel + (Math.random() * 8 - 4);
        this.y += this.yVel + (Math.random() * 8 - 4);

        this.trail.push({x: this.x, y: this.y});

        if(this.trail.length >= 200) {
            this.trail.shift();
        }
    }
}

const initCrawlers = () => {
    crawlers = [];

    for(let i = 0; i < 500; i++) {
        let crawler = new Crawler(canvas.width / 2, canvas.height / 2);
        crawlers.push(crawler);
    }
}

window.setInterval(initCrawlers, 10000);

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
