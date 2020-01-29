const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

// Draw starting from the middle of the canvas, make y positve draw upwards
ctx.translate(canvas.width / 2, canvas.height / 2);

function drawLine(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}

function drawKochSnowflakeSide(start, end, iter) {
    if (iter === 0) return drawLine(start, end);

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const step = Math.sqrt(dx ** 2 + dy ** 2) / 3;
    const currentAngle = Math.atan2(dy, dx);

    // left point of new triangle
    const left = {
        x: start.x + dx / 3,
        y: start.y + dy / 3
    };

    // right point of new trianle
    const right = {
        x: end.x - dx / 3,
        y: end.y - dy / 3,
    }

    // top point of new triangle
    const top = {
        x: left.x + Math.cos(currentAngle - Math.PI / 3) * step,
        y: left.y + Math.sin(currentAngle - Math.PI / 3) * step,
    }

    if (iter > 1) {
        drawKochSnowflakeSide(start, left, iter - 1);
        drawKochSnowflakeSide(left, top, iter - 1);
        drawKochSnowflakeSide(top, right, iter - 1);
        drawKochSnowflakeSide(right, end, iter - 1);
        return;
    }

    drawLine(start, left);
    drawLine(left, top);
    drawLine(top, right);
    drawLine(right, end);
}

function drawKochSnowFlake(iterations = 5) {
    const top = { x: 0, y: -195 };
    const left = { x: 195, y: 130 };
    const right = { x:-195, y: 130 };

    drawKochSnowflakeSide(top, left, iterations);
    drawKochSnowflakeSide(left, right, iterations);
    drawKochSnowflakeSide(right, top, iterations);
}

let iterations = 0;
setInterval(() => {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    drawKochSnowFlake(iterations);
    iterations += 1;
    if (iterations > 5) iterations = 0;
}, 1000);
