export default class MergeSort {
    constructor() {
        this.stepsTaken = [];
        this.arr = [];
    }

    addToStepsTaken = (arr) => this.stepsTaken.push([...arr]);

    mergeSort(arr, prevStart = 0) {
        // if array length is 1 or 0
        if (arr.length < 2) return arr;

        let middleIdx = Math.floor(arr.length / 2);

        let leftArr = arr.slice(0, middleIdx);
        let rightArr = arr.slice(middleIdx);

        let mergedLeft = this.mergeSort(leftArr, prevStart);
        let mergedRight = this.mergeSort(rightArr, middleIdx);

        return this.merge(mergedLeft, mergedRight, prevStart, middleIdx);
    }

    merge(left, right, prevStart) {
        let ans = [];

        while (left.length && right.length) {
            (left[0] < right[0]) ? ans.push(left.shift()) : ans.push(right.shift());
            this.arr.splice(prevStart, ans.length, ...ans);
            this.addToStepsTaken(this.arr);
        }

        ans = ans.concat(left, right);

        this.arr.splice(prevStart, ans.length, ...ans);
        this.addToStepsTaken(this.arr);

        return ans;
    }

    getStepsTaken = () => this.stepsTaken;

    run = arr => {
        this.arr = arr;
        this.mergeSort(arr);
    }
}


// this.arr.splice(prevMidIdx, mergedLeft.length, ...mergedLeft);
// this.addToStepsTaken(this.arr);

// this.arr.splice(curMidIdx, mergedRight.length, ...mergedRight);
// this.addToStepsTaken(this.arr);