let movesArr = [];

const displayMoves = (arr) => {
    answer.innerHTML = "";
    arr.forEach(move => {
        let moveDiv = document.createElement("div");
        moveDiv.innerHTML = `Move ${move.target} from ${move.from} to ${move.to}`;
        answer.appendChild(moveDiv);
    });
}

const move = (target, from, to) => {
    if (target < 1) return;
    let obj = {
        target,
        from,
        to
    };
    movesArr.push(obj);
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

    SixPegs = (num, start, mid1, mid2, mid3, mid4, end) => {
        if (num < 1) return;
        this.SixPegs(num - 4, start, mid1, mid2, mid3, end, mid4)
        move(num - 3, start, mid3);
        move(num - 2, start, mid2);
        move(num - 1, start, mid1);
        move(num, start, end);
        move(num - 1, mid1, end);
        move(num - 2, mid2, end);
        move(num - 3, mid3, end);
        this.SixPegs(num - 4, mid4, start, mid1, mid2, mid3, end);
    }

    SevenPegs = (num, start, mid1, mid2, mid3, mid4, mid5, end) => {
        if (num < 1) return;
        this.SevenPegs(num - 5, start, mid1, mid2, mid3, mid4, end, mid5)
        move(num - 4, start, mid4);
        move(num - 3, start, mid3);
        move(num - 2, start, mid2);
        move(num - 1, start, mid1);
        move(num, start, end);
        move(num - 1, mid1, end);
        move(num - 2, mid2, end);
        move(num - 3, mid3, end);
        move(num - 4, mid4, end);
        this.SevenPegs(num - 5, mid5, start, mid1, mid2, mid3, mid4, end);
    }

    EightPegs = (num, start, mid1, mid2, mid3, mid4, mid5, mid6, end) => {
        if (num < 1) return;
        this.EightPegs(num - 6, start, mid1, mid2, mid3, mid4, mid5, end, mid6)
        move(num - 5, start, mid5);
        move(num - 4, start, mid4);
        move(num - 3, start, mid3);
        move(num - 2, start, mid2);
        move(num - 1, start, mid1);
        move(num, start, end);
        move(num - 1, mid1, end);
        move(num - 2, mid2, end);
        move(num - 3, mid3, end);
        move(num - 4, mid4, end);
        move(num - 5, mid5, end);
        this.EightPegs(num - 6, mid6, start, mid1, mid2, mid3, mid4, mid5, end);
    }

    NinePegs = (num, start, mid1, mid2, mid3, mid4, mid5, mid6, mid7, end) => {
        if (num < 1) return;
        this.NinePegs(num - 7, start, mid1, mid2, mid3, mid4, mid5, mid6, end, mid7)
        move(num - 6, start, mid6);
        move(num - 5, start, mid5);
        move(num - 4, start, mid4);
        move(num - 3, start, mid3);
        move(num - 2, start, mid2);
        move(num - 1, start, mid1);
        move(num, start, end);
        move(num - 1, mid1, end);
        move(num - 2, mid2, end);
        move(num - 3, mid3, end);
        move(num - 4, mid4, end);
        move(num - 5, mid5, end);
        move(num - 6, mid6, end);
        this.NinePegs(num - 7, mid7, start, mid1, mid2, mid3, mid4, mid5, mid6, end);
    }

    TenPegs = (num, start, mid1, mid2, mid3, mid4, mid5, mid6, mid7, mid8, end) => {
        if (num < 1) return;
        this.TenPegs(num - 8, start, mid1, mid2, mid3, mid4, mid5, mid6, mid7, end, mid8)
        move(num - 7, start, mid7);
        move(num - 6, start, mid6);
        move(num - 5, start, mid5);
        move(num - 4, start, mid4);
        move(num - 3, start, mid3);
        move(num - 2, start, mid2);
        move(num - 1, start, mid1);
        move(num, start, end);
        move(num - 1, mid1, end);
        move(num - 2, mid2, end);
        move(num - 3, mid3, end);
        move(num - 4, mid4, end);
        move(num - 5, mid5, end);
        move(num - 6, mid6, end);
        move(num - 7, mid7, end);
        this.TenPegs(num - 8, mid8, start, mid1, mid2, mid3, mid4, mid5, mid6, mid7, end);
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

const getDiskNumber = () => +diskNumber.value;
const getPegNumber = () => +pegNumber.value;
const getPegsId = (numPegs) => {
    let pegs = [];
    for (let i = 0; i < numPegs; i++) {
        pegs.push(String.fromCharCode(65 + i));
    }
    return pegs;
}

const solveHanoi = () => {
    let disks = getDiskNumber();
    let numPegs = getPegNumber();
    let pegs = getPegsId(numPegs);

    switch (numPegs) {
        case 3:
            hanoi.ThreePegs(disks, ...pegs);
            break;
        case 4:
            hanoi.FourPegs(disks, ...pegs);
            break;
        case 5:
            hanoi.FivePegs(disks, ...pegs);
            break;
        case 6:
            hanoi.SixPegs(disks, ...pegs);
            break;
        case 7:
            hanoi.SevenPegs(disks, ...pegs);
            break;
        case 8:
            hanoi.EightPegs(disks, ...pegs);
            break;
        case 9:
            hanoi.NinePegs(disks, ...pegs);
            break;
        case 10:
            hanoi.TenPegs(disks, ...pegs);
            break;
        default:
            throw "Error determining number of pegs";
    }

    displayMoves(movesArr);

    drawHanoi();

    movesArr = [];
}

diskNumber.onchange = (e) => clampNumber(e);
calculateHanoi.onclick = () => solveHanoi();




let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

function getPegsPosition() {
    let pegsPos = [];

    let pegNumber = getPegNumber();
    let pegsId = getPegsId(pegNumber);

    let pegSpacing = canvas.width / (pegNumber + 1);
    let lastPegPos = pegSpacing * (pegNumber - 1);
    let margin = (canvas.width - lastPegPos) / 2;

    for (let i = 0; i < pegNumber; i++) {
        let x = pegSpacing * i;
        let pos = {
            id: pegsId[i],
            x1: margin + x,
            y1: canvas.height,
            x2: margin + x,
            y2: canvas.height * .3
        }

        pegsPos.push(pos)
    }

    return pegsPos;
}

function drawPegs(pegsPos) {
    ctx.lineWidth = 10;
    for (let i = 0; i < pegsPos.length; i++) {
        ctx.beginPath();
        ctx.moveTo(pegsPos[i].x1, pegsPos[i].y1);
        ctx.lineTo(pegsPos[i].x2, pegsPos[i].y2);
        ctx.stroke();
    }
}

function drawHanoi() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let pegsPos = getPegsPosition();
    drawPegs(pegsPos);
    drawDisks(pegsPos);
}

function drawDisks(pegsPos) {
    let disksNum = getDiskNumber();
    let disks = [];

    for (let i = 1; i <= disksNum; i++) {
        disks.push(i);
    }

    for (let i = 0; i < disks.length; i++) {
        let height = 50;
        let towerHeight = pegsPos[0].y1 - height * disksNum;
        let biggest = 50;
        let smallest = 10;
        let range = biggest - smallest;
        let change = range / disksNum;
        let fontSize = smallest + (change * (i + 1));
        ctx.font = `${fontSize}px Arial`;
        ctx.fillText(`Disk ${disks[i]}`, pegsPos[0].x1, towerHeight + height * (i + 1));
    }
}

drawHanoi();