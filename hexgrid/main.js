const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gridOffsetX = canvas.width / 2;
let gridOffsetY = canvas.height / 2;
let hexagons = [];

const hexRadius = 50;

window.addEventListener("resize", _ => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gridOffsetX = canvas.width / 2;
    gridOffsetY = canvas.height / 2;   

    generateAndDrawHexagons();
});

const drawHexagon = (hex) => {
    ctx.translate(hex.x, hex.y);

    for(let i = 0; i < 6; i++) {
        let rotation = (Math.PI / 3) * i;

        if(i === 0) {
            ctx.moveTo(Math.cos(rotation) * hexRadius, Math.sin(rotation) * hexRadius);
        }
        else {
            ctx.lineTo(Math.cos(rotation) * hexRadius, Math.sin(rotation) * hexRadius);
        }
    }

    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.font = "12px Courier New";
    ctx.textAlign = "center";

    ctx.fillStyle = "MediumSeaGreen";
    ctx.fillText(`${hex.q}`, 0, -(Math.sqrt(3) * hexRadius / 2) + 14);

    ctx.fillStyle = "DodgerBlue";
    ctx.fillText(`${hex.r}`, Math.sqrt(3) * hexRadius / 2 - 18, Math.sqrt(3) * hexRadius / 2 - 18);

    ctx.fillStyle = "magenta";
    ctx.fillText(`${hex.s}`, -Math.sqrt(3) * hexRadius / 2 + 18, Math.sqrt(3) * hexRadius / 2 - 18);

    ctx.resetTransform();
}

const generateAndDrawHexagons = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hexagons = [];

    // should be a better way to do this
    // goal is to find all combinations of q, r and s such that q + r + s = 0
    for(let q = -3; q <= 3; q++) {
        for(let r = -3; r <= 3; r++) {
            for(let s = -3; s <= 3; s++) {
                // yuck?
                if(q + r + s === 0) {
                    // hex to pixel calculation - https://www.redblobgames.com/grids/hexagons/#hex-to-pixel
                    let x = hexRadius * ((3/2) * q) + gridOffsetX;
                    let y = hexRadius * ((Math.sqrt(3) / 2) * q + Math.sqrt(3) * r) + gridOffsetY;
                    hexagons.push({q: q, r: r, s: s, x: x, y: y});
                }
            }
        }
    }

    hexagons.forEach(hex => {
        drawHexagon(hex);
    });
}

generateAndDrawHexagons();
