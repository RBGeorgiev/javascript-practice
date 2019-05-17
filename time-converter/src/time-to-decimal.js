import round from './round.js'
import ConstantsList from "./constants-list.js"
let hours, minutes, seconds, decimals, hoursAns, minutesAns, secondsAns;


export default function timeToDecimal(form) {
    hours = +form.hours.value || 0;
    minutes = +form.minutes.value || 0;
    seconds = +form.seconds.value || 0;
    decimals = +form.decimals.value || 0;

    hoursAns = calcHours(hours, minutes, seconds)
    minutesAns = calcMinutes(hours, minutes, seconds)
    secondsAns = calcSeconds(hours, minutes, seconds)

    ConstantsList.answerDiv_TimeDec.innerHTML = `
            Answer:
            <br>
            Hours: ${round(hoursAns, decimals)} 
            <br>
            Minutes: ${round(minutesAns, decimals)} 
            <br>
            Seconds: ${round(secondsAns, decimals)}
            `
}

function calcHours(hours, minutes, seconds) {
    return hours + (minutes / 60) + (seconds / 3600);
}

function calcMinutes(hours, minutes, seconds) {
    return (hours * 60) + minutes + (seconds / 60);
}

function calcSeconds(hours, minutes, seconds) {
    return (hours * 3600) + (minutes * 60) + seconds;
}