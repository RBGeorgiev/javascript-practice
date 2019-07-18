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
        let idx = this.content.length - 1;
        // bubble added element to correct pos in array
        this.bubble(idx);
    },


    // removes first value, doesn't remove all duplicate numbers 
    deleteVal: function (num) {
        // if not a number
        if (typeof num !== 'number') return null;

        let idx = null;
        for (let i = 1; i < this.content.length; i++) {
            if (num === this.content[i]) {
                idx = i;
                break;
            }
        }
        if (!idx) return null;
        if (idx === this.content.length - 1) return this.content.pop();
        // keep del value
        let deleted = this.content[idx];
        // set new value and del last
        this.content[idx] = this.content.pop();
        // idx is either even or odd

        // bubble up to correct pos
        this.bubble(idx);

        // sink down to correct pos
        // while parent > left child || parent > right child && idx > 0
        while (this.content[idx] > this.content[idx * 2] || this.content[idx] > this.content[idx * 2 + 1] && idx > 0) {
            // if left child is undefined
            if (this.content[idx * 2] === undefined) break;

            // if left child is smaller or right child is undefined
            if (this.content[idx * 2] < this.content[idx * 2 + 1] || this.content[idx * 2 + 1] === undefined) {
                // temporarily store left child val
                let temp = this.content[idx * 2];
                this.content[idx * 2] = this.content[idx];
                this.content[idx] = temp;
                // idx = left child idx
                idx = idx * 2
            }
            // if right child is smaller
            else {
                // temporarily store right child val
                let temp = this.content[idx * 2 + 1];
                this.content[idx * 2 + 1] = this.content[idx];
                this.content[idx] = temp;
                // idx = right child idx
                idx = idx * 2 + 1
            }
        }
        return deleted;
    },

    bubble: function (idx) {
        while (this.content[idx] < this.content[Math.floor(idx / 2)] && idx > 1) {
            // temporarily store child val
            let temp = this.content[idx];
            // child = parent
            this.content[idx] = this.content[Math.floor(idx / 2)];
            // parent = temp(child)
            this.content[Math.floor(idx / 2)] = temp;
            // idx = parent idx
            idx = Math.floor(idx / 2);
        }
    }
}

let minHeap = new MinHeap();
minHeap.add(3);

let test = [1, 24, 13, 4, 55, 16, 7, 81, 324, 23, 42, 34, -23]

for (let i = 0; i < test.length; i++) {
    minHeap.add(test[i]);
}

minHeap.deleteVal(3);
minHeap.deleteVal(324);
minHeap.deleteVal(16);
minHeap.deleteVal(1);
minHeap.deleteVal(4);

minHeap.content;