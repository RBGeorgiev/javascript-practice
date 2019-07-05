class Node {
    constructor(value, prev, next) {
        this.value = value;
        this.prev = prev || null;
        this.next = next || null;
    }
}

// Doubly Linked List
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // add Node at the end
    append(value) {
        // if list is empty
        if (!this.head) {
            // create first Node, which is both the head and tail of the list
            this.head = this.tail = new Node(value);
            this.length += 1;
        } else {
            // store old tail in variable
            let old = this.tail;
            // create new Node at the end of list and make it point to old tail
            this.tail = new Node(value, old, null);
            // set old tail to point to new tail 
            old.next = this.tail;
            this.length += 1;
        }
    }

    // add Node at the beginning
    prepend(value) {
        // if list is empty
        if (!this.head) {
            // create first Node, which is both the head and tail of the list
            this.head = this.tail = new Node(value);
            this.length += 1;
        } else {
            // store old head in variable
            let old = this.head;
            // create new Node at the start of list and make it point to old head
            this.head = new Node(value, null, old);
            // set old head to point to new head 
            old.prev = this.head;
            this.length += 1;
        }
    }

    // delete first Node
    deleteHead() {
        // if list is empty
        if (!this.head) {
            return null;
        } else {
            let deleted = this.head;

            // if it's the last Node in list (last Node is both head and tail of list)
            if (this.head === this.tail) {
                this.head = this.tail = null;
            }
            // if there is more than 1 Node in list
            else {
                this.head = this.head.next;
                this.head.prev = null;
            }

            this.length -= 1;
            return deleted.value;
        }
    }

    // delete last Node
    deleteTail() {
        // if list is empty
        if (!this.head) {
            return null;
        } else {
            let deleted = this.tail;

            // if it's the last Node in list (last Node is both head and tail of list)
            if (this.head === this.tail) {
                this.head = this.tail = null;
            }
            // if there is more than 1 Node in list
            else {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }

            this.length -= 1;
            return deleted.value;
        }
    }

    // delete Node by value
    deleteByValue(value) {
        // if list is empty
        if (!this.head) {
            return null;
        }
        // if value is the same as first Node
        else if (this.head.value === value) {
            return this.deleteHead();
        }
        // if value is the same as last Node
        else if (this.tail.value === value) {
            return this.deleteTail();
        }
        else {
            // find value in list
            let deleted = this.searchVal(value);

            // if value doesn't exists return null
            if (!deleted) return null;

            // else delete Node by removing all references to it
            deleted.prev.next = deleted.next;
            deleted.next.prev = deleted.prev;

            this.length -= 1;
            return deleted.value;
        }
    }

    // delete Node by index
    deleteAtIdx(index) {
        // if linked list is empty or if index doesn't exist in linked list
        if (!this.head || index < 0 || index > this.length - 1) {
            return null;
        }
        // if index points to first Node
        else if (index === 0) {
            return this.deleteHead();
        }
        // if index points to last Node
        else if (index === this.length - 1) {
            return this.deleteTail();
        }
        else {
            // find index in list
            let deleted = this.searchIdx(index);

            // else delete Node by removing all references to it
            deleted.prev.next = deleted.next;
            deleted.next.prev = deleted.prev;

            this.length -= 1;
            return deleted.value;
        }
    }

    // search for Node by value
    searchVal(value) {
        // if linked list is empty
        if (!this.head) {
            return null;
        }

        let current = this.head;

        // loop through list until Node with value is found
        while (current) {
            if (current.value === value) return current;
            current = current.next;
        }
    }

    // search for Node by index
    searchIdx(index) {
        // if linked list is empty or if index doesn't exist in linked list
        if (!this.head || index < 0 || index > this.length - 1) {
            return null;
        }

        let current = this.head;
        let currentIndex = 0;

        /// loop through list until Node with index is found
        while (current) {
            if (currentIndex === index) return current;
            currentIndex += 1;
            current = current.next;
        }
    }
}

let LL = new LinkedList;

LL.append(1);
LL.append(2);
LL.append(3);
LL.append(4);
LL.prepend(0);
LL.prepend(-1);