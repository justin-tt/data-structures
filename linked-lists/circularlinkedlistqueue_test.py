from circularlinkedlistqueue import CircularQueue

cq = CircularQueue()
cq.enqueue(3)
assert(len(cq) == 1)
cq.enqueue(4)
cq.enqueue(5)
cq.rotate()
assert(cq.dequeue() == 4)
assert(cq.dequeue() == 5)
assert(cq.dequeue() == 3)
