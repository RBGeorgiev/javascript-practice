import BubbleSort from './algorithms/bubble-sort.js';
import MergeSort from './algorithms/merge-sort.js';
import InsertionSort from './algorithms/insertion-sort.js';
import Quicksort from './algorithms/quicksort.js';

export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
export const arrayLengthInput = document.getElementById("arrayLengthInput");
export const arrayLengthSpan = document.getElementById("arrayLengthSpan");
export const shuffleBtn = document.getElementById("shuffleBtn");
export const sortBtn = document.getElementById("sortBtn");
export const sortSelect = document.getElementById("sortSelect");
export const displayStyleSelect = document.getElementById("displayStyleSelect");

export const SORT_TYPES = {
    "bubbleSort": BubbleSort,
    "mergeSort": MergeSort,
    "insertionSort": InsertionSort,
    "quicksort": Quicksort
}