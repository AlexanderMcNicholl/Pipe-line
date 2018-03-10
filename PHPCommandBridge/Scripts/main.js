function executeCommand(command, outElement, inputs = null, exec_function = null) {
	if (exec_function != null) {
		AjaxCall('Processor.php?command=' + command + '&' + 'input=', exec_function(this.responseText));	
	} else {
		AjaxCall('Processor.php?command=' + command + '&' + 'input=', function(data) {
			editElementText(outElement, data);
		});
	}
}
function AjaxCall(url, exec_function) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			exec_function(this.responseText);
		} else {
			exec_function("Executing function...");
		}
	}
	xhttp.open('POST', url, true);
	xhttp.send();
}
function editElementText(element, text) {
	document.getElementById(element).innerHTML = text;
}