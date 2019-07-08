class Node {
    constructor() {
        this.chars = new Map();
        this.end = false;
    }
    setEnd() {
        this.end = true;
    }

    isEnd() {
        return this.end;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    add(word) {
        if (!word || typeof word !== 'string') return null;
        let node = this.root
        while (word.length > 0) {
            if (!node.chars.get(word[0])) node.chars.set(word[0], new Node);
            node = node.chars.get(word[0]);
            word = word.substring(1);
        }
        node.setEnd();
    }

    exists(word) {
        if (!word || typeof word !== 'string') return null;
        let node = this.root;
        while (word.length > 0) {
            if (!node.chars.get(word[0])) return false;
            node = node.chars.get(word[0]);
            word = word.substring(1);
        }
        return (word.length === 0 && node.isEnd())
    }
}

let trie = new Trie;
trie.add('was');
trie.add('were');
trie.add('three');
trie.add('tree');
trie.add('to');
trie.add('toga');
trie.add('together');

trie.exists('three');
trie.exists('motion');
trie