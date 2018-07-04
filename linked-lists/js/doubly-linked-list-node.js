module.exports = class DoublyLinkedListNode {
  
  constructor(prevNode, nextNode, data) {
    this.prevNode = prevNode;
    this.nextNode = nextNode;
    this.data = data
  }

  linkToFront(node) {
    this.prevNode = node;
  }

  linkToBack(node) {
    this.nextNode = node;
  }

  getNextNode() {
    return this.nextNode;
  }

  getPrevNode() {
    return this.prevNode;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
}
