import timeToDecimal from './time-to-decimal.js';
import decimalToTime from './decimal-to-time.js';
import minutesToHours from './minutes-to-hours.js';
import timeConversion from './time-conversion.js';
import ConstantsList from "./constants-list.js";

ConstantsList.timeToDecimalForm.onsubmit = function (e) {
    e.preventDefault();
    timeToDecimal(this)
}

ConstantsList.minutesToHoursForm.onsubmit = function (e) {
    e.preventDefault();
    minutesToHours(this)
}

ConstantsList.timeConversionForm.onsubmit = function (e) {
    e.preventDefault();
    timeConversion(this)
}

ConstantsList.decimalToTimeForm.onsubmit = function (e) {
    e.preventDefault();
    let val, timeUnit, sec;

    // Formula to convert time is: Value * (convertFromRate / convertToRate) [Same formula is also used in the Time Conversion Calculator]
    // Because only seconds are needed 'convertToRate' will always be 1
    // Formula is simplified to Value * convertFromRate
    val = this.decimalTime.value;
    timeUnit = this.timeUnit.value;
    sec = val * ConstantsList.secondConversionRates[timeUnit];

    decimalToTime(sec);
}