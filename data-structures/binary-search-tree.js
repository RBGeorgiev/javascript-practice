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

    // add node to tree
    add(value) {
        let node = this.root;
        // if there is no root node
        if (!node || !node.value) {
            // create root node
            this.root = new Node(value);
            return;
        }

        const searchTree = (node) => {
            // if value < node.value, go left
            if (value < node.value) {
                // if no left child, append new node
                if (!node.left) {
                    node.left = new Node(value);
                }
                // if left child, look left again
                else {
                    searchTree(node.left);
                }
            }
            // if value > node.value, go right
            else if (value > node.value) {
                // if no right child, append new node
                if (!node.right) {
                    node.right = new Node(value);
                }
                // if right child, look right again
                else {
                    searchTree(node.right);
                }
            }
        }
        // call function starting with this.root
        searchTree(node);
    }

    //find node with smallest value 
    min() {
        let node = this.root;
        // smallest value node is the leftmost node in the tree
        while (node.left) {
            // loop stops when node.left === null
            node = node.left;
        }
        return node;
    }

    //find node with biggest value 
    max() {
        let node = this.root;
        // largest value node is the rightmost node in the tree
        while (node.right) {
            // loop stops when node.right === null
            node = node.right;
        }
        return node;
    }

    // check if tree contains node
    // contains() returns boolean, find() returns node
    contains(value) {
        let node = this.root;
        while (node) {
            // if value === node.value, return true
            if (value === node.value) {
                return true;
            }
            // if value < node.value, go left
            else if (value < node.value) {
                node = node.left;
            }
            // if value > node.value, go right
            else if (value > node.value) {
                node = node.right;
            }
        }
        // if value doesn't exists in tree, return false
        return false;
    }

    // find and return node by value
    // contains() returns boolean, find() returns node
    find(value) {
        let node = this.root;
        while (node) {
            // if value === node.value, return node
            if (value === node.value) {
                return node;
            }
            // if value < node.value, go left
            else if (value < node.value) {
                node = node.left;
            }
            // if value > node.value, go right
            else if (value > node.value) {
                node = node.right;
            }
        }
        // if value doesn't exists in tree, return false
        return false;
    }

    //remove node from tree
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

    // Tree Traversals:
    // Depth-first search:

    // in-order
    // left, root, right
    // -2, 0, 12, 13, 15, 16, 17, 19, 34, 58, 100
    inOrder() {
        let result = [];
        const traverse = (node) => {
            // if left child exists, go left again
            if (node.left) traverse(node.left);
            // capture root node value
            result.push(node.value);
            // if right child exists, go right again
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return result;
    }

    // pre-order
    // root, left, right
    // 19, 13, 12, 0, -2, 17, 16, 15, 34, 58, 100
    preOrder() {
        let result = [];
        const traverse = (node) => {
            // capture root node value
            result.push(node.value);
            // if left child exists, go left again
            if (node.left) traverse(node.left);
            // if right child exists, go right again
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return result;
    }

    // post-order
    // left, right, root
    // -2, 0, 12, 15, 16, 17, 13, 100, 58, 34, 19
    postOrder() {
        let result = [];
        const traverse = (node) => {
            // if left child exists, go left again
            if (node.left) traverse(node.left);
            // if right child exists, go right again
            if (node.right) traverse(node.right);
            // capture root node value
            result.push(node.value);
        }
        traverse(this.root);
        return result;
    }

    // Breadth-first search:
    // level order - layer by layer
    // 19, 13, 34, 12, 17, 58, 0, 16, 100, -2, 15
    levelOrder() {
        let result = [];
        let queue = [this.root];

        queue.push(this.root);
        // while queue is not empty
        while (queue.length) {
            // get last node from queue
            let node = queue.pop();
            // push node value to result
            result.push(node.value);
            // add left child to queue, if it exists
            if (node.left) queue.unshift(node.left);
            // add right child to queue, if it exists
            if (node.right) queue.unshift(node.right);
        }

        return result;
    }

    minHeight(node = this.root) {
        // when an empty node is found start count from -1
        if (!node) return -1;

        // travel to the bottom of the tree checking every node on each side
        // recursively get minimum height on left side node
        let left = this.minHeight(node.left);
        // recursively get minimum height on right side node
        let right = this.minHeight(node.right);

        // compare the heights of left and right side
        // return the smaller number and move up a node adding 1 for height
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }

    maxHeight(node = this.root) {
        // when an empty node is found start count from -1
        if (!node) return -1;

        // travel to the bottom of the tree checking every node on each side
        let left = this.maxHeight(node.left);
        let right = this.maxHeight(node.right);

        // return the bigger number and move up a node adding 1 for height
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }

    // tree is balanced when the difference between the min and max height is 0 or 1 
    isBalanced() {
        return this.minHeight() >= this.maxHeight() - 1
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

bst.inOrder();
// bst.preOrder();
// bst.postOrder();
// bst.levelOrder();

// bst.minHeight();
// bst.maxHeight();
bst.isBalanced();