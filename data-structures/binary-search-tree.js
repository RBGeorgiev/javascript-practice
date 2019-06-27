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
        if (!node || !node.value) {
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

    contains(value) {
        let node = this.root;
        while (node) {
            if (value === node.value) {
                return true;
            } else if (value < node.value) {
                node = node.left;
            } else if (value > node.value) {
                node = node.right;
            }
        }
        return false;
    }

    remove(value) {
        const removeNode = (node, value) => {
            // if node is empty
            if (!node) return null;
            // if node value is the same as passed in value
            if (value === node.value) {
                // if the node is a leaf, remove it
                if (!node.right && !node.left) {
                    return null;
                }
                // if node has only one child
                // if child is on the right
                if (node.right && !node.left) {
                    return node.right;
                }
                // if child is on the left
                if (!node.right && node.left) {
                    return node.left;
                }
                // if node has two children
                if (node.right && node.left) {
                    // search for smallest number on the right side
                    let tempNode = node.right;
                    while (tempNode.left) {
                        tempNode = tempNode.left;
                    }
                    // remove smallest number node
                    removeNode(node, tempNode.value);
                    // remove node by replacing it's value with the smallest number on the right side
                    node.value = tempNode.value;
                    // return new node
                    return node;
                }
            }
            // find node to remove
            if (value < node.value) {
                // set node in correct pos or remove node
                node.left = removeNode(node.left, value);
                // return recursively back to root
                return node;
            }
            // find node to remove
            if (value > node.value) {
                // set node in correct pos or remove node
                node.right = removeNode(node.right, value);
                // return recursively back to root
                return node;
            }
        }
        // call the remove method starting at root
        this.root = removeNode(this.root, value);
    }

    // dfs = depth first search:
    // in-order
    dfsInOrder() {
        let result = [];
        const traverse = (node) => {
            if (node.left) traverse(node.left);
            result.push(node.value);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return result;
    }

    // pre-order
    dfsPreOrder() {
        let result = [];
        const traverse = (node) => {
            result.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return result;
    }

    // post-order
    dfsPostOrder() {
        let result = [];
        const traverse = (node) => {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            result.push(node.value);
        }
        traverse(this.root);
        return result;
    }
}

// test
const bst = new BST(19);
bst.add(13);
bst.add(12);
bst.add(17);
bst.add(16);
bst.add(15);
bst.add(0);
bst.add(-2);
bst.add(34);
bst.add(58);
bst.add(100);
console.log(bst);
// bst.remove(19);

bst.dfsInOrder();
// bst.dfsPreOrder();
// bst.dfsPostOrder();