const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

// Draw starting from the botto, middle of the canvas, make y positve draw upwards
ctx.translate(canvas.width / 2, canvas.height);
ctx.rotate(Math.PI);

function drawLine(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}

function drawTree(start, end, iterations = 5) {
    drawLine(start, end);
    if (iterations === 0) return;

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const step = Math.sqrt(dx ** 2 + dy ** 2) / 1.7;
    const angle = Math.atan2(dy, dx);

    drawTree(end, {
        x: end.x + Math.cos(angle + 0.68) * step,
        y: end.y + Math.sin(angle + 0.68) * step
    }, iterations - 1);

    drawTree(end, {
        x: end.x + Math.cos(angle - 0.68) * step,
        y: end.y + Math.sin(angle - 0.68) * step
    }, iterations - 1);
}

let iterations = 0;
setInterval(() => {
    ctx.clearRect(-(canvas.width / 2), 0, canvas.width, canvas.height);
    drawTree({ x: 0, y: 0 }, { x: 0, y: 150 }, iterations);
    iterations += 1;
    if (iterations > 5) iterations = 0;
}, 1000);
