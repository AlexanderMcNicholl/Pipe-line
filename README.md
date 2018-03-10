# Pipe-line
A repo for executing client commands on the server side.

# Usage
Pipe-line can be used by simply including the php file and scripts folder in your projects root directory.
Pipe-line comes with a basic index.html file for testing its functionality. it allows its user to type in a command and watch it get executed on the server side operating system.
to run a Pipe-line command, simply use:

```
executeCommand(command, outElement, inputs = null);
```
This will execute the entered command and dump the output to the element with the id of outElement.

# Release notes
* Pipe-line initial commit.
