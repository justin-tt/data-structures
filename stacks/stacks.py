class ArrayStack:

    def __init__(self):
        self._data = []

    def __len__(self):
        return len(self._data)

    def is_empty(self):
        return len(self._data) == 0

    def push(self, e):
        self._data.append(e)

    def top(self):
        if self.is_empty():
            raise Empty('Stack is empty')
        return self._data[-1]

    def pop(self):
        if self.is_empty():
            raise Empty('Stack is empty')
        return self._data.pop()


if __name__ == "__main__":
    S = ArrayStack()
    S.push(5)
    assert(S.top() == 5)
    S.push(3)
    assert(S.top() == 3)
    assert(S.pop() == 3)
    assert(S.top() == 5)
    assert(len(S) == 1)
