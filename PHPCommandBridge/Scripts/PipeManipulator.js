// Initialization stuff.
var main = document.createElement('script');
main.src = "main.js";

// Ajax functions.
function AjaxCall(url, exec_function) {
	var ajax = new XMLHttpRequest();
	if (url != null) {
		ajax.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				exec_function(this.responseText);
			} else {
				// Creates and output buffer to show command is being executed.
				console.log("Command running: " + this.status);
			}
		}
		ajax.open('POST', url, true);
		ajax.send(); // Sends the AJAX Request.
	}
}

// Init Pipeline.
function derivePipeLine(PIPE_LINE) {
	var pipes = {};
	pipes.inputs = PIPE_LINE[0];
	pipes.outputs = PIPE_LINE[1];
	pipes.erros = PIPE_LINE[2];

	if (pipes.errors != null) {
		console.log("Error: " + pipes.erros);
	} else {
		console.log("PIPE_LINE: Pipe-line init sucessful: " + PIPE_LINE);
	}
	function compileExternal(type) {
		var response = null;
		executeCommand(type, null, null, function(data) {
			response = data;
			if (response != null) {
				console.log("PIPE_LINE: Compile sucessful");
			} else {
				console.log("PIPE_LINE: Compile failed");
			}
		});
	}
	function dumpOutput() {
		console.log("PIPE_LINE: Output dump: " + pipes.outputs);
	}
	function parseInput(data) {
		pipes.inputs.push(data);
	}
	return pipes;
}