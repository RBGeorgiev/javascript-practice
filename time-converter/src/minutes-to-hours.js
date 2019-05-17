import round from './round.js'
import ConstantsList from "./constants-list.js"

export default function minutesToHours(e) {
    let minutes = e.minutes.value;
    let hoursDecimal = round(minutes / 60, 6)
    let minutesTime = Math.round(hoursDecimal % 1 * 60)
    let hoursTime = Math.trunc(hoursDecimal)

    ConstantsList.answerDiv_MinHour.innerHTML = `   
            Answer:  
            <br>
            ${hoursTime} hours and ${minutesTime} minutes
            <br>
            ${hoursTime}:${minutesTime.toString().padStart(2, '0')}
            <br>
            Decimal hours: ${hoursDecimal}
            `
}
