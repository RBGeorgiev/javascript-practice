export const getDistanceBetweenPoints = (p1, p2) => {
    let x1 = p1[0];
    let y1 = p1[1];
    let x2 = p2[0];
    let y2 = p2[1];

    let a = x1 - x2;
    let b = y1 - y2;

    return Math.sqrt(a * a + b * b);
}