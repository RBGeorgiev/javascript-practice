export default class Hanoi {
    constructor() {
        this.init();
    }

    init() {
        this.movesArr = [];
    }

    move = (target, from, to) => {
        if (target < 1) return;
        let obj = {
            target,
            from,
            to
        };
        this.movesArr.push(obj);
    }

    ThreePegs = (number, start, middle, end) => {
        if (number < 1) return;
        this.ThreePegs(number - 1, start, end, middle);
        this.move(number, start, end);
        this.ThreePegs(number - 1, middle, start, end);
    }

    FourPegs = (num, start, mid1, mid2, end) => {
        if (num < 1) return;
        this.FourPegs(num - 2, start, mid1, end, mid2);
        this.move(num - 1, start, mid1);
        this.move(num, start, end);
        this.move(num - 1, mid1, end);
        this.FourPegs(num - 2, mid2, start, mid1, end);
    }

    FivePegs = (num, start, mid1, mid2, mid3, end) => {
        if (num < 1) return;
        this.FivePegs(num - 3, start, mid1, mid2, end, mid3)
        this.move(num - 2, start, mid2);
        this.move(num - 1, start, mid1);
        this.move(num, start, end);
        this.move(num - 1, mid1, end);
        this.move(num - 2, mid2, end);
        this.FivePegs(num - 3, mid3, start, mid1, mid2, end);
    }

    SixPegs = (num, start, mid1, mid2, mid3, mid4, end) => {
        if (num < 1) return;
        this.SixPegs(num - 4, start, mid1, mid2, mid3, end, mid4)
        this.move(num - 3, start, mid3);
        this.move(num - 2, start, mid2);
        this.move(num - 1, start, mid1);
        this.move(num, start, end);
        this.move(num - 1, mid1, end);
        this.move(num - 2, mid2, end);
        this.move(num - 3, mid3, end);
        this.SixPegs(num - 4, mid4, start, mid1, mid2, mid3, end);
    }

    SevenPegs = (num, start, mid1, mid2, mid3, mid4, mid5, end) => {
        if (num < 1) return;
        this.SevenPegs(num - 5, start, mid1, mid2, mid3, mid4, end, mid5)
        this.move(num - 4, start, mid4);
        this.move(num - 3, start, mid3);
        this.move(num - 2, start, mid2);
        this.move(num - 1, start, mid1);
        this.move(num, start, end);
        this.move(num - 1, mid1, end);
        this.move(num - 2, mid2, end);
        this.move(num - 3, mid3, end);
        this.move(num - 4, mid4, end);
        this.SevenPegs(num - 5, mid5, start, mid1, mid2, mid3, mid4, end);
    }

    EightPegs = (num, start, mid1, mid2, mid3, mid4, mid5, mid6, end) => {
        if (num < 1) return;
        this.EightPegs(num - 6, start, mid1, mid2, mid3, mid4, mid5, end, mid6)
        this.move(num - 5, start, mid5);
        this.move(num - 4, start, mid4);
        this.move(num - 3, start, mid3);
        this.move(num - 2, start, mid2);
        this.move(num - 1, start, mid1);
        this.move(num, start, end);
        this.move(num - 1, mid1, end);
        this.move(num - 2, mid2, end);
        this.move(num - 3, mid3, end);
        this.move(num - 4, mid4, end);
        this.move(num - 5, mid5, end);
        this.EightPegs(num - 6, mid6, start, mid1, mid2, mid3, mid4, mid5, end);
    }

    NinePegs = (num, start, mid1, mid2, mid3, mid4, mid5, mid6, mid7, end) => {
        if (num < 1) return;
        this.NinePegs(num - 7, start, mid1, mid2, mid3, mid4, mid5, mid6, end, mid7)
        this.move(num - 6, start, mid6);
        this.move(num - 5, start, mid5);
        this.move(num - 4, start, mid4);
        this.move(num - 3, start, mid3);
        this.move(num - 2, start, mid2);
        this.move(num - 1, start, mid1);
        this.move(num, start, end);
        this.move(num - 1, mid1, end);
        this.move(num - 2, mid2, end);
        this.move(num - 3, mid3, end);
        this.move(num - 4, mid4, end);
        this.move(num - 5, mid5, end);
        this.move(num - 6, mid6, end);
        this.NinePegs(num - 7, mid7, start, mid1, mid2, mid3, mid4, mid5, mid6, end);
    }

    TenPegs = (num, start, mid1, mid2, mid3, mid4, mid5, mid6, mid7, mid8, end) => {
        if (num < 1) return;
        this.TenPegs(num - 8, start, mid1, mid2, mid3, mid4, mid5, mid6, mid7, end, mid8)
        this.move(num - 7, start, mid7);
        this.move(num - 6, start, mid6);
        this.move(num - 5, start, mid5);
        this.move(num - 4, start, mid4);
        this.move(num - 3, start, mid3);
        this.move(num - 2, start, mid2);
        this.move(num - 1, start, mid1);
        this.move(num, start, end);
        this.move(num - 1, mid1, end);
        this.move(num - 2, mid2, end);
        this.move(num - 3, mid3, end);
        this.move(num - 4, mid4, end);
        this.move(num - 5, mid5, end);
        this.move(num - 6, mid6, end);
        this.move(num - 7, mid7, end);
        this.TenPegs(num - 8, mid8, start, mid1, mid2, mid3, mid4, mid5, mid6, mid7, end);
    }
}