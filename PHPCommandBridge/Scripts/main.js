
function executeCommand(command, outElement = null, inputs = null, exec_function = null) {
	var logFile = "tmp/logs/user_logs.txt";
	var userCommand = command + "";
	if (exec_function != null) {
		AjaxCall('Processor.php?command=' + userCommand + '&' + 'input=', exec_function(this.responseText));	
	} else if (outElement != null) {
		AjaxCall('Processor.php?command=' + userCommand + '&' + 'input=', function(data) {
			editElementText(outElement, data);
		});
	} else {
		AjaxCall('Processor.php?command=' + userCommand + '&' + 'input=', function (data) {
			return data;
		});
	}
}
// Experimental AJAX Buffering for procedural outputs.
function ajax(obj) {
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if (this.readyState == 4) {
			obj.success(this.responseText);
		} else {
			obj.process('Executing...');
		}
	};
	ajax.addEventListener('progress', function(oEvent) {
		obj.process({
			total	: oEvent.total, 
			current	: oEvent.loaded,
			response: ajax.responseText,
		});
	});
	ajax.open(obj.type, obj.url, true);
	ajax.send();
	return ajax;
}
function updateSend(url, exec_function) {
	var index 	= 0;
	var prog 	= 0;
	ajax({
		type	: "POST",
		url 	: url,
		process : function (data) {
			index 	= data.total;
			prog 	= data.loaded;
			if (prog < index) {
				exec_function(data.response);
				updateSend(url, exec_function);
			} else {
				exec_function(data.response);
			}
		}
	});
}
function AjaxCall(url, exec_function) {
	ajax({
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