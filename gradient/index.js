const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

function drawGradient(blue) {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const pixel = Math.floor(i / 4);
        const col = pixel % canvas.width;
        const row = pixel / canvas.height;

        data[i] = 255 * (col / canvas.width);
        data[i + 1] = 255 * (row / canvas.height);
        data[i + 2] = blue;
        data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
}

drawGradient(42);
canvas.addEventListener("mousemove", e => drawGradient(Math.min(255, e.x)));
