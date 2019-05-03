const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
const downloadButton = document.getElementById("downloadButton");
const penSize = document.getElementById("penSize");

// Disable right click menu on canvas
canvas.oncontextmenu = function (e) {
    e.preventDefault();
};

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - document.querySelector(".controls").offsetHeight;

// Set background color to white
clearCanvas()

let drawing = false;
let posX, posY;


canvas.addEventListener("mousedown", (e) => { penStyle(e); getPosXY(e); draw(e); });
canvas.addEventListener("mousemove", draw);
document.addEventListener("mouseup", stopDrawing);

canvas.addEventListener("mouseover", function (e) {
    //Fixes a bug that happens when going out of canvas bounds
    if (!drawing) return;
    getPosXY(e);
});

penSize.addEventListener("change", () => {
    document.getElementById("penSizeLabel").innerHTML = `Brush Size: ${penSize.value}`;
});


function getColor(e) {
    if (e.which === 3) {
        // If right click, then erase
        ctx.strokeStyle = "white";
    } else {
        (document.getElementById("eraser").checked) ? ctx.strokeStyle = "white" : ctx.strokeStyle = document.getElementById("colorSelector").value;
    }
}

function penStyle(e) {
    getColor(e);
    ctx.lineWidth = penSize.value;
    ctx.lineCap = "round";
}

function getPosXY(e) {
    drawing = true;
    [posX, posY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!drawing) return;
    if (e.which === 2) return;
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.closePath();
    [posX, posY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    drawing = false;
}

function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //onClick call is directly in HTML
}

function downloadImage() {
    downloadButton.href = canvas.toDataURL();
    //onClick call is directly in HTML
}