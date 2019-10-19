export default function exportPopulation(el, json, name) {
    if (!json || json.length === 0) return alert('There is no previous generation');
    let obj = encodeURIComponent(JSON.stringify(json));
    let data = "text/json;charset=utf-8," + obj;

    el.setAttribute("href", "data:" + data);
    el.setAttribute("download", `${name}.js`);
}