class ConstantsList {
    constructor() {
        this.timeToDecimalForm = document.getElementById("time-to-decimal-form");
        this.decimalToTimeForm = document.getElementById("decimal-to-time-form");
        this.minutesToHoursForm = document.getElementById("minutes-to-hours-form");
        this.timeConversionForm = document.getElementById("time-conversion-form");

        this.answerDiv_TimeDec = document.getElementById("answer-time-dec");
        this.answerDiv_DecTime = document.getElementById("answer-dec-time");
        this.answerDiv_MinHour = document.getElementById("answer-min-hour");
        this.answerDiv_TimeConv = document.getElementById("answer-time-conv");

        this.secondConversionRates = {
            ns: 0.000000001,
            μs: 0.000001,
            ms: 0.001,
            s: 1,
            min: 60,
            h: 3600,
            d: 86400,
            wk: 604800,
            mo: 2628000,
            yr: 31536000,
            dec: 315360000,
            c: 3153600000,
            millennium: 31536000000
        }
    }
}

export default new ConstantsList()


