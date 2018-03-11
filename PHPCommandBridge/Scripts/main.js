
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
// Experimental AJAX Buffering for procedural outputs.
function AjaxBuffer(obj) {
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if (this.readyState == 4) {
			obj.success(this.responseText);
		} 
	};
	ajax.addEventListener('progress', function(oEvent) {
		obj.process((oEvent.loaded / oEvent.total) * 100);
	});
	ajax.open(obj.type, obj.url, true);
	ajax.send();
	return ajax;
}
function AjaxCall(url, exec_function) {
	var buffer = AjaxBuffer({
		type: 'GET',
		url: url,
		success: function(data) {
			exec_function(data);
		},
		process: function(data) {
			exec_function("<pre>Processing: " + (data) + "</pre>");
		},
	});
}
function editElementText(element, text) {
	document.getElementById(element).innerHTML = text;
}

/*
* Depricated functions
*/

function xhttpCall(url, exec_function) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState != 4) {
			exec_function("<pre>Processing: " + this.statusText + "</pre>");
		} else {
			exec_function(this.responseText);
		}
	}
	xhttp.open('GET', url, true);
	xhttp.send();
	
}
function fetchCall(url, exec_function) {
	fetch(url).then(function(data) {
		data.text().then(function(returnText) {
			exec_function(returnText);
		});
	});
}