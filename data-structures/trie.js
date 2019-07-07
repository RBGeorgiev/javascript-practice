class Node {
    consturctor(char, end = false) {
        this.char = char;
        this.end = end;
        this.child = new Map();
    }

}

class Trie {
    constructor() {
        this.root = new Node();
    }
}

let trie = new Trie;