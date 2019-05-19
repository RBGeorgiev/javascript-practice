import ConstantsList from "./constants-list.js";
import formatNumber from "./format-number.js";
import round from "./round.js";


export default function decimalToTime(sec) {
    let hours, minutes, seconds, days, hoursWithDays;

    hours = sec / 3600;
    //rounding minutes to 10 decimal places to get rid of floating point errors
    minutes = round(hours % 1 * 60, 10);
    //rounding seconds to 0 decimal places to get rid of floating point errors
    seconds = round(minutes % 1 * 60, 0);

    days = Math.trunc(hours) / 24;
    hoursWithDays = hours - Math.trunc(days) * 24;

    ConstantsList.answerDiv_DecTime.innerHTML = ` 
            <h3>Answer:</h3>   
            <br>
            = ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}
            <br>
            <br>
            ${formatNumber(hours)} hours: ${formatNumber(minutes)} minutes: ${formatNumber(seconds)} seconds
            <br>
            or
            <br>
            ${Math.trunc(days)} days, ${formatNumber(hoursWithDays)} hours: ${formatNumber(minutes)} minutes: ${formatNumber(seconds)} seconds
            `
}