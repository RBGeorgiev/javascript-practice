import ConstantsList from "./constants-list.js"

function formatNumber(number) {
    return Math.trunc(number)
        .toString()
        .padStart(2, '0');
}

export default function decimalToTime(sec) {
    let hours = sec / 3600;
    let minutes = hours % 1 * 60;
    let seconds = minutes % 1 * 60;

    let days = Math.trunc(hours) / 24
    let hoursWithDays = hours - Math.trunc(days) * 24

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