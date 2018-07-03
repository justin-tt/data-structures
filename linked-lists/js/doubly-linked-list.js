const DoublyLinkedListNode = require('./doubly-linked-list-node.js');

module.exports = class DoublyLinkedList {
  
  constructor() {
    const headSentinel = new DoublyLinkedListNode(null, null, null);
    const tailSentinel = new DoublyLinkedListNode(null, null, null);
    headSentinel.linkToBack(tailSentinel);
    tailSentinel.linkToFront(headSentinel);
    this.headSentinel = headSentinel;
    this.tailSentinel = tailSentinel;
    this.length = 0;
  }

  addFrontNode(data) {
    const newNode = new DoublyLinkedListNode(
      this.headSentinel,
      this.headSentinel.getNextNode(),
      data
    );

    newNode.getPrevNode().linkToBack(newNode);
    newNode.getNextNode().linkToFront(newNode);
    this.length += 1;

  }

  addBackNode(data) {
    const newNode = new DoublyLinkedListNode(
      this.tailSentinel.getPrevNode(),
      this.tailSentinel,
      data
    );

    newNode.getPrevNode().linkToBack(newNode);
    newNode.getNextNode().linkToFront(newNode);
    this.length += 1;

  }

  removeFrontNode() {
    // check that it's not empty
    if (this.length === 0) {
      throw "Can't remove node from empty list."
    }

    const removedNode = this.headSentinel.getNextNode();
    
    this.headSentinel.linkToBack(removedNode.getNextNode());
    removedNode.getNextNode().linkToFront(this.headSentinel);

    removedNode.linkToBack(null);
    removedNode.linkToFront(null);
    this.length -= 1;

  }

  removeBackNode() {
    // check that it's not empty
    if (this.length === 0) {
      throw "Can't remove node from empty list."
    }

    const removedNode = this.tailSentinel.getPrevNode();
    
    this.tailSentinel.linkToFront(removedNode.getPrevNode());
    removedNode.getPrevNode().linkToBack(this.tailSentinel);

    removedNode.linkToBack(null);
    removedNode.linkToFront(null);
    this.length -= 1;

  }

  getLength() {
    return this.length;
  }

  displayData() {
    const dataArray = [];
    let iterNode = this.headSentinel.getNextNode();
    while (iterNode !== this.tailSentinel) {
      dataArray.push(iterNode.getData());
      iterNode = iterNode.getNextNode();
    }
    return dataArray;
  }
  
}
