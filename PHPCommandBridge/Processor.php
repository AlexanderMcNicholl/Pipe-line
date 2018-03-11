<?php 
function userInput($input, $procPipes) {
	fwrite($procPipes[0], $input); // Writes user input.
	if ($input !== "") {
		fwrite($procPipes[0], "\n"); // Writes a new line pipe to the user can have multiple inputs.
	}
}
function closeProcess($procPipes, $process) { //DO NOT FORGET TO CLOSE PROCESS!
	fclose($procPipes[1]);
	$return_value = proc_close($process);
	echo "\nprocess executed exit value of $return_value\n";
}
// This function ques the process to be executing when ready.
function queProcess($cmd, $input='') {
	$descriptorspec = array(
		// The first pipes is the input for the I/O stream. (stdin)
		0 => array("pipe", "r"), 
		// The second pipe is the output for the I/O stream. (stdout) 
		1 => array("pipe", "w"), 
		// The last pipe is the error for the I/O stream. (stderr)
		2 => array("file", "tmp/error_log/error-output.txt", "a") 
	);
	flush(); // <= Flush any buffers.
	// This will start the process and open an I/O stream.
	$process = proc_open($cmd, $descriptorspec, $pipes);
	echo '<pre>'; // The pre tags keeps the outputs in the original formatting.
	if (is_resource($process)) { // This checks if it is a resource.
		//Start user inputs.
		userInput($input, $pipes); // This writes data (fwrite) into pipe[0] (stdin).
		//End user inputs.
		fclose($pipes[0]); // This closes the input pipes, data can no longer be writting to pipe[0].
		echo stream_get_contents($pipes[1]); // This dumps the process's output.
		closeProcess($pipes, $process);	 // This will finally close the process and all of the I/O pipes.
	}
	echo '</pre>'; // This ends the pre tag.
}
function bufferProcess($cmd) {
	while (@ ob_end_flush());
	$proc = popen($cmd, 'r');
	echo '<pre>';
	while (!feof($proc))
	{
	    echo fread($proc, 4096);
	    @ flush();
	}
	echo '</pre>';
}
$command = $_REQUEST['command']; // Retrieving data from AJAX call. <= The command to be executed.
$inputs = $_REQUEST['input']; // <= The user response to command. E.G. a readlines call.
bufferProcess($command); // This will que to the process to be executed. 

/*
* DEPRICATED METHODS

*/
?>