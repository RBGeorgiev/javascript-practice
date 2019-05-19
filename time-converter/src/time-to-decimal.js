import round from './round.js';
import ConstantsList from "./constants-list.js";

export default function timeToDecimal(form) {
    let hours, minutes, seconds, decimals, hoursAns, minutesAns, secondsAns;

    hours = +form.hours.value || 0;
    minutes = +form.minutes.value || 0;
    seconds = +form.seconds.value || 0;
    decimals = +form.decimals.value || 0;

    hoursAns = hours + (minutes / 60) + (seconds / 3600);
    minutesAns = (hours * 60) + minutes + (seconds / 60);
    secondsAns = (hours * 3600) + (minutes * 60) + seconds;

    ConstantsList.answerDiv_TimeDec.innerHTML = `
            <h3>Answer:</h3>
            <br>
            ${round(hoursAns, decimals)} hours
            <br>
            or
            <br>
            ${round(minutesAns, decimals)} minutes
            <br>
            or
            <br>
            ${round(secondsAns, decimals)} seconds
            `
}