const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomFloat = (min, max) => +(Math.random() * (max - min) + min).toFixed(2);
const turnNegative = (num) => num *= Math.round(Math.random()) * 2 - 1;

function randomArrGenerator(length, min = 0, max = 100, float = false, neg = false) {
    let arr = [];
    for (let i = 0; i < length; i++) {
        if (float) {
            // Make ~50% of numbers float
            if (Math.round(Math.random()) === 1) {
                num = randomFloat(min, max); // float numbers
            } else {
                num = randomInt(min, max);
            }
        } else {
            num = randomInt(min, max); // whole numbers
        }
        if (neg) {
            num = turnNegative(num) // turn ~50% numbers negative
        }
        arr.push(num);
    }
    return arr;
}

let test = randomArrGenerator(100, 0, 2000, true, true);