class _DoublyLinkedBase:

    class _Node:
        """Lightweight, non public class for storing a doubly linked node"""
        __slots__ = '_element', '_prev', '_next' # streamline memory

        def __init__(self, element, prev, next): 
            self._element = element
            self._prev = prev
            self._next = next

    def __init__(self):
        """Create an empty list"""
        self._header = self._Node(None, None, None) # sentinel
        self._trailer = self._Node(None, None, None) # sentinel
        self._header._next = self._trailer
        self._trailer._prev = self._header
        self._size = 0
    
    def __len__(self):
        return self._size
    
    def is_empty(self):
        return self._size == 0

    def _insert_between(self, e, predecessor, successor):
        """Add element e between two existing nodes and return new node"""
        newest = self._Node(e, predecessor, successor)
        predecessor._next = newest
        successor._prev = newest
        self._size += 1
        return newest

    def _delete_node(self, node):
        """Delete non sentinel node from the list and return its element"""
        predecessor = node._prev
        successor = node._next
        predecessor._next = successor
        successor._prev = predecessor
        self._size -= 1
        element = node._element
        node._prev = node._next = node._element = None
        return element
