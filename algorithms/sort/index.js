let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

class Controller {
    constructor(length) {
        this.arr = this.init(length)
    }

    init = (length) => this.shuffleArray(
        this.initArray(length)
    );

    initArray = (length) => {
        let arr = [];

        for (let i = 0; i < length; i++) {
            arr.push(i);
        }

        return arr;
    }

    shuffleArray = (arr) => {
        let k = arr.length, r, t;

        while (k > 0) {
            r = Math.floor(Math.random() * k--);
            t = arr[k];
            arr[k] = arr[r];
            arr[r] = t;
        }

        return arr;
    }
}

const displayArray = (arr, maxLineLength = 250, lineStart = 100) => {
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

let controller = new Controller(50)
let arr = controller.arr;
displayArray(arr);