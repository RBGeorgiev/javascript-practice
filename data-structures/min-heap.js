// left child = i * 2
// right child = i * 2 + 1
// parent = i / 2

function MinHeap() {
    this.content = [null];
}

MinHeap.prototype = {
    add: function (num) {
        this.content.push(num);
        if (this.content.length > 2) {
            let i = this.content.length - 1;
            while (this.content[i] < this.content[Math.floor(i / 2)] && i > 0) {
                let temp = this.content[i];
                this.content[i] = this.content[Math.floor(i / 2)];
                this.content[Math.floor(i / 2)] = temp;
                i = Math.floor(i / 2);
            }
        }
    }
}

let minHeap = new MinHHeap();
minHeap.add(3)