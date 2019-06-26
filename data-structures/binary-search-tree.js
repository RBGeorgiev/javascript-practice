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
            // if empty
            if (!node) return null;
            // if node 
            if (value === node.value) {
                // if leaf
                if (!node.right && !node.left) {
                    return null;
                }
                // if one child
                // if node only on right
                if (node.right && !node.left) {
                    return node.right;
                }
                // if node only on left
                if (!node.right && node.left) {
                    return node.left;
                }
                // if two children
                if (node.right && node.left) {
                    let tempNode = node.right;
                    while (tempNode.left) {
                        tempNode = tempNode.left
                    }
                    removeNode(node, tempNode.value);
                    node.value = tempNode.value;
                    return node;
                }
            }
            if (value < node.value) {
                node.left = removeNode(node.left, value)
                return node;
            }
            if (value > node.value) {
                node.right = removeNode(node.right, value)
                return node;
            }
        }
        this.root = removeNode(this.root, value);
    }
}

// test
const bst = new BST(19)
bst.add(13)
bst.add(12)
bst.add(17)
bst.add(16)
bst.add(15)
bst.add(0)
bst.add(-2)
bst.add(34)
bst.add(58)
bst.add(100)
console.log(bst)
// bst.remove(19)