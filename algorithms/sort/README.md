# Sorting algorithms

Insertion sort was used by Chrome's V8 for Array.prototype.sort and TypedArray.prototype.sort as a fall-back for shorter arrays (length < 10). For longer arrays Quicksort was used.

Since Chrome 70 a variation of Timsort replaced Quicksort and Insertion sort.