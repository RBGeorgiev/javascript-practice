import ConstantsList from "./constants-list.js"
// let inclDays = document.getElementById("inclDays");

export default function decimalToTime(seconds) {
    let answer = []

    let hours = seconds / 3600;
    let minutes = hours % 1 * 60;
    seconds = minutes % 1 * 60;

    // if (Math.trunc(hours) > 24 && inclDays.checked) {
    //   days = Math.trunc(hours) / 24
    //   answer.push(
    //     Math.trunc(days)
    //   );
    //   hours = hours - Math.trunc(days) * 24
    // }

    answer.push(
        Math.trunc(hours)
            .toString()
            .padStart(2, '0')
    );

    answer.push(
        Math.trunc(minutes)
            .toString()
            .padStart(2, '0')
    );

    answer.push(
        Math.trunc(seconds)
            .toString()
            .padStart(2, '0')
    );

    ConstantsList.answerDiv.innerHTML = ` 
            Answer:    
            <br>
            Hours: ${Math.trunc(hours)} 
            <br>
            Minutes: ${Math.trunc(minutes)} 
            <br>
            Seconds: ${Math.trunc(seconds)}
            <br>
            ${answer.join(':')}
            `
}