import round from './round.js';
import ConstantsList from "./constants-list.js";
import formatNumber from "./format-number.js";

export default function minutesToHours(e) {
    let minutes, hoursDecimal, minutesTime, hoursTime;

    minutes = e.minutes.value;
    //decimal hours rounded to only 6 decimal places
    hoursDecimal = round(minutes / 60, 6);
    minutesTime = round(hoursDecimal % 1 * 60, 0);
    hoursTime = Math.trunc(hoursDecimal);

    ConstantsList.answerDiv_MinHour.innerHTML = `   
            <h3>Answer:</h3> 
            <br>            
            = ${formatNumber(hoursTime)}:${formatNumber(minutesTime)}
            <br>
            <br>
            ${hoursTime} hours: ${minutesTime} minutes
            <br>
            or
            <br>
            ${hoursDecimal} decimal hours
            `
}
