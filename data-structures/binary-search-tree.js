class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// BST = Binary Search Tree
class BST {
    constructor(value = null) {
        this.root = new Node(value);
    }

    add(value) {
        let node = this.root;
        if (!node.value) {
            this.root = new Node(value);
            return;
        }
        const searchTree = (node) => {
            if (value < node.value) {
                if (!node.left) {
                    node.left = new Node(value);
                } else {
                    searchTree(node.left);
                }
            } else if (value > node.value) {
                if (!node.right) {
                    node.right = new Node(value);
                } else {
                    searchTree(node.right);
                }
            }
        }
        searchTree(node);
    }

    min() {
        let node = this.root;
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    max() {
        let node = this.root;
        while (node.right) {
            node = node.right;
        }
        return node;
    }
}

// test
const bst = new BST(15)
bst.add(13)
bst.add(12)
bst.add(0)
bst.add(-2)
bst.add(58)
bst.add(34)
bst.add(100)
console.log(bst)