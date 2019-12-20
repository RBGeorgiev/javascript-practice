const displayMove = (str) => {
    let move = document.createElement("div");
    move.innerHTML = str;
    answer.appendChild(move);
}

const move = (num, start, end) => {
    if (num < 1) return;
    let str = `Move ${num} from ${start} to ${end}`;
    displayMove(str);
}

class Hanoi {
    ThreePegs = (number, start, middle, end) => {
        if (number < 1) return;
        this.ThreePegs(number - 1, start, end, middle);
        move(number, start, end);
        this.ThreePegs(number - 1, middle, start, end);
    }

    FourPegs = (num, start, mid1, mid2, end) => {
        if (num < 1) return;
        this.FourPegs(num - 2, start, mid1, end, mid2);
        move(num - 1, start, mid1);
        move(num, start, end);
        move(num - 1, mid1, end);
        this.FourPegs(num - 2, mid2, start, mid1, end);
    }

    FivePegs = (num, start, mid1, mid2, mid3, end) => {
        if (num < 1) return;
        this.FivePegs(num - 3, start, mid1, mid2, end, mid3)
        move(num - 2, start, mid2);
        move(num - 1, start, mid1);
        move(num, start, end);
        move(num - 1, mid1, end);
        move(num - 2, mid2, end);
        this.FivePegs(num - 3, mid3, start, mid1, mid2, end);
    }
}

const hanoi = new Hanoi;

const clampNumber = (e) => {
    let val = +e.target.value;
    let min = +e.target.min;
    let max = +e.target.max;

    if (val < min) e.target.value = min;
    if (val > max) e.target.value = max;
}

const getDiskNumber = () => diskNumber.value;
const getPegNumber = () => pegNumber.value;
const getPegs = (numPegs) => {
    let pegs = [];
    for (let i = 0; i < numPegs; i++) {
        pegs.push(String.fromCharCode(65 + i));
    }
    return pegs;
}

const solveHanoi = () => {
    answer.innerHTML = "";
    let disks = getDiskNumber();
    let numPegs = getPegNumber();
    let pegs = getPegs(numPegs);

    switch (numPegs) {
        case "4":
            hanoi.FourPegs(disks, ...pegs);
            break;
        case "5":
            hanoi.FivePegs(disks, ...pegs);
            break;
        default:
            hanoi.ThreePegs(disks, ...pegs);
    }
}

diskNumber.onchange = (e) => clampNumber(e);
calculateHanoi.onclick = () => solveHanoi();