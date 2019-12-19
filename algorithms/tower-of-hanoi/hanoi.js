const displayMove = (str) => {
    let move = document.createElement("div");
    move.innerHTML = str;
    answer.appendChild(move);
}

const move = (n, start, end) => {
    let str = `Move ${n} from ${start} to ${end}`;
    displayMove(str)
}

const solveHanoi = (number, start, middle, end) => {
    if (number < 1) return;
    solveHanoi(number - 1, start, end, middle);
    move(number, start, end);
    solveHanoi(number - 1, middle, start, end);
}

const getDiskNumber = () => diskNumber.value;

calculateHanoi.onclick = () => {
    answer.innerHTML = "";
    solveHanoi(getDiskNumber(), "A", "B", "C");
}