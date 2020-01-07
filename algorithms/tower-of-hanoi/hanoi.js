let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

let movesArr = [];

const getPegChar = n => String.fromCharCode(65 + n);

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

class HanoiVisualization {
    constructor() {
        this.init();
    }

    init = () => {
        this.animationQueue = [];

        this.queuedSteps = [];
        this.prevSteps = [];

        this.animating;
        this.setAnimating(false);
        this.pegsArr = [];
        this.setPegsAndDisksArr();

        this.moveDesc = '';
        this.curMove = 0;
        this.totalMoves = 0;

        this.getHanoiSolution();
    }

    setAnimating = (bool) => {
        this.animating = bool;
        animateHanoiBtn.disabled = bool;
    }

    getDiskAmount = () => +diskAmount.value;

    getPegsAmount = () => +pegsAmount.value;

    getPegsIds = () => {
        let pegsIds = [];
        for (let i = 0; i < this.pegsArr.length; i++) {
            pegsIds.push(this.pegsArr[i].id);
        }
        return pegsIds;
    }

    getHanoiSolution = () => {
        let disks = this.getDiskAmount();
        let pegsAmount = this.getPegsAmount();
        let pegs = this.getPegsIds();

        switch (pegsAmount) {
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
                alert("Error determining number of pegs");
                throw "Error determining number of pegs";
        }

        this.displayMovesInHtml(movesArr);

        this.fillQueue(movesArr);

        movesArr = [];
    }

    startAnimating = () => {
        this.setAnimating(true);
    }

    displayMovesInHtml = (arr) => {
        answer.innerHTML = "";
        arr.forEach((move, idx) => {
            let moveNumber = idx + 1;
            let moveDiv = document.createElement("div");
            moveDiv.innerHTML = `${moveNumber}) Move disk ${move.target} from ${getPegChar(move.from)} to ${getPegChar(move.to)}`;
            answer.appendChild(moveDiv);
        });
    }

    drawPegs = (pegsPos) => {
        ctx.lineWidth = 10;
        for (let i = 0; i < pegsPos.length; i++) {
            ctx.beginPath();
            ctx.moveTo(pegsPos[i].x1, pegsPos[i].y1);
            ctx.lineTo(pegsPos[i].x2, pegsPos[i].y2);
            ctx.stroke();

            ctx.font = `20px Arial`;
            ctx.fillStyle = "black";
            let text = getPegChar(pegsPos[i].id);
            ctx.fillText(text, pegsPos[i].x2, pegsPos[i].y2 - 5);
        }
    }

    calculateDiskColor(n, i) {
        return 225 - (150 / n) * i;
    }

    drawDisk = (target, x, y, width, height, color = 'lightgrey') => {
        ctx.lineWidth = 1;
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fill();
        ctx.stroke();

        ctx.font = `${height}px Arial`;
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(target, x + width / 2, y + height * 0.875);
    }

    initPegs = (pegsAmount) => {
        let pegsArr = [];

        let pegSpacing = canvas.width / (pegsAmount + 1);
        let lastPegPos = pegSpacing * (pegsAmount - 1);
        let margin = (canvas.width - lastPegPos) / 2;

        for (let i = 0; i < pegsAmount; i++) {
            let x = pegSpacing * i;
            let pos = {
                id: i,
                x1: margin + x,
                y1: canvas.height,
                x2: margin + x,
                y2: canvas.height * .3,
                disks: []
            }

            pegsArr.push(pos);
        }

        return pegsArr
    }

    initDisks = (diskAmount, pegsArr) => {

        let height = 40;
        let floor = pegsArr[0].y1 - height;

        let pegSpacing = canvas.width / (pegsArr.length + 1);
        let biggestDisk = pegSpacing / 1.5;
        let smallestDisk = 10;

        let diskSizeRange = biggestDisk - smallestDisk;
        let averageSizeChange = diskSizeRange / diskAmount;


        for (let i = diskAmount; i > 0; i--) {

            let id = i
            let width = smallestDisk + (averageSizeChange * (id + 1));

            let x = pegsArr[0].x1 - width / 2;
            let y = floor - height * pegsArr[0].disks.length;

            let color = `rgb(${this.calculateDiskColor(diskAmount, id)}, 10, 25)`;

            let diskObj = {
                id,
                x,
                y,
                width,
                height,
                color,
                draw: true,
                parent: pegsArr[0]
            }

            pegsArr[0].disks.push(diskObj);
        }
    }

