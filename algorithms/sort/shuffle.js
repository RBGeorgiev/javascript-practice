const shuffle = (arr) => {
    let k = arr.length, r, t;

    while (k > 0) {
        r = Math.floor(Math.random() * k--);
        t = arr[k];
        arr[k] = arr[r];
        arr[r] = t;
    }

    return arr;
}

export default shuffle;