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
    }

    append(value) {
        if (!this.head) {
            this.head = this.tail = new Node(value);
        } else {
            let old = this.tail;
            this.tail = new Node(value, old, null);
            old.next = this.tail;
        }
    }

    prepend(value) {
        if (!this.head) {
            this.head = this.tail = new Node(value);
        } else {
            let old = this.head;
            this.head = new Node(value, null, old);
            old.prev = this.head;
        }
    }

    deleteHead() {
        if (!this.head) {
            return null;
        } else {
            let deleted = this.head;

            if (this.head === this.tail) {
                this.head = this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }

            return deleted.value;
        }
    }

    deleteTail() {
        if (!this.head) {
            return null;
        } else {
            let deleted = this.tail;

            if (this.head === this.tail) {
                this.head = this.tail = null;
            } else {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }

            return deleted.value;
        }
    }

    deleteValue(value) {
        if (!this.head) {
            return null;
        } else if (this.head.value === value) {
            return this.deleteHead();
        } else if (this.tail.value === value) {
            return this.deleteTail();
        } else {
            let deleted = this.search(value);

            if (!deleted) return null;

            deleted.prev.next = deleted.next;
            deleted.next.prev = deleted.prev;

            return deleted.value;
        }
    }

    search(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) return current;
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