    drawAllDisks = (pegsArr) => {
        for (let i = 0; i < pegsArr.length; i++) {
            for (let j = 0; j < pegsArr[i].disks.length; j++) {
                let disk = pegsArr[i].disks[j]
                if (disk.draw) {
                    this.drawDisk(disk.id, disk.x, disk.y, disk.width, disk.height, disk.color);
                }
            }
        }
    }


    setPegsAndDisksArr = () => {
        let pegsAmount = this.getPegsAmount();
        let diskAmount = this.getDiskAmount();

        this.pegsArr = this.initPegs(pegsAmount);
        this.initDisks(diskAmount, this.pegsArr);
    }

    drawMoveDesc = (str, size = 30) => {
        ctx.font = `${size}px Arial`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#46A049";
        ctx.fillText(str, canvas.width / 2, 10 + size);
    }

    drawMoveCounter(cur, total, size = 20) {
        ctx.font = `${size}px Arial`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#46A049";
        ctx.fillText(`${cur} / ${total}`, canvas.width / 2, 45 + size);
    }

    fillQueue = (movesArr) => {
        for (let i = 0; i < movesArr.length; i++) {
            let target = movesArr[i].target;
            let from = movesArr[i].from;
            let to = movesArr[i].to;

            this.queuedSteps.push(
                {
                    oldPeg: this.pegsArr[from],
                    newPeg: this.pegsArr[to],
                    moveDesc: `Move disk ${target} from ${getPegChar(from)} to ${getPegChar(to)}`,
                    curMove: i + 1,
                    totalMoves: movesArr.length
                }
            )
        }
    }

    moveDisk = (disk, endPeg) => {
        endPeg.disks.push(
            disk
        );

        disk.x = endPeg.x1 - disk.width / 2;
        disk.y = endPeg.y1 - disk.height * endPeg.disks.length;
    }

    hideDisk = (disk) => {
        disk.draw = false;
    }

    showDisk = (disk) => {
        disk.draw = true;
    }

    fillAnimationQueue = (disk, endPeg) => {
        this.hideDisk(disk);

        let diskCopy = Object.assign({}, disk);

        let y_Lift = endPeg.y2 - disk.height - 30;
        let x_Final = endPeg.x1 - disk.width / 2;
        let y_Final = endPeg.y1 - disk.height * (endPeg.disks.length + 1);

        const getAnimDirection = (cur, end) => (cur - end < 0) ? '+' : '-';

        const getTotalDistance = (cur, end) => (cur - end < 0) ? end - cur : cur - end;

        const createAnimSegment = (startPos, endPos, axis) => {
            return {
                diskCopy,
                endPos,
                axis,
                animDirection: getAnimDirection(startPos, endPos),
                totalDistance: getTotalDistance(startPos, endPos)
            }
        }

        this.animationQueue.push(
            [
                disk,
                [
                    createAnimSegment(disk.y, y_Lift, 'y'),
                    createAnimSegment(disk.x, x_Final, 'x'),
                    createAnimSegment(y_Lift, y_Final, 'y')
                ]
            ]
        )
    }

    getNewAnimDiskPos = (curPos, endPos, velocity) => {
        if (curPos < endPos && velocity < 0
            ||
            curPos > endPos && velocity > 0) {
            return null;
        } else {
            return curPos + velocity;
        }
    }

    endTargetDiskAnimation = (disk) => {
        this.showDisk(disk);
        this.animationQueue.shift();
    }

