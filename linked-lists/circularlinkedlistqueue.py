from empty import Empty

class CircularQueue:
    """Queue implementation using circularly linked list for storage."""

    class _Node:
        """Lightweight, nonpublic class for storing a singly linked node."""
        __slots__ = '_element', '_next' # streamline memory usage

        def __init__(self, element, next):
            self._element = element
            self._next = next

    def __init__(self):
        self._tail = None
        self._size = 0

    def __len__(self):
        return self._size

    def is_empty(self):
        return self._size == 0

    def first(self):
        if self.is_empty():
            raise Empty('Queue is empty')
        head = self._tail._next
        return head._element

    def dequeue(self):
        if self.is_empty():
            raise Empty('Queue is empty')
        oldhead = self._tail._next
        if self._size == 1:
            self._tail = None
        else:
            self._tail._next = oldhead._next
        self._size -= 1
        return oldhead._element

    def enqueue(self, e):
        """Add an element to the back of the queue"""
        newest = self._Node(e, None)
        if self.is_empty():
            newest._next = newest # initialize circularly
        else:
            newest._next = self._tail._next # new node points to head
            self._tail._next = newest # old tail points to new node
        self._tail = newest # new node becomes the tail
        self._size += 1

    def rotate(self):
        """Rotate front element to the back of the queue"""
        if self._size > 0:
            self._tail = self._tail._next
