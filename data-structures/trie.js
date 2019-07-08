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
        // if not a string 
        if (typeof word !== 'string') return null;

        // start from root
        let node = this.root
        // loop until no more letters in word
        while (word.length > 0) {
            // if letter doesn't exists in Node, create new letter pointing to new Map (e.g. f => {})
            if (!node.chars.get(word[0])) node.chars.set(word[0], new Node);
            // set current Node to letter 
            node = node.chars.get(word[0]);
            // remove first character in string
            word = word.substring(1);
        }
        // mark final letter as end of word
        node.setEnd();
    }

    exists(word) {
        // if not a string 
        if (typeof word !== 'string') return null;

        // start from root
        let node = this.root;
        // loop through all letters in word
        while (word.length > 0) {
            // if letter doesn't exists return false
            if (!node.chars.get(word[0])) return false;
            // if letter exists set to current letter
            node = node.chars.get(word[0]);
            // remove first character in string
            word = word.substring(1);
        }
        // if last letter is marked as ending a word return true
        return node.isEnd()
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