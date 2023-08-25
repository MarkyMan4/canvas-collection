const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#eb4034', 'MediumSeaGreen', 'DodgerBlue', '#9740f5', '#f0dc4a', '#001ec9', '#0b7d26'];
let ripples = [];

class Ripple {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.sepiaPct = 1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.lineWidth = 20;
        ctx.strokeStyle = this.color;
        ctx.filter = `sepia(${this.sepiaPct}%)`;
        ctx.stroke();
    }

    update() {
        this.radius += 3;
        this.sepiaPct += 0.5;
    }
}

document.addEventListener('mousedown', (ev) => {
    let radius = 140;

    colors.forEach(color => {
        let ripple = new Ripple(ev.clientX, ev.clientY, radius, color);
        ripples.push(ripple);
        radius -= 20;
    })
});

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

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ripples.forEach(ripple => {
        ripple.draw(ctx);
        ripple.update();
    });

    removeLargeRipples();

    requestAnimationFrame(animate);
}

animate();
