import sys
from cx_Freeze import setup, Executable
base = None
if sys.platform == 'win64': base = 'Win64GUI'
opts = {'includes': ['re']}
setup(
    name = 'Chella',
    version = '0.1',
    options = {'build_exe': opts},
    executables = [Executable('standAloneTest.py', base= base)])
