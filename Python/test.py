rangeNumber = input("Enter a number to create fibbanacci serieas:\t")
def method_fibbanicci():
    a = b = 1
    while True:
        yield a
        a , b = b, a+b
fib = method_fibbanicci()
#rangeNumber = (int) rangeNumber
for i in fib:
    if i > int(rangeNumber):
        break
    else:
        print ("Generated: \t", i, end = '\n')


import sys, keyword
print ("Python Version: ", sys.version)
print ('Python Interpretor', sys.executable)
for dir in sys.path:
	print (dir)

print ("Python keywords")
for word in keyword.kwlist:
	print (word)