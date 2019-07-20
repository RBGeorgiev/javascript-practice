// left child = i * 2
// right child = i * 2 + 1
// parent = i / 2

class MinHeap {
    constructor() {
        this.content = [null];
    }
    // add number to heap
    add(num) {
        if (typeof num !== 'number') return null;
        // push num to the end of arr
        this.content.push(num);
        // get added element pos
        let idx = this.content.length - 1;
        // bubble added element to correct pos in array
        this.bubble(idx);
    }

    // removes first value, doesn't remove all duplicate numbers 
    deleteVal(num) {
        // if not a number
        if (typeof num !== 'number') return null;
        // if matching value is the last in the array
        if (num === this.content[this.content.length - 1]) return this.content.pop();

        let idx = null;
        // look for value in the heap array
        for (let i = 1; i < this.content.length; i++) {
            if (num === this.content[i]) {
                // if value is found get the idx of value
                idx = i;
                break;
            }
        }
        // if no matching value is found
        if (!idx) return null;

        // keep del value
        let deleted = this.content[idx];
        // set new value and del last
        this.content[idx] = this.content.pop();

        // sink down to correct pos
        this.sink(idx)

        return deleted;
    }

    bubble(idx) {
        // while child < parent && idx > 1
        while (this.content[idx] < this.content[Math.floor(idx / 2)] && idx > 1) {
            // swap child with parent
            idx = this.swap(idx, Math.floor(idx / 2))
        }
    }

    sink(idx) {
        // while parent > left child || parent > right child && idx > 0
        while (this.content[idx] > this.content[idx * 2] || this.content[idx] > this.content[idx * 2 + 1] && idx > 0) {
            // if left child is undefined
            if (this.content[idx * 2] === undefined) break;

            // if left child is smaller than right child or right child is undefined
            if (this.content[idx * 2] < this.content[idx * 2 + 1] || this.content[idx * 2 + 1] === undefined) {
                // swap parent with left child
                idx = this.swap(idx, idx * 2)
            }
            // if right child is smaller than left child
            else {
                // swap parent with right child
                idx = this.swap(idx, idx * 2 + 1)
            }
        }
    }

    swap(oldIdx, newIdx) {
        let temp = this.content[oldIdx];
        this.content[oldIdx] = this.content[newIdx];
        this.content[newIdx] = temp
        return newIdx;
    }

    popMin() {
        if (this.content.length === 1) return null;
        if (this.content.length === 2) return this.content.pop();
        let deleted = this.content[1];
        // set new value and del last
        this.content[1] = this.content.pop();
        // sink down to correct pos
        this.sink(1);
        return deleted;
    }
}

let minHeap = new MinHeap;
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

minHeap.popMin();

minHeap.content;