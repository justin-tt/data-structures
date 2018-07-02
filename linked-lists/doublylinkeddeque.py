from doublylinkedlistbase import _DoublyLinkedBase

class LinkedDeque(_DoublyLinkedBase):
    """Double-ended queue implementation based on a doubly linked list."""

    def first(self):
        """Return (but do not remove) the element at the front of the deque"""
        if self.is_empty():
            raise Empty("Deque is empty")
        return self._header._next._element # real item just after header sentinel

    def last(self):
        """Return (but do not remove) the element at the back of the deque"""
        if self.is_empty():
            raise Empty("Deque is empty")
        return self._trailer._prev._element # real item just before trailer sentinel

    def insert_first(self, e):
        """Add an element to the front of the deque"""
        self._insert_between(e, self._header, self._header._next)

    def insert_last(self, e):
        """Add an element to the back of the deque"""
        self._insert_between(e, self._trailer._prev, self._trailer)

    def delete_first(self):
        """Remove and return the element from the front of the deque"""
        if self.is_empty():
            raise Empty("Deque is empty")
        return self._delete_node(self._header._next)

    def delete_last(self):
        """Remove and return the element from the back of the deque"""
        if self.is_empty():
            raise Empty("Deque is empty")
        return self._delete_node(self._trailer._prev)
