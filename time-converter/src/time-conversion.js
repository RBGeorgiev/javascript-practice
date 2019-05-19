import ConstantsList from "./constants-list.js";

export default function timeConversion(form) {
    let convertValue, convertFrom, convertTo, answer;

    convertValue = +form.convertValue.value;
    convertFrom = form.convertFrom.value;
    convertTo = form.convertTo.value;

    // Formula: Value * (convertFromRate / convertToRate)
    answer = convertValue * (ConstantsList.secondConversionRates[convertFrom] / ConstantsList.secondConversionRates[convertTo]);

    ConstantsList.answerDiv_TimeConv.innerHTML = ` 
            <h3>Answer:</h3>   
            <br>
            <p>${convertValue} ${convertFrom} = </p>
            <p>${answer} ${convertTo}</p>
            `
}