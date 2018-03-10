function executeCommand(command, outElement, inputs=null) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById(outElement).innerHTML = this.responseText;
		}
	};
	xhttp.open('POST', 'Processor.php?command=' + command, true);
	xhttp.send();
}