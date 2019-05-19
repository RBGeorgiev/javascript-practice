export default function formatNumber(number) {
    return Math.trunc(number)
        .toString()
        .padStart(2, '0');
}