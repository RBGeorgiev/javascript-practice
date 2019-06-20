let test = [2, 1, 3, 5, 12, 15, 6, 54, 1, 567, 3, 32, 375, 53, 9, 71, 57, 35, 73, 12, 2, 34];

function partition(arr, first, last) {
    let pivot = arr[last];
    let temp;
    let cur = first - 1;

    for (let i = first; i <= last; i++) {
        if (arr[i] <= pivot) {
            cur++;
            temp = arr[cur];
            arr[cur] = arr[i];
            arr[i] = temp;
        }
    }

    return cur;
}


function quicksort(arr, first, last) {
    let pivot;

    if (first < last) {
        pivot = partition(arr, first, last)

        quicksort(arr, first, pivot - 1)
        quicksort(arr, pivot + 1, last)
    }
    return arr
}

quicksort(test, 0, test.length - 1);