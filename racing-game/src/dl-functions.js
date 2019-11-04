export function exportPopulation(el, json, name) {
    if (!json || json.length === 0) return alert('There is no previous generation');
    let obj = `export const population = ${encodeURIComponent(JSON.stringify(json))}`;
    let data = "text/json;charset=utf-8," + obj;

    el.setAttribute("href", "data:" + data);
    el.setAttribute("download", `${name}.js`);
}

export function downloadMap(el, json, name) {
    if (json.outerLines.length === 0) return alert('Track is missing outer boundary');
    if (json.innerLines.length === 0) return alert('Track is missing inner boundary');
    if (json.gates.length === 0) return alert('Track is missing reward gates');
    let obj = `export const ${name.toUpperCase()} = ${encodeURIComponent(JSON.stringify(json))}`;
    let data = "text/json;charset=utf-8," + obj;

    el.setAttribute("href", "data:" + data);
    el.setAttribute("download", `${name}.js`);
}