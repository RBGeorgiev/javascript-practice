let container = document.getElementsByClassName("container");

for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
        let square = document.createElement("div");
        square.className = "square"
        square.innerHTML = `${x}, ${y}`;
        container[0].appendChild(square)
    }
}