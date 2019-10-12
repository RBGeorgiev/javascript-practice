export default function exportJson(el, json, name) {
    if (!json || json.length === 0) return alert('There is no previous generation');
    let obj = json;
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    el.setAttribute("href", "data:" + data);
    el.setAttribute("download", `${name}.json`);
}