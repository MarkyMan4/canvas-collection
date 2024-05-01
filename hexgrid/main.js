const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gridOffsetX = canvas.width / 2;
let gridOffsetY = canvas.height / 2;
let hexagons = [];

const hexRadius = 50; // distance from center to a vertex
const innerRadius = (Math.sqrt(3) * hexRadius) / 2; // distance from center to the center point of an edge

window.addEventListener("resize", _ => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gridOffsetX = canvas.width / 2;
    gridOffsetY = canvas.height / 2;   

    generateAndDrawHexagons();
});

document.addEventListener("mousemove", ev => {
    let mx = ev.clientX;
    let my = ev.clientY;

    // find which hexagon the mouse is over, if any
    let selectedHex;

    for(let i = 0; i < hexagons.length; i++) {
        // distance from mouse to center of hexagon
        let distance = Math.sqrt(Math.pow(mx - hexagons[i].x, 2) + Math.pow(my - hexagons[i].y, 2));
        if(distance <= innerRadius) {
            selectedHex = hexagons[i];
            break;
        }
    }

    if(selectedHex !== undefined) {
        for(let i = 0; i < hexagons.length; i++) {
            if(hexagons[i] == selectedHex) {
                hexagons[i].bg = "#6e6e6e";
            }
            else if(hexagons[i].q === selectedHex.q) {
                hexagons[i].bg = "#a9c9b7";
            }
            else if(hexagons[i].r === selectedHex.r) {
                hexagons[i].bg = "#cce6ff";
            }
            else if(hexagons[i].s === selectedHex.s) {
                hexagons[i].bg = "#f7dff7";
            }
            else {
                hexagons[i].bg = "#383838";
            }
        }

        drawAllHexagons();
    }
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
    ctx.fillStyle = hex.bg;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.beginPath();
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

const drawAllHexagons = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hexagons.forEach(hex => {
        drawHexagon(hex);
    });
}

const generateAndDrawHexagons = () => {
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
                    hexagons.push(
                        {
                            q: q, 
                            r: r, 
                            s: s, 
                            x: x, 
                            y: y, 
                            bg: "#383838"
                        }
                    );
                }
            }
        }
    }

    drawAllHexagons();
}

generateAndDrawHexagons();
