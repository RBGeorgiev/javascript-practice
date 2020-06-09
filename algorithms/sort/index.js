import BubbleSort from './algorithms/bubble-sort.js';
import MergeSort from './algorithms/merge-sort.js';
import InsertionSort from './algorithms/insertion-sort.js';
import Quicksort from './algorithms/quicksort.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let shuffleBtn = document.getElementById("shuffleBtn");
let sortBtn = document.getElementById("sortBtn");
let sortSelect = document.getElementById("sortSelect");

const SORT_TYPES = {
    "bubbleSort": BubbleSort,
    "mergeSort": MergeSort,
    "insertionSort": InsertionSort,
    "quicksort": Quicksort
}

class Controller {
    constructor(length) {
        this.arr = this.init(length);
        this.initEventListeners();
    }

    init = (length) => this.shuffleArray(
        this.initArray(length)
    )

    initEventListeners = () => {
        shuffleBtn.onclick = () => {
            this.shuffleArray(this.arr);
            this.clearCanvas();
            this.displayArray();
        }

        sortBtn.onclick = () => {
            this.arr = this.sortArray(this.arr);
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

    sortArray = (arr) => {
        let sort = new SORT_TYPES[sortSelect.value];
        return sort.run(arr);
    }

    // display methods

    clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

    displayArray = (arr = this.arr, maxLineLength = 250, lineStart = 100) => {
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

}

const controller = new Controller(50);
controller.displayArray();