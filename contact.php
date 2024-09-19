<?php
// Setup for using PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require "vendor/phpmailer/phpmailer/src/Exception.php";
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

// Function to log errors
function logError($message) {
    $log_file = $log_file = __DIR__ . "/logs/error_log.txt"; // Need to change path
    
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($log_file, "[$timestamp] $message\n", FILE_APPEND);
}

// Sanitize the input data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    // Check if email is valid
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        logError("Invalid email attempt: $email");
        exit();
    }

    // Check if any input fields are empty
    if (empty($name) || empty($email) || empty($message)) {
        echo "All fields are required";
        logError("Empty field submission attempt");
        exit();
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtpout.secureserver.net'; // GoDaddy SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'development@longviewinfra.com'; // GoDaddy sender email (contact@domain)
        $mail->Password   = 'TakeTheLongViewISO!'; // GoDaddy sender password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('development@longviewinfra.com', 'Development'); // GoDaddy sender email (contact@domain)
        $mail->addAddress('sean.t.carrigan@gmail.com'); // Add a recipient email address

        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(false); // Set email format to plain text
        $mail->Subject = "New message from $name";
        $mail->Body    = "You have a new message from your website contact form.\n\n";
        $mail->Body   .= "Name: $name\n";
        $mail->Body   .= "Email: $email\n";
        $mail->Body   .= "Message: $message";

        $mail->send();
        echo "success";
        logError("Email sent successfully to development@longviewinfra.com from $email"); // Need to change email
    
    } catch (Exception $e) {
        echo "There was a problem sending your message. <br> Please try again later.";
        logError("Failed to send email: " . $mail->ErrorInfo);
    }
}
?>