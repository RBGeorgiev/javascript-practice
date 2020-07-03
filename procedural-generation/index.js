const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const generateRandomPoints = (startX, startY, endX, endY) => {
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 1000; i++) {
        let x = Math.random() * (endX - startX) + startX;
        let y = Math.random() * (endY - startY) + startY;
        ctx.fillRect(x, y, 3, 3);
    }
}

generateRandomPoints(0, 0, canvas.width, canvas.height)