import HanoiVisualization from './hanoi-viz.js';

export default class Options {
    constructor(ctx) {
        this.initVariables();
        this.initEventListeners();

        this.ctx = ctx;
        this.hanoiVis = new HanoiVisualization(this);
        this.lastTime = 0;
        this.deltaTime;

        this.startAnimationFrame();
    }

    initVariables = () => {
        this.diskAmount = +diskAmountInput.value;
        this.pegsAmount = +pegsAmountInput.value;

        this.populateTargetPegsInputs();
        this.startingPeg = +startingPegInput.value;
        this.endingPeg = +endingPegInput.value;

        this.animSpeed = +animationSpeed.value;
        this.playFullAnim = fullAnimationCheckbox.checked;
        this.paused = false;

        this.redVal = +colorSelectorRed.value;
        this.greenVal = +colorSelectorGreen.value;
        this.blueVal = +colorSelectorBlue.value;
        this.redGradient = +redGradientCheckbox.checked;
        this.greenGradient = +greenGradientCheckbox.checked;
        this.blueGradient = +blueGradientCheckbox.checked;
    }

    initEventListeners = () => {
        //#region - Disk and peg options listeners
        diskAmountInput.oninput = (e) => {
            let num = this.clampNumber(e.target);
            this.diskAmount = diskAmountInput.value = num;
            this.hanoiVis.init();
        }

        pegsAmountInput.onchange = (e) => {
            let num = this.clampNumber(e.target);
            this.pegsAmount = pegsAmountInput.value = num;
            this.populateTargetPegsInputs();
            this.startingPeg = +startingPegInput.value;
            this.endingPeg = +endingPegInput.value;
            this.hanoiVis.init();
        }

        startingPegInput.onchange = (e) => {
            this.startingPeg = +e.target.value;
            this.populateTargetPegsInputs(this.startingPeg, this.endingPeg);
            this.hanoiVis.init();
        }

        endingPegInput.onchange = (e) => {
            this.endingPeg = +e.target.value;
            this.populateTargetPegsInputs(this.startingPeg, this.endingPeg);
            this.hanoiVis.init();
        }
        //#endregion - Disk and peg options listeners

        //#region - Animation options listeners
        fullAnimationCheckbox.onchange = () => {
            this.playFullAnim = fullAnimationCheckbox.checked;

            (fullAnimationCheckbox.checked)
                ?
                animationSpeed.min = 500
                :
                animationSpeed.min = 1;

            this.setAnimSpeed(animationSpeed);
        }

        animateHanoiBtn.onclick = () => {
            this.hanoiVis.init();
            this.hanoiVis.startAnimating();
            pauseCheckbox.disabled = false;
        }

        animationSpeed.onchange = (e) => this.setAnimSpeed(e.target);
        //#endregion - Animation options listeners

        //#region - Pause and step options listeners
        pauseCheckbox.onchange = () => {
            let bool = pauseCheckbox.checked;
            this.paused = bool;
            nextStepBtn.disabled = !bool;
            prevStepBtn.disabled = !bool;
            fullAnimationCheckbox.disabled = bool;
            fullAnimationCheckbox.checked = !bool;
            fullAnimationCheckbox.onchange();
        }

        nextStepBtn.onclick = () => this.hanoiVis.executeQueuedStep();
        prevStepBtn.onclick = () => this.hanoiVis.getPrevStep();
        //#endregion - Pause and step options listeners

        //#region - Color options listeners
        colorSelectorRed.oninput = (e) => this.redVal = colorSelectorRed.value = this.clampNumber(e.target);
        colorSelectorGreen.oninput = (e) => this.greenVal = colorSelectorGreen.value = this.clampNumber(e.target);
        colorSelectorBlue.oninput = (e) => this.blueVal = colorSelectorBlue.value = this.clampNumber(e.target);

        redGradientCheckbox.onchange = (e) => this.redGradient = e.target.checked;
        greenGradientCheckbox.onchange = (e) => this.greenGradient = e.target.checked;
        blueGradientCheckbox.onchange = (e) => this.blueGradient = e.target.checked;
        //#endregion - Color options listeners
    }

    populateTargetPegsInputs = (start = 0, end = this.pegsAmount - 1) => {
        startingPegInput.innerHTML = '';
        endingPegInput.innerHTML = '';

        for (let i = 0; i < this.pegsAmount; i++) {
            let opt = document.createElement("option");
            opt.text = this.getPegChar(i);
            opt.value = i;

            if (i === start) opt.selected = true;
            if (i === end) opt.disabled = true;

            startingPegInput.add(opt, null);
        }

        for (let i = 0; i < this.pegsAmount; i++) {
            let opt = document.createElement("option");
            opt.text = this.getPegChar(i);
            opt.value = i;

            if (i === start) opt.disabled = true;
            if (i === end) opt.selected = true;

            endingPegInput.add(opt, null);
        }
    }

    getPegChar = n => String.fromCharCode(65 + n);

    setAnimSpeed = (target) => {
        let ms = this.clampNumber(target);
        this.animSpeed = animationSpeed.value = ms;
    }

    clampNumber = (target) => {
        let val = +target.value;
        let min = +target.min;
        let max = +target.max;
        if (val < min) return min;
        if (val > max) return max;
        return val;
    }

    step = (timestamp) => {
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.hanoiVis.draw(this.deltaTime, this.animSpeed);

        window.requestAnimationFrame(this.step);
    }

    startAnimationFrame = () => window.requestAnimationFrame(this.step);
}