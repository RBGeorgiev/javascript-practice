import ConstantsList from "./constants-list.js"

export default function timeConversion(form) {
    let convertValue = +form.convertValue.value
    let convertFrom = form.convertFrom.value
    let convertTo = form.convertTo.value

    // Formula: Value * (convertFrom / convertTo)
    let answer = convertValue * (ConstantsList.secondConversionRates[convertFrom] / ConstantsList.secondConversionRates[convertTo]);

    ConstantsList.answerDiv.innerHTML = ` 
            Answer:    
            <br>
            ${convertValue} ${convertFrom} = ${answer} ${convertTo}
            `
}