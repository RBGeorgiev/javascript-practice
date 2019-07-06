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