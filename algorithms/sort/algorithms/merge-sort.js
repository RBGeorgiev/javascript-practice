export default class MergeSort {
    constructor() {
        this.stepsTaken = [];
        this.arr = [];
    }

    addToStepsTaken = (idx, delCount, arrPartition) => {
        this.arr.splice(idx, delCount, ...arrPartition);
        this.stepsTaken.push([...this.arr]);
    }

    mergeSort(arr, prevStartIdx = 0) {
        // if array length is 1 or 0
        if (arr.length < 2) return arr;

        let middleIdx = Math.floor(arr.length / 2);

        let leftArr = arr.slice(0, middleIdx);
        let rightArr = arr.slice(middleIdx);

        let mergedLeft = this.mergeSort(leftArr, prevStartIdx);
        let mergedRight = this.mergeSort(rightArr, prevStartIdx + middleIdx);

        return this.merge(mergedLeft, mergedRight, prevStartIdx);
    }

    merge(left, right, prevStartIdx) {
        let ans = [];

        while (left.length && right.length) {
            (left[0] < right[0]) ? ans.push(left.shift()) : ans.push(right.shift());

            this.addToStepsTaken(prevStartIdx, ans.length, ans);
        }

        ans = ans.concat(left, right);

        this.addToStepsTaken(prevStartIdx, ans.length, ans);

        return ans;
    }

    getStepsTaken = () => this.stepsTaken;

    run = arr => {
        this.arr = arr;
        return this.mergeSort(arr);
    }
}