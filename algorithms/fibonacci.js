// Fibonacci Sequence

function fibonacci(num) {
    let ans = [], cur = 0, next = 1, temp;

    while (num >= 0) {
        ans.push(cur);
        temp = next;
        next = cur + next;
        cur = temp;
        num--;
    }

    return ans;
}


function fibonacci_2(n) {
    let arr = [0, 1];
    for (let i = 1; i < n; i++) {
        arr.push(arr[i - 1] + arr[i]);
    }
    return arr;
}