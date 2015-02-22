from tkinter import *
import tkinter.messagebox as box
window = Tk();
window.title("Mail Reader")
def dialog() :
    var = box.askyesno("Scan mail box?", "Proceed?")
    if var == 1:
        box.showinfo("Scanning......!")
    else:
        box.showwarning("No Box", "Thank you")
btn = Button(window, text = "Scan", command = dialog)
btn.pack(padx = 50, pady = 50)
window.mainloop()