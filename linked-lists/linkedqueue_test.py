from linkedqueue import LinkedQueue

queue = LinkedQueue()
queue.enqueue(3)
queue.enqueue(4)
assert(queue.dequeue() == 3)
assert(queue.dequeue() == 4)
queue.dequeue()
