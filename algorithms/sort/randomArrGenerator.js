function randomArrGenerator(length, min, max, float, neg) {
    let arr = [];
    for (let i = 0; i < length; i++) {
        if (float) {
            if (Math.round(Math.random()) === 1) {
                num = +(Math.random() * (max - min) + min).toFixed(2); // float numbers
            } else {
                num = Math.floor(Math.random() * (max - min + 1) + min);
            }
        } else {
            num = Math.floor(Math.random() * (max - min + 1) + min); // whole numbers
        }
        if (neg) {
            num *= Math.round(Math.random()) * 2 - 1 // turn ~50% numbers negative
        }
        arr.push(num)
    }
    return arr;
}

let test = randomArrGenerator(100, 0, 2000, true, true);