function executeCommand(command, outElement, inputs = null, exec_function = null) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (exec_function != null) {
				exec_function(this.responseText);
			} else {
				document.getElementById(outElement).innerHTML = this.responseText;
			}
		}
	};
	xhttp.open('POST', 'Processor.php?command=' + command + '&' + 'input=' + inputs, true);
	xhttp.send();
}