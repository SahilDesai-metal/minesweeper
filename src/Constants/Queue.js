class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    enqueue(data) {
        var newNode = new Node(data);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size += 1;
    }
    dequeue() {
        var newNode;
        if (this.head !== null) {
            newNode = this.head.data;
            this.head = this.head.next;
            this.size -= 1;
        }
        return newNode;
    }
    length() {
        return this.size;
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

export {
    Queue
};
