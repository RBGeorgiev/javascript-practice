export default function getSquareFromPoint(x, y) {
    let element, elements = [];
    let old_visibility = [];
    while (true) {
        element = document.elementFromPoint(x, y);

        if (element.matches(".square")) {
            break;
        }

        if (!element || element === document.documentElement) {
            element = null;
            break;
        }
        elements.push(element);
        old_visibility.push(element.style.visibility);
        element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }
    for (let k = 0; k < elements.length; k++) {
        elements[k].style.visibility = old_visibility[k];
    }

    return element;
}