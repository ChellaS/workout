from re import *

pattern = compile('(^py)')

def get_input():
    address = input("Enter any value: ")
    is_valid = pattern.match(address)
    if is_valid:
        print ("Entered value is valid", is_valid.group())
    else:
        print ("Entered value is invalid", is_valid.group())
get_input()