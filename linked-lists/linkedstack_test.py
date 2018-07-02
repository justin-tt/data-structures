from linkedstack import LinkedStack

stack = LinkedStack()

stack.push(3)
assert(len(stack) == 1)
assert(stack.pop() == 3)
assert(len(stack) == 0)
