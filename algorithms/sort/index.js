import shuffle from './shuffle.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let arr = [];

for (let i = 0; i < 50; i++) {
    arr.push(i);
}

const drawArray = (arr, maxLineLength = 250, lineStart = 100) => {
    let len = arr.length;
    let w = canvas.width;
    let h = canvas.height;

    for (let i = 0; i < len; i++) {
        ctx.beginPath();
        ctx.moveTo(
            (w / len) / 2 + w / len * i,
            h
        );
        ctx.lineTo(
            (w / len) / 2 + w / len * i,
            h - lineStart - arr[i] * maxLineLength / len
        );
        ctx.stroke();
    }
}

arr = shuffle(arr);
drawArray(arr);