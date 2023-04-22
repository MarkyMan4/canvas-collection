const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const spacing = 30;
const rows = Math.ceil(canvas.height / spacing);
const cols = Math.ceil(canvas.width / spacing);

let points = [];

class Point {
    constructor(x, y) {
        this.xOffset = x;
        this.yOffset = y;
        this.orbitRadius = Math.random() * 10;
        this.theta = (Math.PI / 180) * (Math.random() * 360);
        this.thetaDelta = (Math.PI / 180) * (Math.random() * 10 - 5);
        this.x = (this.orbitRadius * Math.cos(this.theta)) + this.xOffset;
        this.y = (this.orbitRadius * Math.sin(this.theta)) + this.yOffset;
    }

    update() {
        this.x = (this.orbitRadius * Math.cos(this.theta)) + this.xOffset;
        this.y = (this.orbitRadius * Math.sin(this.theta)) + this.yOffset;
        this.theta += this.thetaDelta;
    }
}

const initPoints = () => {
    for(let i = 0; i < rows; i++) {
        let row = [];

        for(let j = 0; j < cols; j++) {
            let x = (j * spacing) + (Math.random() * 20 - 10);
            let y = (i * spacing) + (Math.random() * 20 - 10);
            row.push(new Point(x, y));
        }

        points.push(row);
    }
}

const drawAndUpdatePoints = () => {
    for(let i = 0; i < points.length; i++) {
        for(let j = 0; j < points[i].length; j++) {
            let point = points[i][j];
            ctx.beginPath();

            if(j < points[i].length - 1) {
                let pointRight = points[i][j + 1];
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(pointRight.x, pointRight.y);
                ctx.strokeStyle = 'white';
                ctx.stroke();
            }

            if(i < points.length - 1) {
                let pointDown = points[i + 1][j];
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(pointDown.x, pointDown.y);
                ctx.strokeStyle = 'white';
                ctx.stroke();
            }

            point.update();
        }
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAndUpdatePoints();
    requestAnimationFrame(animate);
}

initPoints();
animate();
