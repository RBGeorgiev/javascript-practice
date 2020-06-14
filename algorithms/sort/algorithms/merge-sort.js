export default class MergeSort {
    constructor() {
        this.stepsTaken = [];
        this.arr = [];
    }

    addToStepsTaken = (arr) => this.stepsTaken.push([...arr]);

    mergeSort(arr, prevMid, prevStart = 0) {
        // if array length is 1 or 0
        if (arr.length < 2) return arr;

        let middleIdx = Math.floor(arr.length / 2);

        let leftArr = arr.slice(0, middleIdx);
        let rightArr = arr.slice(middleIdx);

        let mergedLeft = this.mergeSort(leftArr, middleIdx);
        this.arr.splice(prevStart + 0, mergedLeft.length, ...mergedLeft);
        this.addToStepsTaken(this.arr);
        let mergedRight = this.mergeSort(rightArr, middleIdx, middleIdx);
        this.arr.splice(middleIdx, mergedRight.length, ...mergedRight);
        this.addToStepsTaken(this.arr);

        return this.merge(mergedLeft, mergedRight);
    }

    merge(left, right) {
        let ans = [];

        while (left.length && right.length) {
            (left[0] < right[0]) ? ans.push(left.shift()) : ans.push(right.shift());
        }

        return ans.concat(left, right);
    }

    getStepsTaken = () => this.stepsTaken;

    run = arr => {
        this.arr = arr;
        this.mergeSort(arr);
    }
}