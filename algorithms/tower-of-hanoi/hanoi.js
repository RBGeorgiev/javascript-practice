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

const hanoiThreePegs = (number, start, middle, end) => {
    if (number < 1) return;
    hanoiThreePegs(number - 1, start, end, middle);
    move(number, start, end);
    hanoiThreePegs(number - 1, middle, start, end);
}

function hanoiFourPegs(num, start, mid1, mid2, end) {
    if (num < 1) return;
    hanoiFourPegs(num - 2, start, mid1, end, mid2);
    move(num - 1, start, mid1);
    move(num, start, end);
    move(num - 1, mid1, end);
    hanoiFourPegs(num - 2, mid2, start, mid1, end);
}

function hanoiFivePegs(num, start, mid1, mid2, mid3, end) {
    if (num < 1) return;
    hanoiFivePegs(num - 3, start, mid1, mid2, end, mid3)
    move(num - 2, start, mid2);
    move(num - 1, start, mid1);
    move(num, start, end);
    move(num - 1, mid1, end);
    move(num - 2, mid2, end);
    hanoiFivePegs(num - 3, mid3, start, mid1, mid2, end);
}

const getDiskNumber = () => diskNumber.value;
const getPegNumber = () => pegNumber.value;

calculateHanoi.onclick = () => {
    answer.innerHTML = "";
    let disks = getDiskNumber();
    let numPegs = getPegNumber();
    let pegs = [];

    for (let i = 0; i < numPegs; i++) {
        pegs.push(String.fromCharCode(65 + i));
    }

    switch (numPegs) {
        case "4":
            hanoiFourPegs(disks, ...pegs);
            break;
        case "5":
            hanoiFivePegs(disks, ...pegs);
            break;
        default:
            hanoiThreePegs(disks, ...pegs);
    }
}