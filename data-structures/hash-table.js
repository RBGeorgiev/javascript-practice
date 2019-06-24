function hash(key, size) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    return hash % size;
}

function HashTable() {
    this.size = 20;
    this.storage = new Array(this.size);

    this.add = function (key, value) {
        let idx = hash(key, this.size);
        // if there is already something in idx pos
        if (this.storage[idx]) {
            let inserted = false;
            // check if key repeats / already exists
            for (let i = 0; i < this.storage[idx].length; i++) {
                if (this.storage[idx][i][0] === key) {
                    // if key repeats, replace value
                    this.storage[idx][i][1] = value;
                    inserted = true;
                }
            }
            // if key does NOT repeat, create new key/value pair
            if (!inserted) {
                this.storage[idx].push([key, value]);
            }
        } else {
            // if there is nothing in idx pos, create new bucket and put key/value pair inside
            this.storage[idx] = [
                [key, value]
            ];
        }
    }

    this.remove = function (key) {
        let idx = hash(key, this.size);
        if (this.storage[idx]) {
            for (let i = 0; i < this.storage[idx].length; i++) {
                if (this.storage[idx][i][0] === key) {
                    return this.storage[idx].splice(i, 1)
                }
            }
        }
    }

    this.search = function (key) {
        let idx = hash(key, this.size);
        if (this.storage[idx]) {
            for (let i = 0; i < this.storage[idx].length; i++) {
                if (this.storage[idx][i][0] === key) {
                    return this.storage[idx][i][1];
                }
            }
        }
    }
}

let hashTable = new HashTable();

hashTable.add('Rado', 'Georgiev');
// hashTable.search('Rado');
// hashTable.remove('Rado');

console.log(hashTable.storage);