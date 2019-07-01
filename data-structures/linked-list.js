class Node {
    constructor(value, prev, next) {
        this.value = value;
        this.prev = prev || null;
        this.next = next || null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        if (!this.head) {
            this.head = new Node(value);
        } else {
            let old = this.tail || this.head;
            this.tail = new Node(value, old, null);
            old.next = this.tail;
        }
    }

    prepend(value) {
        if (!this.head) {
            this.head = new Node(value);
        } else if (!this.tail) {
            this.tail = this.head;
            this.head = new Node(value, null, this.tail);
            this.tail.prev = this.head;
        } else {
            let old = this.head;
            this.head = new Node(value, null, old);
            old.prev = this.head;
        }
    }

    deleteHead() {
        if (!this.head) {
            return null;
        }
        let deleted = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        return deleted.value;
    }
}

let LL = new LinkedList;

LL.append(11);
LL.append(22);
LL.append(33);
LL.append(44);