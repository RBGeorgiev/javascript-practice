const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
const downloadButton = document.getElementById("downloadButton");
const penSize = document.getElementById("penSize");
const cursor = document.getElementById("cursor");

// Disable right click menu on canvas
canvas.oncontextmenu = function (e) {
    e.preventDefault();
};

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - document.querySelector(".controls").offsetHeight;

// Set background color to white
clearCanvas()

// posX & posY refresh every time a new click is made through the getPosXY() function
// lastX & lastY DON'T refresh and always store the last click position
let posX, posY, lastX, lastY;
let drawing = false;


canvas.addEventListener("mousedown", (e) => { penStyle(e); getPosXY(e); draw(e); });
canvas.addEventListener("mousemove", draw);
document.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("click", drawStraightLine);
canvas.addEventListener("click", bucketFill);
canvas.addEventListener("mouseover", function (e) {
    //Fixes a bug that happens when going out of canvas bounds
    if (!drawing) return;
    getPosXY(e);
});

penSize.addEventListener("change", () => {
    document.getElementById("penSizeLabel").innerHTML = `Size: ${penSize.value}`;
});
canvas.addEventListener("mousemove", updateCursor);


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

function drawStraightLine(e) {
    if (e.which === 2) return;
    if (bucket.checked) return;
    if (!e.shiftKey) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.closePath();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!drawing) return;
    if (e.which === 2) return;
    if (bucket.checked) return;
    if (e.shiftKey) return;

    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.closePath();

    // posX & posY refresh every time a new click is made through the getPosXY() function
    // lastX & lastY DON'T refresh and always store the last click position
    [posX, posY] = [e.offsetX, e.offsetY];
    [lastX, lastY] = [posX, posY];
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

function updateCursor(e) {
    // base cursor size on pen size slider
    cursor.style.width = `${penSize.value}px`
    cursor.style.height = `${penSize.value}px`

    // center cursor on mouse position 
    cursor.style.left = `${e.offsetX - penSize.value / 2}px`
    cursor.style.top = `${e.offsetY + document.querySelector(".controls").offsetHeight - penSize.value / 2}px`
}

function bucketFill(e) {
    if (!bucket.checked) return;
    [posX, posY] = [e.offsetX, e.offsetY];

    let oldColor = ctx.getImageData(posX, posY, 1, 1)['data'],
        newColor = hexToRGB(document.getElementById("colorSelector").value),
        colorLayerData = ctx.getImageData(0, 0, canvas.width, canvas.height),
        pixelStack = [[posX, posY]];

    if (oldColor[0] === newColor[0] &&
        oldColor[1] === newColor[1] &&
        oldColor[2] === newColor[2]) {
        // Return if trying to fill with the same color
        return;
    }
    scanlineFill(pixelStack, oldColor, newColor, colorLayerData);
}

function scanlineFill(pixelStack, oldColor, newColor, colorLayerData) {
    let pixelPos,
        checkLeft,
        checkRight;

    while (pixelStack.length) {
        newPos = pixelStack.pop();
        newX = newPos[0];
        newY = newPos[1];

        // Get current pixel position
        pixelPos = (newY * canvas.width + newX) * 4;

        // Go up as long as the color matches and is inside the canvas
        while (newY && checkColorMatch(pixelPos, oldColor, colorLayerData)) {
            newY--;
            pixelPos -= canvas.width * 4;
        }
        //fix while loop overshooting by 1 pixel
        pixelPos += canvas.width * 4;
        newY++;

        checkLeft = true;
        checkRight = true;

        // Go down as long as the color matches and is inside the canvas
        while (newY < canvas.height && checkColorMatch(pixelPos, oldColor, colorLayerData)) {
            newY += 1;

            // change old color to new color
            colorPixel(pixelPos, newColor, colorLayerData);
            pixelPos += canvas.width * 4;

            //check if pixel on the left is the old color 
            if (newX > 0) {
                if (checkColorMatch(pixelPos - 4, oldColor, colorLayerData)) {
                    if (checkLeft) {
                        // if pixel is the old color push the coordinates to pixelStack
                        pixelStack.push([newX - 1, newY]);
                        checkLeft = false;
                    }
                } else if (!checkLeft) {
                    // if color doesn't match old color start looking for a match to push into pixelStack
                    checkLeft = true;
                }
            }

            //check if pixel on the right is the old color 
            if (newX < canvas.width - 1) {
                if (checkColorMatch(pixelPos + 4, oldColor, colorLayerData)) {
                    if (checkRight) {
                        // if pixel is the old color push the coordinates to pixelStack
                        pixelStack.push([newX + 1, newY]);
                        checkRight = false;
                    }
                } else if (!checkRight) {
                    // if color doesn't match old color start looking for a match to push into pixelStack
                    checkRight = true;
                }
            }
        }
        // draw all changes made in the while loop
        ctx.putImageData(colorLayerData, 0, 0);
    }
}

function checkColorMatch(pixelPos, oldColor, colorLayerData) {
    curR = colorLayerData['data'][pixelPos];
    curG = colorLayerData['data'][pixelPos + 1];
    curB = colorLayerData['data'][pixelPos + 2];

    // If the current pixel color matches the starting color return true
    if (curR === oldColor[0] && curG === oldColor[1] && curB === oldColor[2]) {
        return true;
    }
    return false;
}

function colorPixel(pixelPos, newColor, colorLayerData) {
    colorLayerData.data[pixelPos] = newColor[0];
    colorLayerData.data[pixelPos + 1] = newColor[1];
    colorLayerData.data[pixelPos + 2] = newColor[2];
}

function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}