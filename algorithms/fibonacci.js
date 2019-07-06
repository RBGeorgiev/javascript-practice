// Fibonacci Sequence

// F0	F1	F2	F3	F4	F5	F6	F7	F8   F9   F10  F11  F12  F13  F14  F15  F16  F17   F18   F19   F20
// 0	1	1	2	3	5	8	13	21   34   55   89	144  233  377  610  987  1597  2584  4181  6765


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