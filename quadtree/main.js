const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let qt = new Quadtree(new Rectangle(0, 0, canvas.width, canvas.height), 4);
for(let i = 0; i < 300; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    qt.insert(new Point(x, y));

    // for debugging, draw the point
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "MediumSeaGreen";
    ctx.fill();
}

console.log(qt);

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

drawQuadtree(qt);
