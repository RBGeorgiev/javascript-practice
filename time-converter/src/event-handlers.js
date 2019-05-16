import timeToDecimal from './time-to-decimal.js'
import decimalToTime from './decimal-to-time.js'
import minutesToHours from './minutes-to-hours.js'
import timeConversion from './time-conversion.js'
import ConstantsList from "./constants-list.js"



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

    let val = this.decimalTime.value

    switch (this.timeUnit.value) {
        case 'days':
            val = val * 60 * 60 * 24
            decimalToTime(val)
            break;
        case 'hours':
            val = val * 60 * 60
            decimalToTime(val)
            break;
        case 'minutes':
            val = val * 60
            decimalToTime(val)
            break;
        case 'seconds':
            decimalToTime(val)
            break;
    }
}