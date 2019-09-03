let test = [-164, -119, -193, -132.94, 49.69, -147.15, 146, -47, 152, 102, -14, 70.82, -94, -40, 145, 135.52, -176, -40, -27, -1];

function bubbleSort(arr) {
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    return arr;
}

bubbleSort(test);