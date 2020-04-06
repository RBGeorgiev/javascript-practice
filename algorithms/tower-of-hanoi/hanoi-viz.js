import Hanoi from './hanoi.js';

export default class HanoiVisualization {
    constructor(options) {
        this.hanoi = new Hanoi;
        this.options = options;
        this.ctx = this.options.ctx;
        this.init();
        this.timeout = 0;
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

    setTotalMoves = (val) => this.totalMoves = val;

    getPegsIds = () => {
        let pegsIds = [];

        for (let i = 0; i < this.pegsArr.length; i++) {
            if (i === this.options.startingPeg || i === this.options.endingPeg) continue;
            pegsIds.push(this.pegsArr[i].id);
        }

        pegsIds.unshift(this.options.startingPeg);
        pegsIds.push(this.options.endingPeg);

        return pegsIds;
    }

    getHanoiSolution = () => {
        let diskAmount = this.options.diskAmount;
        let pegs = this.getPegsIds();

        switch (this.options.pegsAmount) {
            case 3:
                this.hanoi.ThreePegs(diskAmount, ...pegs);
                break;
            case 4:
                this.hanoi.FourPegs(diskAmount, ...pegs);
                break;
            case 5:
                this.hanoi.FivePegs(diskAmount, ...pegs);
                break;
            case 6:
                this.hanoi.SixPegs(diskAmount, ...pegs);
                break;
            case 7:
                this.hanoi.SevenPegs(diskAmount, ...pegs);
                break;
            case 8:
                this.hanoi.EightPegs(diskAmount, ...pegs);
                break;
            case 9:
                this.hanoi.NinePegs(diskAmount, ...pegs);
                break;
            case 10:
                this.hanoi.TenPegs(diskAmount, ...pegs);
                break;
            default:
                alert("Error determining number of pegs");
                throw "Error determining number of pegs";
        }

        this.displayMovesInHtml(this.hanoi.movesArr);

        this.fillQueue(this.hanoi.movesArr);

        this.setTotalMoves(this.queuedSteps[0].totalMoves);

        this.hanoi.init();
    }

    startAnimating = () => this.setAnimating(true);

    displayMovesInHtml = (movesArr) => {
        answer.innerHTML = "";
        movesArr.forEach((move, idx) => {
            let moveNumber = idx + 1;
            let moveDiv = document.createElement("div");
            moveDiv.innerHTML = `${moveNumber}) Move disk ${move.target} from ${this.options.getPegChar(move.from)} to ${this.options.getPegChar(move.to)}`;
            answer.appendChild(moveDiv);
        });
    }

    drawPegs = (pegsPos) => {
        let ctx = this.ctx;
        ctx.lineWidth = 10;
        for (let i = 0; i < pegsPos.length; i++) {
            ctx.beginPath();
            ctx.moveTo(pegsPos[i].x1, pegsPos[i].y1);
            ctx.lineTo(pegsPos[i].x2, pegsPos[i].y2);
            ctx.stroke();

            ctx.font = `20px Arial`;
            ctx.fillStyle = "black";
            let text = this.options.getPegChar(pegsPos[i].id);
            ctx.fillText(text, pegsPos[i].x2, pegsPos[i].y2 - 5);
        }
    }

    getDiskColor = (i) => {
        let n = this.options.diskAmount;
        let red = (this.options.redGradient) ? this.calculateDiskColor(this.options.redVal, n, i) : this.options.redVal;
        let green = (this.options.greenGradient) ? this.calculateDiskColor(this.options.greenVal, n, i) : this.options.greenVal;
        let blue = (this.options.blueGradient) ? this.calculateDiskColor(this.options.blueVal, n, i) : this.options.blueVal;
        return `rgb(${red}, ${green}, ${blue})`;
    }

    calculateDiskColor(val, n, i) {
        return val - (val / n * (i - 1));
    }

    drawDisk = (target, x, y, width, height) => {
        let ctx = this.ctx;
        ctx.lineWidth = 1;
        ctx.fillStyle = this.getDiskColor(target);

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fill();
        ctx.stroke();

        ctx.font = `${height}px Arial`;
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(target, x + width / 2, y + height * 0.875);
    }

    initPegs = () => {
        let pegsArr = [];
        let pegsAmount = this.options.pegsAmount;

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

    initDisks = (pegsArr) => {
        let diskAmount = this.options.diskAmount;
        let startingPeg = this.options.startingPeg;

        let height = 40;
        let floor = pegsArr[startingPeg].y1 - height;

        let pegSpacing = canvas.width / (pegsArr.length + 1);
        let biggestDisk = pegSpacing / 1.5;
        let smallestDisk = 10;

        let diskSizeRange = biggestDisk - smallestDisk;
        let averageSizeChange = diskSizeRange / diskAmount;


        for (let i = diskAmount; i > 0; i--) {
            let width = smallestDisk + (averageSizeChange * (i + 1));

            let x = pegsArr[startingPeg].x1 - width / 2;
            let y = floor - height * pegsArr[startingPeg].disks.length;

            let diskObj = {
                id: i,
                x,
                y,
                width,
                height,
                draw: true
            }

            pegsArr[startingPeg].disks.push(diskObj);
        }
    }

    drawAllDisks = (pegsArr) => {
        for (let i = 0; i < pegsArr.length; i++) {
            for (let j = 0; j < pegsArr[i].disks.length; j++) {
                let disk = pegsArr[i].disks[j];
                if (disk.draw) {
                    this.drawDisk(disk.id, disk.x, disk.y, disk.width, disk.height);
                }
            }
        }
    }

    setPegsAndDisksArr = () => {
        this.pegsArr = this.initPegs();
        this.initDisks(this.pegsArr);
    }

    drawMoveDesc = (str, size = 30) => {
        let ctx = this.ctx;
        ctx.font = `${size}px Arial`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#46A049";
        ctx.fillText(str, canvas.width / 2, 10 + size);
    }

    drawMoveCounter(cur, total, size = 20) {
        let ctx = this.ctx;
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
                    moveDesc: `Move disk ${target} from ${this.options.getPegChar(from)} to ${this.options.getPegChar(to)}`,
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

        this.drawDisk(diskCopy.id, diskCopy.x, diskCopy.y, diskCopy.width, diskCopy.height);
    }

    executeQueuedStep = () => {
        if (this.queuedSteps.length > 0) {
            let moveData = this.queuedSteps.shift();

            let disk = moveData.oldPeg.disks.pop();

            if (this.options.playFullAnim) {
                this.fillAnimationQueue(disk, moveData.newPeg);
            }

            this.moveDisk(disk, moveData.newPeg);
            this.moveDesc = moveData.moveDesc;
            this.curMove = moveData.curMove;

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

            this.queuedSteps.unshift(moveData);
        }
    }

    animateSolution = (deltaTime, animSpeed) => {
        this.timeout += deltaTime;

        if (this.timeout > animSpeed) {
            this.executeQueuedStep();
            this.timeout = 0;
        }
    }

    draw = (deltaTime, animSpeed) => {
        this.drawPegs(this.pegsArr);

        if (this.animating && !this.options.paused) {
            this.animateSolution(deltaTime, animSpeed);
        }

        if (!!this.animationQueue.length) {
            this.executeAnimationQueue(deltaTime, animSpeed);
        }

        this.drawMoveDesc(this.moveDesc);
        this.drawMoveCounter(this.curMove, this.totalMoves);

        this.drawAllDisks(this.pegsArr);
    }
}
