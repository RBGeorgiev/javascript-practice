let test = [2, 1, 3, 5, 12.5, 15, 6, 54, 1, 567, -3, 32.2, 375, 53, 32.21, 9, -71, 57, 35, 73, 12, 123, 32, 2, 34];

// function takes in arr to be sorted, and the first and last index of the part that we want partitioned
function partition(arr, first, last) {
    let pivot = arr[last], // last element is always used as a pivot
        temp,
        c = first - 1; // c is the pos of the current element we are waiting to swap if we come across a number larger than the pivot

    // loop through the part of the array we want partitioned
    for (let i = first; i <= last; i++) {
        // if we find index bigger that the pivot swap it with c
        if (arr[i] <= pivot) {
            c++;
            temp = arr[c];
            arr[c] = arr[i];
            arr[i] = temp;
        }
    }
    // after the loop the pivot is in the correct position in the array and c is the index of the pivot in the array
    return c;
}

function quicksort(arr, first, last) {
    let pi;

    // if arr is partitioned enough that the first and last index are the same number then stop the recursion
    if (first < last) {
        // pi is partitioning index or the index of the pivot the array was partitioned around
        pi = partition(arr, first, last);

        quicksort(arr, first, pi - 1); // before pi
        quicksort(arr, pi + 1, last); // after pi
    }
    return arr;
}

quicksort(test, 0, test.length - 1);