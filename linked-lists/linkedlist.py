class LinkedListNode:
    
    def __init__(self, data):
        self.data = data
        self.next = None

    def __str__(self):
        return f"Data: {self.data}, Next: {self.get_next().data if self.get_next() else None}"

    def insert_between_next(self, node):
        if self.next:
            node.insert_between_next(self.next)
        self.next = node

    def get_next(self):
        return self.next if self.next else None

    def iterate_to_end(self):
        print(self.__str__())
        if self.next:
            self.next.iterate_to_end()

class DoublyLinkedListNode(LinkedListNode):

    def __init__(self, data):
        super().__init__(data)
        self.prev = None

    def __str__(self):
        return f"Data: {self.data}, Next: {self.get_next().data if self.get_next() else None}, Prev: {self.get_prev().data if self.get_prev() else None}"

    def insert_between_next(self, node):
        node.prev = self
        if self.next:
            node.insert_between_next(self.next)
        self.next = node

    def insert_between_prev(self, node):
        node.next = self
        if self.prev:
            node.insert_between_prev(self.prev)
        self.prev = node

    def get_prev(self):
        return self.prev if self.prev else None

    def iterate_to_start(self):
        print(self.__str__())
        if self.prev:
            self.prev.iterate_to_end()

    def remove(self):
        if self.next:
            self.next.prev = self.prev if self.prev else None
        if self.prev:
            self.prev.next = self.next if self.next else None


# Cannot add an index property to the LinkedList
# Doing so would cause this index to have to propagate throughout
# and update when items are added in to the LinkedList,
# Slowing it down


node1 = LinkedListNode([1])
node2 = LinkedListNode(2)
node3 = LinkedListNode("3")
node4 = LinkedListNode(4)
print(node1)
print(node2)
print(node3)
node1.insert_between_next(node2)
print(node1)
node1.insert_between_next(node3)
print(node1)
print(node1.get_next())
print(node1.get_next().get_next())
print(node1.get_next().get_next().get_next())
print(node2)
node2.insert_between_next(node4)
print(node2)
node1.iterate_to_end()
node5 = DoublyLinkedListNode(5)
node6 = LinkedListNode(6)
node5.insert_between_next(node6)
node4.insert_between_next(node5)
node1.iterate_to_end()
# Trying to be conscious of Liskov's substitution principle
# a DLL should work like a LL


dnode1 = DoublyLinkedListNode("one")
dnode2 = DoublyLinkedListNode("two")
dnode3 = DoublyLinkedListNode("three")
dnode4 = DoublyLinkedListNode("four")
dnode5 = DoublyLinkedListNode("five")

dnode1.insert_between_next(dnode2)
dnode2.insert_between_next(dnode3)
dnode2.insert_between_next(dnode4)
# O(1) insertion times
dnode4.insert_between_prev(dnode5)
dnode1.iterate_to_end()
dnode5.remove()
dnode1.iterate_to_end()
dnode3.remove()
dnode1.remove()
dnode2.iterate_to_end()

# instead of micromanaging these nodes
# let's have a list structure that knows where the start and end is at all times
# can traverse to specific places to add/delete stuff


# can inherit and subclass a doubly linked list
