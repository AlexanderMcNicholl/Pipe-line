
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
	xhttp.responseType = 'text';
	xhttp.onload = function () {
			exec_function(this.responseText);
	}
	xhttp.open('GET', url, true);
	xhttp.send(); // Sends the AJAX Request.
	
}
function fetchCall(url, exec_function) {
	fetch(url).then(function(data) {
		data.text().then(function(returnText) {
			exec_function(returnText);
		});
	});
}
function editElementText(element, text) {
	document.getElementById(element).innerHTML = text;
}