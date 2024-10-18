const canvasContainer = document.getElementById("canvas-container");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvasContainer.getBoundingClientRect().width;
canvas.height = canvasContainer.getBoundingClientRect().height;

// draw the turtle
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(90, 90);
ctx.lineTo(90, 110);
ctx.lineTo(100, 100);
ctx.strokeStyle = "white";
ctx.stroke();
