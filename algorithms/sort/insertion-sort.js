let test = [2, 1, 3, 5, 12, 15, 6, 54, 1];

function insertionSort(arr) {
    let cur = prev = 0;
    for (let i = 0; i < arr.length; i++) {
        cur = arr[i];
        for (let j = i - 1; j >= 0; j--) {
            prev = arr[j]
            if (cur < prev) {
                arr[j] = cur;
                arr[j + 1] = prev;
            }
        }
    }
    return arr;
}

insertionSort(test);