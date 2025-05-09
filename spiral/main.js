const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.beginPath();
ctx.moveTo(canvas.width / 2, canvas.height / 2);
ctx.lineTo(canvas.width / 2 + 100, canvas.height / 2 + 100);
ctx.strokeStyle = "white";
ctx.stroke();
