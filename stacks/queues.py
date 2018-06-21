class ArrayQueue:
    """
    FIFO Queue implementation using a circular Python list
    """

    DEFAULT_CAPACITY = 10

    def __init__(self):
        self._data = [None] * ArrayQueue.DEFAULT_CAPACITY
        self._size = 0
        self._front = 0

    def __len__(self):
        return self._size

    def __str__(self):
        return str(self._data)
    
    def is_empty(self):
        return self._size == 0

    def first(self):
        if self.is_empty():
            raise Empty('Queue is empty')
        return self._data[self._front]

    def dequeue(self):
        if self.is_empty():
            raise Empty('Queue is empty')
        answer = self._data[self._front]
        self._data[self._front] = None
        self._front = (self._front + 1) % len(self._data)
        self._size -= 1
        if 0 < self._size < len(self._data) // 4:
            self._resize(len(self._data) // 2)
        return answer

    def enqueue(self, e):
        if self._size == len(self._data):
            self._resize(2 * len(self._data))
        # hard to read because resizing causes the elements
        # to go back to the front, whereas it could be a list
        # that hasn't resized

        # enqueuing at the end of the queue, is front position plus size of the queue
        avail = (self._front + self._size) % len(self._data)
        self._data[avail] = e
        self._size += 1

    def _resize(self, capacity):
        old = self._data
        self._data = [None] * capacity
        walk = self._front
        for k in range(self._size):
            self._data[k] = old[walk]
            walk = (1 + walk) % len(old)
        self._front = 0


class ArrayDequeue(ArrayQueue):
    
    def __init__(self):
        super().__init__()
        self._back = -1
        
    def last(self):
        if self.is_empty():
            raise Empty('Queue is empty')
        return self._data[self._back]

    def add_end(self, e):
        super().enqueue(e)
        self._back = (self._back + 1) % len(self._data)

    def delete_front(self):
        super().dequeue()
        
    def add_front(self, e):
        if self._size == len(self._data):
            self._resize(2 * len(self._data))
        # need to rewrite this more elegantly
        # with more readable functions above
        print(self._back, self._size)
        avail = (self._back - self._size) % len(self._data)
        self._data[avail] = e
        self._size += 1
        self._front = avail

    def delete_end(self):
        if self.is_empty():
            raise Empty('Queue is empty')
        answer = self._data[self._back]
        self._data[self._back] = None
        self._back = (self._back - 1) % len(self._data)
        self._size -= 1
        if 0 < self._size < len(self._data) // 4:
            self._resize(len(self._data) // 2)
        return answer

    def _resize(self, capacity):
        super()._resize(capacity)
        self._back = self._size - 1

if __name__ == "__main__":
    Q = ArrayQueue()
    Q.enqueue(5)
    assert(Q.first() == 5)
    Q.enqueue(3)
    Q.dequeue()
    assert(Q.first() == 3)
    assert(Q.is_empty() == False)
    Q.dequeue()
    assert(Q.is_empty() == True)
    assert(len(Q) == 0)
    Q.enqueue(3)
    assert(len(Q) == 1)
    for i in range(1000):
        Q.enqueue(i)
    print(Q)
    for i in range(1000):
        Q.dequeue()
    
    print(Q)

    R = ArrayDequeue()
    R.add_end(1)
    R.add_end(2)
    print(R)
    R.add_front(3)
    print(R)
    R.add_front(4)
    print(R)
    R.delete_front()
    print(R)
    R.delete_end()
    print(R)
    for i in range(10):
        R.add_end(i)
        print(R, R._back)
    print("END")
    for i in range(10):
        R.add_front(i)
        print(R)
    assert(R.first() == 9)
    assert(R.last() == 9)
    for i in range(9):
        R.delete_front()
        R.delete_end()
    print(R)
    assert(R.first() == 0)
    assert(R.last() == 0)
