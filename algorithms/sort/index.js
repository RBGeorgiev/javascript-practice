import shuffle from './shuffle.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let arr = [];

for (let i = 0; i < 50; i++) {
    arr.push(i);
}

arr = shuffle(arr);
let len = arr.length;
for (let i = 0; i < len; i++) {
    ctx.beginPath();
    ctx.moveTo(
        (canvas.width / len) / 2 + canvas.width / len * i,
        canvas.height
    );
    ctx.lineTo(
        (canvas.width / len) / 2 + canvas.width / len * i,
        canvas.height - 100 - arr[i] * 4
    );
    ctx.stroke();
}