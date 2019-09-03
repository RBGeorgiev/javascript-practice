let test = [-188.95, -34.47, -89, -172.54, -163.07, -52.77, -144, 98.27, 180, 83.16, 58, 140.48, 161.3, -75.53, -172, 109.19, -158, 161, -82.91, 76];


function mergeSort(arr) {
    // if array length is 1 or 0
    if (arr.length < 2) return arr;

    let middleIdx = Math.floor(arr.length / 2);

    let leftArr = arr.slice(0, middleIdx);
    let rightArr = arr.slice(middleIdx);

    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(left, right) {
    ans = [];

    while (left.length && right.length) {
        (left[0] < right[0]) ? ans.push(left.shift()) : ans.push(right.shift());
    }
    return ans.concat(left, right);
}

mergeSort(test);