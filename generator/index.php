<?php 
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: GET,POST');
	header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );

	try {
		$data = json_decode(file_get_contents("php://input"));
		if(!isset($data)){
			die("{'status':'NOK'}");
		}
		$inputs;
		$vars;
		$body;
		foreach ($data->inputs as &$input) {
			$required = "";
			if($input->requerido == "true"){
				$required = " required ";
			}
			$label = "<label>$input->label</label>";
			$placeholder = "";
			if($input->placeholder == "true"){
				$placeholder = " placeholder=\"$input->label\"";
				$label = "";
			}
			$id = strtolower($input->id);
			if($input->type === "text" || $input->type === "email" || $input->type === "number" || $input->type === "date" || $input->type === "password" || $input->type === "file"){
				$inputs .= "\t$label<p><input type=\"$input->type\" name=\"$id\" $placeholder $required /></p>\n";
			}elseif($input->type === "textarea"){
				$inputs .= "\t$label<p><textarea name=\"$id\" $placeholder $required></textarea></p>\n";
			}elseif($input->type === "select"){
				$select = "\t<label>$input->label</label><br>\n";
				$select .= "\t<select name=\"$id\" $required>\n";
				$select .= "\t\t<option value=\"\" hidden selected>Seleccione...</option>\n";
				foreach ($input->options as &$option) {
					$select .= "\t\t<option value=\"$option->value\">$option->label</option>\n";
				}
				$select .= "\t</select>\n";
				$inputs .=	$select;		
			}elseif($input->type === "radio"){
				$radio = "\t<label>$input->label</label><br>\n";
				foreach ($input->options as &$option) {
					$radio .= "\t<input type=\"$input->type\" name=\"$id\" value=\"$option->value\" $required /><label>$option->label</label>\n";
				}
				$inputs .=	$radio;
			}elseif($input->type === "checkbox"){
				$checks = "\t<label>$input->label</label><br>\n";
				foreach ($input->options as &$option) {
					$idc = $id."[]";
					$checks .= "\t<input type=\"$input->type\" name=\"$idc\" value=\"$option->value\" $required /><label>$option->label</label>\n";
				}
				$inputs .=	$checks;
			}
			if($input->type != "file"){
				$vars .= "\t\$$id = trim(\$_POST['$id']);\n";
				$body .= "\t\$msg .= \"<p><strong>$input->label:</strong> \$$id </p>\";\n";	
			}
		}

		$formhtml = file_get_contents('form.html');

		$formhtml = str_replace("{name}", strtolower($data->name),$formhtml);
		$multipart = "";

		if($data->multi == "true"){
			$multipart = " enctype=\"multipart/form-data\" ";
		}

		$formhtml = str_replace("{multi}", $multipart,$formhtml);

		$formhtml = str_replace("{inputs}", $inputs,$formhtml);

		$js = file_get_contents('form.js');
		$js = str_replace("{name}", strtolower($data->name),$js);

		$destinations;
		foreach ($data->destinations as &$destination) {
			if($destination->type === "from"){
				$destinations .= "\t\$mail->AddAddress('$destination->email','$destination->name');\n";
			}elseif($destination->type === "cc"){
				$destinations .= "\t\$mail->AddCC('$destination->name','$destination->email');\n";
			}elseif($destination->type === "cco"){
				$destinations .= "\t\$mail->AddCCO('$destination->name','$destination->email');\n";
			}	
		}

		$php = file_get_contents('sendMail.php');
		$php = str_replace("{vars}", $vars,$php);
		$php = str_replace("{body}", $body,$php);
		$php = str_replace("{host}", $data->smtp->host,$php);
		$php = str_replace("{user}", $data->smtp->user,$php);
		$php = str_replace("{pass}", $data->smtp->password,$php);
		$php = str_replace("{subject}", $data->subject,$php);
		$php = str_replace("{destinations}", $destinations,$php);
		$php = str_replace("{ok}", $data->messages->success,$php);
		$php = str_replace("{error}", $data->messages->fail,$php);

		$zip = new ZipArchive;
		$filename = uniqid('form_');
		if ($zip->open("out/".$filename.".zip", ZipArchive::CREATE) === TRUE)
		{
		    $zip->addFromString('form.html', $formhtml);
		    $zip->addFromString('js/form.js', $js);
		    $zip->addFromString('sendMail.php', $php);
		    $zip->addFile('Instrucciones.pdf');
		    $zip->addFile('includes/class.smtp.php');
		    $zip->addFile('includes/class.pop3.php');
		    $zip->addFile('includes/class.phpmailer.php');
		    $zip->close();
		}
		
		echo json_encode(array("status"=>"OK","file"=>$filename,"error"=>""));

	}catch (Exception $e) {

		echo json_encode(array("status"=>"NOK","file"=>"","error"=>$e->getMessage()));
		
	}
?>