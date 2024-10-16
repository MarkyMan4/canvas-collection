const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// initialize particles
let particles = [];

for(let i = 0; i < 500; i++) {
    let x = 5;
    let y = 5;
    particles.push(new Point(x, y));
}

function drawQuadtree(quadtree) {
    if(quadtree === null) {
        return;
    }

    ctx.beginPath();
    ctx.rect(quadtree.boundingBox.x, quadtree.boundingBox.y, quadtree.boundingBox.width, quadtree.boundingBox.height);
    ctx.strokeStyle = "white";
    ctx.stroke();

    drawQuadtree(quadtree.northwest);
    drawQuadtree(quadtree.northeast);
    drawQuadtree(quadtree.southwest);
    drawQuadtree(quadtree.southeast);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let qt = new Quadtree(new Rectangle(0, 0, canvas.width, canvas.height), 4);
    particles.forEach(p => {
        qt.insert(p);
        p.draw(ctx);
        p.update();

        // bounce particles off walls
        if(p.x <= 0 || p.x >= canvas.width) {
            p.xVel *= -1;
        }

        if(p.y <= 0 || p.y >= canvas.height) {
            p.yVel *= -1;
        }
    });

    drawQuadtree(qt);

    // limit framerate to 60fps

    window.setTimeout(() => requestAnimationFrame(animate), 1000 / 60);
}

animate();
