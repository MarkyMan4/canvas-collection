const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.beginPath()
ctx.arc(100, 100, 50, 0, 2 * Math.PI);
ctx.fillStyle = "DodgerBlue";
ctx.fill();