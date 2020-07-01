import BubbleSort from './algorithms/bubble-sort.js';
import MergeSort from './algorithms/merge-sort.js';
import InsertionSort from './algorithms/insertion-sort.js';
import Quicksort from './algorithms/quicksort.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let arrayLengthInput = document.getElementById("arrayLengthInput");
let arrayLengthSpan = document.getElementById("arrayLengthSpan");
let shuffleBtn = document.getElementById("shuffleBtn");
let sortBtn = document.getElementById("sortBtn");
let sortSelect = document.getElementById("sortSelect");
let displayStyleSelect = document.getElementById("displayStyleSelect");

const SORT_TYPES = {
    "bubbleSort": BubbleSort,
    "mergeSort": MergeSort,
    "insertionSort": InsertionSort,
    "quicksort": Quicksort
}

class Controller {
    constructor(length) {
        this.animFrameId;
        this.arr = this.init(length);
        this.initEventListeners();
        this.sorted = false;
        this.maxLineWidth = 20;
    }

    init = (length) => this.shuffleArray(
        this.initArray(length)
    )

    initEventListeners = () => {
        shuffleBtn.onclick = () => {
            this.stopAnimFrame();
            this.shuffleArray(this.arr);
            this.clearCanvas();
            this.displayArray();
            this.sorted = false;
        }

        sortBtn.onclick = () => {
            this.stopAnimFrame();
            if (this.sorted) {
                this.shuffleArray(this.arr);
            }
            let sort = new SORT_TYPES[sortSelect.value];
            this.arr = sort.run(this.arr);
            let stepsTaken = sort.getStepsTaken();
            this.clearCanvas();
            this.animateSteps(stepsTaken);
            this.sorted = true;
        }

        arrayLengthInput.oninput = (e) => {
            arrayLengthInput.blur();
            this.stopAnimFrame();
            let length = e.target.value;
            this.clearCanvas();
            this.arr = this.init(length);
            this.displayArray();
            arrayLengthSpan.innerText = length;
        }

        sortSelect.onchange = () => {
            sortSelect.blur();
            this.stopAnimFrame();
            let length = arrayLengthInput.value;
            this.clearCanvas();
            this.arr = this.init(length);
            this.displayArray();
            this.sorted = false;
        }

        displayStyleSelect.onchange = () => {
            displayStyleSelect.blur();
            this.clearCanvas();
            this.displayArray();
        }
    }

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

    // display methods

    clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

    displayArray = (arr = this.arr) => {
        let displayType = displayStyleSelect.value;

        switch (displayType) {
            case "displayArrayByLength":
                this.displayArrayByLength(arr);
                break;
            case "displayArrayByTilt":
                this.displayArrayByTilt(arr);
                break;
            default:
                this.displayArrayByLength(arr);
        }
    }

    displayArrayByLength = (arr = this.arr, maxLineLength = 250, lineStart = 100) => {
        let len = arr.length;
        let w = canvas.width;
        let h = canvas.height;
        let lineWidth = (w / len < this.maxLineWidth) ? w / len : this.maxLineWidth; // decide line width
        ctx.lineWidth = lineWidth;
        w -= lineWidth * 2; // remove drawable width to account for padding on both sides
        let padding = lineWidth;

        for (let i = 0; i < len; i++) {
            let posX = padding + ((w / len) / 2 + w / len * i);

            ctx.strokeStyle = this.getColor(len - 1, arr[i]);
            ctx.beginPath();
            ctx.moveTo(
                posX,
                h
            );
            ctx.lineTo(
                posX,
                h - lineStart - arr[i] * maxLineLength / len
            );
            ctx.stroke();
        }
    }

    displayArrayByTilt = (arr = this.arr) => {
        let lineHeight = 150;
        let lineWidth;
        let padding = lineHeight;
        let len = arr.length;
        let w = canvas.width - padding * 2;
        let h = canvas.height;
        lineWidth = (w / len < this.maxLineWidth) ? w / len : this.maxLineWidth;
        ctx.lineWidth = lineWidth;

        for (let i = 0; i < len; i++) {
            let posX = padding + ((w / len) / 2 + w / len * i);
            let posY = h / 2 + lineHeight / 2;
            let cx = posX - lineWidth / 2;
            let cy = h - lineHeight / 2;

            ctx.strokeStyle = this.getColor(len - 1, arr[i]);
            ctx.beginPath();
            ctx.moveTo(
                posX,
                posY
            );

            ctx.translate(cx, cy);
            ctx.rotate((Math.PI / 180) * (-45 + (90 * arr[i] / len)));
            ctx.translate(-cx, -cy);

            ctx.lineTo(
                posX,
                posY - lineHeight
            );
            ctx.stroke();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    animateSteps = (stepsTaken) => {
        let start = 0;
        let deltaTime = 0;
        let i = 0;
        let len = stepsTaken.length;

        const step = (timestamp) => {
            deltaTime = timestamp - start;
            start = timestamp;

            if (i > len - 1) return;

            this.visualizeStep(stepsTaken[i]);

            i++;

            this.setAnimFrameId(
                window.requestAnimationFrame(step)
            );
        }

        this.setAnimFrameId(
            window.requestAnimationFrame(step)
        );
    }

    getColor = (maxLength, curLine) => {
        let percent = 280 / maxLength,
            hue = percent * curLine;
        return `hsl(${hue}, 100%, 50%)`;
    }

    visualizeStep = (step) => {
        this.clearCanvas();
        this.displayArray(step);
    }

    stopAnimFrame = () => window.cancelAnimationFrame(this.animFrameId);

    setAnimFrameId = (id) => this.animFrameId = id;
}

const controller = new Controller(50);
controller.displayArray();