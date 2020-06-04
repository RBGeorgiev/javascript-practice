import shuffle from './shuffle.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


const initArray = (length) => {
    let arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(i);
    }

    return arr;
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
let arr = initArray(50);
arr = shuffle(arr);
drawArray(arr);