const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Spot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = (Math.random() * 10) + 10;
        this.xVel = Math.random() * -5;
        this.hasHalo = Math.random() < 0.1;
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

    }
}

let spots = [];

for(let i = 0; i < 50; i++) {
    spots.push(new Spot(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spots.forEach(s => {
        s.draw(ctx);
        s.update();
    });

    setTimeout(() => requestAnimationFrame(animate), 60 / 1000);
}

animate();
