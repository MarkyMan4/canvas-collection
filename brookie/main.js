const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Spot {
    constructor(x, y, isHalo) {
        this.x = x;
        this.y = y;
        this.isHalo = isHalo;
    }
}

let spots = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    

    setTimeout(() => requestAnimationFrame(animate), 60 / 1000);
}

animate();
