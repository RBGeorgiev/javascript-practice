export default function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (!serializedState) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}