    executeAnimationQueue = (deltaTime, animSpeed) => {
        let diskOrig = this.animationQueue[0][0];
        let currentAnimationArr = this.animationQueue[0][1];

        if (!currentAnimationArr.length) {
            return this.endTargetDiskAnimation(diskOrig);
        }

        let curSegment = currentAnimationArr[0];
        let diskCopy = curSegment.diskCopy;
        let endPos = curSegment.endPos;
        let axis = curSegment.axis;
        let animDirection = curSegment.animDirection;
        let totalDistance = curSegment.totalDistance;

        let time = animSpeed / 4;
        let speed = totalDistance / time * deltaTime;
        let velocity = +(animDirection + speed);

        if (totalDistance === 0) {
            currentAnimationArr.shift();
        }

        let pos = this.getNewAnimDiskPos(diskCopy[axis], endPos, velocity);
        if (pos === null) {
            diskCopy[axis] = endPos;
            currentAnimationArr.shift();
        } else {
            diskCopy[axis] = pos;
        }

        this.drawDisk(diskCopy.id, diskCopy.x, diskCopy.y, diskCopy.width, diskCopy.height, diskCopy.color);
    }

    executeQueuedStep = () => {
        if (this.queuedSteps.length > 0) {
            let moveData = this.queuedSteps.shift();

            let disk = moveData.oldPeg.disks.pop();

            if (playFullAnim) {
                this.fillAnimationQueue(disk, moveData.newPeg);
            }

            this.moveDisk(disk, moveData.newPeg);
            this.moveDesc = moveData.moveDesc;
            this.curMove = moveData.curMove;
            this.totalMoves = moveData.totalMoves;

            this.prevSteps.push(moveData);
        } else {
            this.setAnimating(false);
        }
    }

    getPrevStep = () => {
        if (this.prevSteps.length > 0) {
            if (!this.animating)
                this.setAnimating(true);

            let moveData = this.prevSteps.pop();

            let disk = moveData.newPeg.disks.pop();

            this.moveDisk(disk, moveData.oldPeg);
            this.moveDesc = moveData.moveDesc;
            this.curMove = moveData.curMove;
            this.totalMoves = moveData.totalMoves;

            this.queuedSteps.unshift(moveData);
        }
    }

    animateSolution = (deltaTime, animSpeed) => {
        timeout += deltaTime;

        if (timeout > animSpeed) {
            hanoiVis.executeQueuedStep();
            timeout = 0;
        }
    }

    draw = (deltaTime, animSpeed) => {
        this.drawPegs(this.pegsArr);

        if (this.animating && !paused) {
            this.animateSolution(deltaTime, animSpeed);
        }

        if (this.totalMoves !== 0) {
            this.drawMoveDesc(this.moveDesc);
            this.drawMoveCounter(this.curMove, this.totalMoves);
        }

        if (!!this.animationQueue.length) {
            this.executeAnimationQueue(deltaTime, animSpeed);
        }

        this.drawAllDisks(this.pegsArr);
    }
}

const hanoi = new Hanoi;
const hanoiVis = new HanoiVisualization;
let animSpeed = +animationSpeed.value;
let playFullAnim = fullAnimationCheckbox.checked;
let paused = false;

const clampNumber = (target) => {
    let val = +target.value;
    let min = +target.min;
    let max = +target.max;
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

let setAnimSpeed = (target) => {
    let num = clampNumber(target);
    let ms = num;
    animationSpeed.value = animSpeed = ms;;
}

diskAmount.oninput = (e) => {
    let num = clampNumber(e.target);
    diskAmount.value = num;
    hanoiVis.init();
}
pegsAmount.onchange = () => hanoiVis.init();
fullAnimationCheckbox.onchange = () => {
    playFullAnim = fullAnimationCheckbox.checked;

    (fullAnimationCheckbox.checked)
        ?
        animationSpeed.min = 500
        :
        animationSpeed.min = 1;

    setAnimSpeed(animationSpeed);
}
animateHanoiBtn.onclick = () => {
    hanoiVis.init();
    hanoiVis.startAnimating();
}
animationSpeed.onchange = (e) => setAnimSpeed(e.target);

pauseCheckbox.onchange = () => {
    let bool = pauseCheckbox.checked;
    paused = bool;
    nextStepBtn.disabled = !bool;
    prevStepBtn.disabled = !bool;
    fullAnimationCheckbox.checked = !bool;
    fullAnimationCheckbox.onchange();
}
nextStepBtn.onclick = () => hanoiVis.executeQueuedStep();
prevStepBtn.onclick = () => hanoiVis.getPrevStep();


let lastTime = timeout = 0, deltaTime;

function step(timestamp) {
    deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hanoiVis.draw(deltaTime, animSpeed);

    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);