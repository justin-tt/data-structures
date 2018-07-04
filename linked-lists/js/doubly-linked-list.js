const DoublyLinkedListNode = require('./doubly-linked-list-node.js');
const assert = require('assert');

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

  addBeforeNode(data, node) {
    const newNode = new DoublyLinkedListNode(
      node.getPrevNode(),
      node,
      data
    );
    
    newNode.getPrevNode().linkToBack(newNode);
    newNode.getNextNode().linkToFront(newNode);
    this.length += 1;

  }
  
  addAfterNode(data, node) {
    const newNode = new DoublyLinkedListNode(
      node,
      node.getNextNode(),
      data
    );

    newNode.getPrevNode().linkToBack(newNode);
    newNode.getNextNode().linkToFront(newNode);
    this.length += 1;

  }

  removeNode(node) {
    node.getPrevNode().linkToBack(node.getNextNode());
    node.getNextNode().linkToFront(node.getPrevNode());
    
    node.linkToBack(null);
    node.linkToFront(null);
    node.setData(null);
    
    this.length -= 1;

  }

  getFirstNode() {
    if (this.length === 0) {
      throw "List is empty.";
    }

    return this.headSentinel.getNextNode();
  }

  getLastNode() {
    if (this.length === 0) {
      throw "List is empty.";
    }

    return this.tailSentinel.getPrevNode();
  }

  removeFrontNode() {
    // check that it's not empty
    if (this.length === 0) {
      throw "Can't remove node from empty list.";
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

  // should rename to turn linked list into array
  // or just console.log the data instead of pushing it into an array
  displayData() {
    const dataArray = [];
    let iterNode = this.headSentinel.getNextNode();
    while (iterNode !== this.tailSentinel) {
      dataArray.push(iterNode.getData());
      iterNode = iterNode.getNextNode();
    }
    return dataArray;
  }

  sortData() {
    // not yet refactored, also not sure if there are
    // dangling references and memory leaks
    // merge sort implementation
    // have one slow pointer, and a fast pointer (2x the speed of slow pointer)
    // to split the linked list into 2 halves

    // Recursion base case: list has 1 item.
    const split = function split(list) {
      if (list.length > 1) {
        const listLength = list.getLength();
        const splitIndex = Math.ceil(listLength / 2);
        // split into two doubly-linked-lists at the index
        let middleNode = list.getFirstNode();
        for (let i = 0; i < splitIndex; i++) {
          middleNode = middleNode.getNextNode();
        }
        // creating the left doubly-linked-list
        // destructuring
        const leftList = new DoublyLinkedList();
        const rightList = new DoublyLinkedList();
        let iterNode = list.getFirstNode();
        while (iterNode !== middleNode) {
          leftList.addBackNode(iterNode.getData());
          iterNode = iterNode.getNextNode();
        }
        iterNode = middleNode;
        while (iterNode !== list.getLastNode().getNextNode()) {
          rightList.addBackNode(iterNode.getData());
          iterNode = iterNode.getNextNode();
        }
        return merge(leftList, rightList);
      } else {
        return list;
      }

    };

    const compare = function compare(nodeA, nodeB) {
      return nodeA.getData() < nodeB.getData();
    }

    const merge = function merge(leftList, rightList) {
      if (leftList.getLength() > 1) {
        leftList = split(leftList);
      }
      if (rightList.getLength() > 1) {
        rightList = split(rightList);
      }
      const mergedList = new DoublyLinkedList();
      let leftListPointer = leftList.getFirstNode();
      let rightListPointer = rightList.getFirstNode();

      while (leftListPointer.getData() !== null || rightListPointer.getData() !== null) {
        // consider the case [1,2] [3,4]
        // one list might completely empty out before the
        // other
        if (rightListPointer.getData() === null) {
          mergedList.addBackNode(leftListPointer.getData());
          leftListPointer = leftListPointer.getNextNode();
        } else if (leftListPointer.getData() === null) {
          mergedList.addBackNode(rightListPointer.getData());
          rightListPointer = rightListPointer.getNextNode();
        } else {
          if (compare(leftListPointer, rightListPointer)) {
            mergedList.addBackNode(leftListPointer.getData());
            leftListPointer = leftListPointer.getNextNode();
          } else {
            mergedList.addBackNode(rightListPointer.getData());
            rightListPointer = rightListPointer.getNextNode();
          }
        }
      }
      return mergedList;
    };
    
    let a = new DoublyLinkedList();
    a.addBackNode(2);
    let b = new DoublyLinkedList();
    b.addBackNode(1);
    let c = new DoublyLinkedList();
    c.addBackNode(1);
    c.addBackNode(2);
    assert.deepEqual(merge(a,b).displayData(), c.displayData());
    
    let d = new DoublyLinkedList();
    d.addBackNode(2);
    d.addBackNode(1);
    d.addBackNode(3);
    d = split(d);
    let e = new DoublyLinkedList();
    e.addBackNode(1);
    e.addBackNode(2);
    e.addBackNode(3);
    e.displayData();
    assert.deepEqual(d.displayData(), e.displayData());

    let sortedList = split(this);
    sortedList.getFirstNode().linkToFront(this.headSentinel);
    sortedList.getLastNode().linkToBack(this.tailSentinel);
    this.headSentinel.linkToBack(sortedList.getFirstNode());
    this.tailSentinel.linkToFront(sortedList.getLastNode());

    return sortedList;

  }
  
}
