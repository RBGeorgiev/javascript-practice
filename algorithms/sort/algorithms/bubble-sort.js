export default class BubbleSort {
    constructor() {
        this.stepsTaken = [];
    }

    bubbleSort = (arr) => {
        let swapped, temp;

        do {
            swapped = false;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > arr[i + 1]) {
                    temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                    this.stepsTaken.push([...arr]);
                }
            }
        } while (swapped);

        return arr;
    }

    getStepsTaken = () => this.stepsTaken;

    run = arr => this.bubbleSort(arr);
}