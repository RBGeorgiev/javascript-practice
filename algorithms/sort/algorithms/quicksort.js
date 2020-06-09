export default class Quicksort {
    // function takes in array to be sorted, as well as the first and last index of the part of the array that will be partitioned
    partition(arr, first, last) {
        let pivot = arr[last], // last element is always used as a pivot
            temp,
            c = first - 1; // c is the pos of the current element that is waiting to be swapped if we come across a number larger than the pivot

        // loop through the part of the array we want partitioned
        for (let i = first; i <= last; i++) {
            // if we find a number smaller than the pivot swap it's index with c (moving smaller numbers to the left)
            if (arr[i] <= pivot) {
                c++;
                temp = arr[c];
                arr[c] = arr[i];
                arr[i] = temp;
            }
        }
        // after the loop, the pivot is in it's final position in the array and c is the index, or location, of the pivot
        return c;
    }

    quicksort(arr, first = 0, last = arr.length - 1) {
        let pi;

        // if the partition is small enough so that the first and last index are the same number, then stop the recursion
        if (first < last) {
            // pi is partitioning index, or the index of the pivot the array was partitioned around
            pi = this.partition(arr, first, last);

            this.quicksort(arr, first, pi - 1); // before pi
            this.quicksort(arr, pi + 1, last); // after pi
        }
        return arr;
    }

    run = arr => this.quicksort(arr);
}