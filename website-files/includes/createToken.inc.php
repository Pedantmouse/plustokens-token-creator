
<?php
//require '../PHPMailer/PHPMailerAutoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require '../../../PHPMailer-6.0/src/PHPMailer.php';
require '../../../PHPMailer-6.0/src/SMTP.php';
require '../../../PHPMailer-6.0/src/Exception.php';
//if submit has been pressed
if(isset($_POST["tokenSubmit"]) == true)
{
        //this company name
		$companyName = "+tokens";
        $mailer = 'YOUR SENDER EMAIL';
		$txHash = (isset($_POST["txHash"]) ? $_POST["txHash"] : null);
		$tokenName = (isset($_POST["tokenName"]) ? $_POST["tokenName"] : null);
		$tokenSymbol = (isset($_POST["tokenSymbol"]) ? $_POST["tokenSymbol"] : null);
		$tokenSupply = (isset($_POST["tokenSupply"]) ? $_POST["tokenSupply"] : null);
		$tokenDecimals = (isset($_POST["tokenDecimals"]) ? $_POST["tokenDecimals"] : null);
		$devDonation = (isset($_POST["devDonation"]) ? $_POST["devDonation"] : null);
        $email = (isset($_POST["email"]) ? $_POST["email"] : null);
		$subject = $companyName. ' - New Token';
        $body= "<h1>A new Token created with ".$companyName."</h1>Token Name - ". $tokenName ."<br><br>Token Symbol - " . $tokenSymbol . "<br><br>Token Supply - " . $tokenSupply . "<br><br>Token Decimals - " . $tokenDecimals . "<br><br>Developer Donation % = " . $devDonation . '<p><a href="https://etherscan.io/tx/' . $txHash . '">Transaction Hash - See here on Etherscan.io</a></p>';
		$bodyhtml="A new Token created with ".$companyName." / Token Name - ". $tokenName . " / Token Symbol - " . $tokenSymbol . " / Token Supply - ". $tokenSupply . " / Token Decimals - " . $tokenDecimals . " / Developer Donation % = " . $devDonation . ' / Transaction hash, search this on https://etherscan.io - ' . $txHash;
		Mailer($companyName, $mailer, $email, $txHash, $tokenName, $tokenSupply, $tokenSymbol, $tokenDecimals, $devDonation, $subject, $body, $bodyhtml);
}
else{
	header("Location: ../index.php");
	exit();
	}

 //mail function
function Mailer($companyName, $mailer, $email, $txHash, $tokenName, $tokenSupply, $tokenSymbol, $tokenDecimals, $devDonation, $subject, $body, $bodyhtml)
{
$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = '';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = $mailer;                 // SMTP username
$mail->Password = 'YOUR SENDER PASSWORD';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to

$mail->setFrom($mailer, $companyName); // Mailer
$mail->addAddress($mailer, 'New Token - '. $tokenName);     // Add a recipient
//$mail->addAddress('email', 'name');   // Name is optional
$mail->addReplyTo($email, $tokenName);
$mail->addCC('');
$mail->addBCC('');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'optionalname.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $subject;
$mail->Body    = $body;
$mail->AltBody = $bodyhtml;

//send myself the enquiry
if(!$mail->send()) {
header("Location: ../index.php?mail=failed&tx_hash=" . $txHash . "#tokenForm");
exit();
} 
else 
{
	if(!$email == "")
	{
		 echo($email);
		//prep email to user
		$body = '<h1>You created a new ERC-20 token with ' . $companyName . '!</h1>Token Name - '. $tokenName .'<br><br>Token Symbol - ' . $tokenSymbol . '<br><br>Token Supply - ' . $tokenSupply . '<br><br>Token Decimals - ' . $tokenDecimals . '<br><br>Developer Donation % = ' . $devDonation . '<p><a href="https://etherscan.io/tx/' . $txHash . '">Transaction Hash - See here on Etherscan.io</a></p>';
		$bodyhtml= 'You created a new ERC-20 token! / Token Name - '. $tokenName . ' / Token Symbol - ' . $tokenSymbol . ' / Token Supply - '. $tokenSupply . ' / Token Decimals - ' . $tokenDecimals . ' / Developer Donation % = ' . $devDonation . ' / Transaction Hash, search on https://etherscan.io - ' . $txHash;
		$subject = $tokenName. ' - Created Successfully!';
		$mail->ClearAddresses();
		$mail->ClearReplyTos();
		$mail->setFrom($mailer, $companyName);
		$mail->addAddress($email, $tokenName);     // Add a recipient
		$mail->addReplyTo($mailer, $companyName);
		$mail->Subject = $subject;
		$mail->Body    = $body;
		$mail->AltBody = $bodyhtml;
		//send user acknowledgement
		if(!$mail->send()){
		header("Location: ../index.php?mail=failed&tx_hash=" . $txHash . "#tokenForm");
		exit();
		}
		else{
		//mail sent to user
		header("Location: ../index.php?token_create=success&tx_hash=" . $txHash . "#tokenForm");
		exit();
		}
	}
	else{
		header("Location: ../index.php?token_create=success&tx_hash=" . $txHash . "#tokenForm");
		exit();
	}
}
}//end of function
?>