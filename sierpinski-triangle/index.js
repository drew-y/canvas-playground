const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

// Draw starting from the bottom middle of the canvas
ctx.translate(canvas.width / 2, canvas.height);

function drawLine(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}

function drawSierpinskiTriangle(start, length, iterations = 5) {
    const right = {
        x: start.x + length,
        y: start.y
    };

    const top = {
        x: start.x + Math.cos(Math.PI / 3) * length,
        y: start.y - Math.sin(Math.PI / 3) * length
    };

    drawLine(start, right);
    drawLine(right, top);
    drawLine(top, start);

    if (iterations <= 0) return;

    drawSierpinskiTriangle({
        x: (top.x + start.x) / 2,
        y: (top.y + start.y) / 2
    }, length / 2, iterations - 1);

    drawSierpinskiTriangle(start, length / 2, iterations - 1);
    drawSierpinskiTriangle({ x: start.x + length / 2, y: start.y }, length / 2, iterations - 1);
}

let iterations = 0;
setInterval(() => {
    ctx.clearRect(-(canvas.width / 2), -canvas.height, canvas.width, canvas.height);
    drawSierpinskiTriangle({ x: -110, y: -150 }, 220, iterations);
    iterations += 1;
    if (iterations > 5) iterations = 0;
}, 1000);
