<?php

	if (!isset($_POST)){
		die();
	}

	include('includes/class.phpmailer.php');

{vars}

	$mail = new PHPMailer();

	$mail->isSMTP();    // Si el envío no anda probar cambiar "isSMTP" por "isMail"
	$mail->Host = "{host}";
	$mail->SMTPAuth = true;
	$mail->Username = "{user}";
	$mail->Password = "{pass}";
	
	$msg;
{body}
    
	$mail->IsHTML(true);
	$mail->CharSet = 'UTF-8';
	$mail->Subject	= '{subject}';
	$mail->Body = $msg;
	$mail->From = "{user}";

	//Si hay que adjuntar archivos:
	if (isset($_FILES)) {
		foreach($_FILES as $file){
		   $mail->addattachment($file['tmp_name'],$file['name']);
		}
	}

	if (isset($nombre)) {
		$mail->FromName = $nombre;
	}else{
		$mail->FromName = "Contacto Web";
	}
	if (isset($email)) {
		$mail->AddReplyTo($email);
	}
{destinations}

	if($mail->Send()){
		echo '{"status":"ok","msg":"{ok}"}';
	}else{
		echo '{"status":"nok","msg":"{error}"}';
	}

?>