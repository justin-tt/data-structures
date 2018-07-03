from positionallist import PositionalList

pl = PositionalList()

pl.add_first(1)
pl.add_last(9)
pl.add_before(pl.last(), 8)
pl.add_before(pl.last(), 7)
assert(pl.last().element() == 9)
pl.delete(pl.last())
assert(pl.last().element() == 7)
for i in pl:
    print(i)
pl.insertion_sort()
for i in pl:
    print(i)
