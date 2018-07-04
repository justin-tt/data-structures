const DoublyLinkedList = require('./doubly-linked-list.js')
const assert = require('assert');
// DLL is suitable in this current state
// for application as a stack/queue

const dll = new DoublyLinkedList();
dll.addFrontNode(3);
console.log(dll.displayData());
dll.addFrontNode(4);
console.log(dll.displayData());
dll.addBackNode(5);
console.log(dll.displayData());
console.log(dll.getLength());
dll.removeBackNode();
console.log(dll.displayData());
dll.removeFrontNode();
console.log(dll.displayData());
console.log(dll.getLength());
dll.removeBackNode();
console.log(dll.displayData());
console.log(dll.getLength());
try {
  dll.removeFrontNode();
}
catch(e) {
  console.log(e);
}

for (let i = 0; i < 10; i++) {
  dll.addBackNode(i);
}
console.log(dll.displayData());

for (let i = 0; i < 10; i++) {
  dll.removeBackNode();
}
console.log(dll.displayData());

for (let i = 4; i > 0; i--) {
  dll.addBackNode(i);
}

dll.sortData();
assert.deepEqual(dll.displayData(), [1,2,3,4]);

const dll2 = new DoublyLinkedList();
for (let i = 0; i < 5; i++) {
  dll2.addBackNode(i);
}
dll2.sortData();
assert.deepEqual(dll2.displayData(), [0,1,2,3,4]);

const dll3 = new DoublyLinkedList();
for (let i = 0; i < 9; i++) {
  dll3.addBackNode(i);
  dll3.addFrontNode(i);
}
dll3.addBackNode(57);
console.log(dll3.displayData());
dll3.sortData();
console.log(dll3.displayData());
