const DoublyLinkedList = require('./doubly-linked-list.js')


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
  dll.addFrontNode(i);
  dll.addBackNode(i);
}
console.log(dll.displayData());

for (let i = 0; i < 20; i++) {
  dll.removeBackNode();
}
console.log(dll.displayData());
