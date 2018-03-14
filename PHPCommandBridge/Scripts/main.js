
function executeCommand(command, outElement = null, inputs = null, exec_function = null) {
	var logFile = "tmp/logs/user_logs.txt";
	var userCommand = command;
	if (inputs != null) {
		userCommand = "'" + command + " | " + inputs + "'";
	}
	if (exec_function != null) {
		updateSend('Processor.php', {
			command: userCommand, input: ''
		}, exec_function(data));	
	} else if (outElement != null) {
		updateSend('Processor.php', {
			command: userCommand, input: ''
		}, function (data) {
			editElementText(outElement, data);
		});
	} else {
		updateSend('Processor.php', {
			command: userCommand, input: ''
		}, function (data) {
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
	var uri;
	if (obj.data != null) {
		var EncodedJSONString = encodeURIComponent(JSON.stringify(obj.data));
		var js = "?json=" + EncodedJSONString;
		uri = (obj.url + js);
	} else {
		uri = obj.url;
	}
	ajax.open(obj.type, uri, true);
	ajax.send();
	return ajax;
}
function updateSend(url, data, exec_function) {
	var index = 0;
	var prog = 0;
	ajax({
		type: "POST",
		url: url,
		data: data,
		process: function (data) {
			exec_function(data.response);
		}
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