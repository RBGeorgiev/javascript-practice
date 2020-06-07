// insertion sort works faster for small arrays n < 10
function insertionSort(arr) {
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
            }
        }
    }
    return arr;
}

export default insertionSort;