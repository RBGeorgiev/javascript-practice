// left child = i * 2
// right child = i * 2 + 1
// parent = i / 2

function MinHeap() {
    this.content = [null];
}

MinHeap.prototype = {
    add: function (num) {
        if (typeof num !== 'number') return null;
        // push num to the end of arr
        this.content.push(num);
        // get added element pos
        let i = this.content.length - 1;
        // bubble added element to correct pos in array
        while (this.content[i] < this.content[Math.floor(i / 2)] && i > 0) {
            let temp = this.content[i];
            this.content[i] = this.content[Math.floor(i / 2)];
            this.content[Math.floor(i / 2)] = temp;
            i = Math.floor(i / 2);
        }
    },


    // removes first value, doesn't remove all duplicate numbers 
    deleteVal: function (num) {
        if (typeof num !== 'number') return null;

        let idx = null;
        for (let i = 1; i < this.content.length; i++) {
            if (num === this.content[i]) {
                idx = i;
                break;
            }
        }
        if (!idx) return null;
        let deleted = this.content[idx];
        this.content[idx] = this.content.pop();

        while (this.content[idx] < this.content[Math.floor(idx / 2)] && idx > 0) {
            let temp = this.content[idx];
            this.content[idx] = this.content[Math.floor(idx / 2)];
            this.content[Math.floor(idx / 2)] = temp;
            idx = Math.floor(idx / 2);
        }

        while (this.content[idx] > this.content[idx * 2] || this.content[idx] > this.content[idx * 2 + 1] && idx > 0) {
            if (this.content[idx * 2] === undefined) break;

            if (this.content[idx * 2] < this.content[idx * 2 + 1] || this.content[idx * 2 + 1] === undefined) {
                let temp = this.content[idx * 2];
                this.content[idx * 2] = this.content[idx];
                this.content[idx] = temp;
                idx = idx * 2
            }
            else {
                let temp = this.content[idx * 2 + 1];
                this.content[idx * 2 + 1] = this.content[idx];
                this.content[idx] = temp;
                idx = idx * 2 + 1
            }
        }
        return deleted;
    }
}

let minHeap = new MinHeap();
minHeap.add(3);

let test = [1, 24, 13, 4, 55, 16, 7, 81, 324, 23, 42, 34]

for (let i = 0; i < test.length; i++) {
    minHeap.add(test[i]);
}

minHeap.deleteVal(3);
minHeap.deleteVal(324);
minHeap.deleteVal(16);
minHeap.deleteVal(1);
minHeap.deleteVal(4);

minHeap.content;