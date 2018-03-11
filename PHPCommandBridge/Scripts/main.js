
function executeCommand(command, outElement = null, inputs = null, exec_function = null) {
	if (exec_function != null) {
		AjaxCall('Processor.php?command=' + command + '&' + 'input=', exec_function(this.responseText));	
	} else if (outElement != null) {
		AjaxCall('Processor.php?command=' + command + '&' + 'input=', function(data) {
			editElementText(outElement, data);
		});
	} else {
		AjaxCall('Processor.php?command=' + command + '&' + 'input=', function (data) {
			return data;
		});
	}
}
function AjaxCall(url, exec_function) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			exec_function(this.responseText);
		} else {
			// Creates and output buffer to show command is being executed.
			exec_function("<pre>Executing command...</pre>");
		}
	}
	xhttp.open('POST', url, true);
	xhttp.send(); // Sends the AJAX Request.
}
function editElementText(element, text) {
	document.getElementById(element).innerHTML = text;
}