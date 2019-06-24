// ES6 Hash Table using the Map object
const hash = (key, size) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    return hash % size;
}

class HashTable {
    constructor() {
        this.size = 100;
        this.storage = new Array(this.size);

        // Populate storage with Map
        for (let i = 0; i < this.storage.length; i++) {
            this.storage[i] = new Map()
        }
    }

    add(key, value) {
        let idx = hash(key, this.size);
        this.storage[idx].set(key, value)
    }

    delete(key) {
        let idx = hash(key, this.size);
        let deleted = this.storage[idx].get(key);
        this.storage[idx].delete(key);
        return deleted;
    }

    search(key) {
        let idx = hash(key, this.size);
        return this.storage[idx].get(key);
    }
}

const hashTable = new HashTable;

// Hash Table test:

hashTable.add('Rado', 'Georgiev');
// hashTable.search('Rado');
// hashTable.delete('Rado');

console.log(hashTable);