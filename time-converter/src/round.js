export default function round(value, decimals) {
    //using scientific notation when rounding is more accurate than alternatives
    return Number(Math.round(value + `e${decimals}`) + `e-${decimals}`);
}