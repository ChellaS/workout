chars = ["One", "Two", "Three", "Four"]
def display(elam):
    assert type(elam) is int, "Elam Must be an Interger!"
    print (chars[elam], end=" ")

elam = 2
elam = elam / 2
display(elam)