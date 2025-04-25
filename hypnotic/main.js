const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = [
    '#eb4034', 
    'MediumSeaGreen', 
    'DodgerBlue', 
    '#9740f5', 
    '#f0dc4a', 
    '#001ec9', 
    '#0b7d26'
];

let ripples = [];
let lines = [];

class Ripple {
    constructor(x, y, radius, color, width) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.width = width;
        this.speed = 2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    update() {
        this.radius += 3;
    }
}

class Line {
    constructor(x1, y1, x2, y2, color, width, direction) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.width = width;
        this.direction = direction;
        this.speed = 2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
    }

    update() {
        if(this.direction === 'up') {
            this.y1 -= this.speed;
            this.y2 -= this.speed;
        }
        else {
            this.y1 += this.speed;
            this.y2 += this.speed;
        }
    }
}

window.setInterval(() => {
    let rippleX1 = canvas.width * 0.25;
    let rippleY1 = canvas.height * 0.5;
    let rippleX2 = canvas.width * 0.75;
    let rippleY2 = canvas.height * 0.5;
    let rippleX3 = canvas.width * 0.5;
    let rippleY3 = canvas.height * 0.5;

    let color = colors[Math.floor(Math.random() * colors.length)];

    let ripple1 = new Ripple(rippleX1, rippleY1, 1, color, 2);
    let ripple2 = new Ripple(rippleX2, rippleY2, 1, color, 2);
    let ripple3 = new Ripple(rippleX3, rippleY3, 1, color, 2);

    ripples.push(ripple1);
    ripples.push(ripple2);
    ripples.push(ripple3);

    let line1 = new Line(0, 0, canvas.width, 0, color, 2, 'down');
    let line2 = new Line(0, canvas.height, canvas.width, canvas.height, color, 2, 'up');

    lines.push(line1);
    lines.push(line2);
}, 250);

// remove ripples once they reach a certain size
const removeLargeRipples = () => {
    let indicesToRemove = [];

    ripples.forEach((ripple, idx) => {
        if(ripple.radius >= canvas.width / 2) {
            indicesToRemove.push(idx)
        }
    });

    indicesToRemove.reverse().forEach(idx => {
        ripples.splice(idx, 1);
    });
}

// remove lines at halfway point of screen
const removeLines = () => {
    let indicesToRemove = [];

    lines.forEach((line, idx) => {
        if((line.direction === 'up' && line.y1 <= (canvas.height / 2))
            || (line.direction === 'down' && line.y1 >= (canvas.height / 2))) {
            indicesToRemove.push(idx)
        }
    });

    indicesToRemove.reverse().forEach(idx => {
        lines.splice(idx, 1);
    });
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ripples.forEach(ripple => {
        ripple.draw(ctx);
        ripple.update();
    });

    lines.forEach(line => {
        line.draw(ctx);
        line.update();
    });

    removeLargeRipples();
    removeLines();

    requestAnimationFrame(animate);
}

animate();
