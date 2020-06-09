export default class MergeSort {
    mergeSort(arr) {
        // if array length is 1 or 0
        if (arr.length < 2) return arr;

        let middleIdx = Math.floor(arr.length / 2);

        let leftArr = arr.slice(0, middleIdx);
        let rightArr = arr.slice(middleIdx);

        return this.merge(this.mergeSort(leftArr), this.mergeSort(rightArr));
    }

    merge(left, right) {
        let ans = [];

        while (left.length && right.length) {
            (left[0] < right[0]) ? ans.push(left.shift()) : ans.push(right.shift());
        }
        return ans.concat(left, right);
    }

    run = arr => this.mergeSort(arr);
}