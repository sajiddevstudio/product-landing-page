<?php
if($_POST)
{
	$to_email   	= "ilmosys.inc@gmail.com"; //Recipient email, Replace with your own email.
	
	//check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
		
		$output = json_encode(array( //create JSON data
			'type'=>'error', 
			'text' => 'Sorry Request must be Ajax POST'
		));
		die($output); //exit script outputting json data
    } 
	
	//Sanitize input data using PHP filter_var().
	$first_name		= filter_var($_POST["first_name"], FILTER_SANITIZE_STRING);
	$last_name		= filter_var($_POST["last_name"], FILTER_SANITIZE_STRING);
	$user_email		= filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
	$phone_number	= filter_var($_POST["phone_number"], FILTER_SANITIZE_NUMBER_INT);
	$website		= filter_var($_POST["website"], FILTER_SANITIZE_STRING);
	$subject		= "New Visitor Details";
	
	//additional php validation
	if(strlen($first_name)<4){ // If length is less than 4 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
		die($output);
	}
	if(strlen($last_name)<4){ // If length is less than 4 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
		die($output);
	}
	if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
		$output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
		die($output);
	}
	if(!filter_var($phone_number, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in phone number field
		$output = json_encode(array('type'=>'error', 'text' => 'Enter only digits in phone number'));
		die($output);
	}
	if(strlen($website)<3){ //check emtpy website
		$output = json_encode(array('type'=>'error', 'text' => 'Too short website! Please enter something.'));
		die($output);
	}
	
	//email body
	$message_body = "From : ".$first_name."\r\nEmail : ".$user_email."\r\nPhone Number : (".$phone_number.")". $phone_number."\r\nWebsite: ".$website ;
	
	//proceed with PHP email.
	$headers = 'From: '.$first_name.'' . "\r\n" .
	'Reply-To: '.$user_email.'' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	
	$send_mail = mail($to_email, $subject, $message_body, $headers);
	
	if(!$send_mail)
	{
		//If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
		$output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
		die($output);
	}else{
		$output = json_encode(array('type'=>'message', 'text' => 'Hay '.$first_name .' !! Thanks for joining us.'));
		die($output);
	}
}
?>