// Insertion sort was used by Chrome's V8 for Array.prototype.sort and TypedArray.prototype.sort as a fall-back for shorter arrays (length < 10). For longer arrays Quicksort was used. Since Chrome 70 a variation of Timsort replaced Quicksort and Insertion sort.
// insertion sort works faster for small arrays n < 10

export default class InsertionSort {
    constructor() {
        this.stepsTaken = [];
    }

    addToStepsTaken = (arr) => this.stepsTaken.push([...arr]);

    insertionSort(arr) {
        let cur = 0;
        let prev = 0;
        // loop through array
        for (let i = 0; i < arr.length; i++) {
            cur = arr[i];
            // loop backwards starting from i pos
            for (let j = i - 1; j >= 0; j--) {
                prev = arr[j];
                // slides back smaller values to their proper pos by swapping them with the bigger numbers behind them
                if (cur < prev) {
                    arr[j] = cur;
                    arr[j + 1] = prev;
                    this.addToStepsTaken(arr);
                }
            }
        }
        return arr;
    }

    getStepsTaken = () => this.stepsTaken;

    run = arr => this.insertionSort(arr);
}