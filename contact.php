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
    $log_file = __DIR__ . "/logs/error_log.txt"; // Need to change path
    
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($log_file, "[$timestamp] $message\n", FILE_APPEND);
}

// Sanitize the input data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $formType = $_POST['form-type'];  // Identify which form was submitted

    // Process the contact form
    if ($formType == "contact") {
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

        // Send email for contact form
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // GoDaddy SMTP server
            $mail->Port = 587;
            $mail->SMTPAuth = true;
            $mail->Username = '';
            $mail->Password = ''; // Use an app-specific password for Gmail
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

            // Recipients
            $mail->setFrom('', 'TESTING'); // GoDaddy sender email (contact@domain)
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
            logError("Email sent successfully from $email");

        } catch (Exception $e) {
            echo "There was a problem sending your message. Please try again later.";
            logError("Failed to send email: " . $mail->ErrorInfo);
        }
    }

    // Process the application form
    if ($formType == "application") {
        $jobTitle = htmlspecialchars(trim($_POST['job-title']));
        $jobLocation = htmlspecialchars(trim($_POST['job-location']));
        $fullName = htmlspecialchars(trim($_POST['full-name']));
        $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
        $phone = htmlspecialchars(trim($_POST['phone']));
        $experienceSummary = htmlspecialchars(trim($_POST['experience-summary']));
        $race = htmlspecialchars(trim($_POST['race'])) ?: 'not specified';
        $gender = htmlspecialchars(trim($_POST['gender'])) ?: 'not specified';
        $resume = $_FILES['resume'];  // Handle file upload

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Invalid email format";
            logError("Invalid email attempt: $email");
            exit();
        }
        // Validate the uploaded file type (only .pdf and .docx)
        $allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        $fileMimeType = mime_content_type($resume['tmp_name']);
        $fileExtension = strtolower(pathinfo($resume['name'], PATHINFO_EXTENSION));

        if (!in_array($fileMimeType, $allowedFileTypes) || !in_array($fileExtension, ['pdf', 'docx'])) {
            echo "Only .pdf and .docx files are allowed.";
            logError("Invalid file type uploaded: $fileMimeType");
            exit();
        }

        // Check if any input fields are empty
        if (empty($fullName) || empty($email) || empty($phone) || empty($resume)) {
            echo "All fields are required";
            logError("Empty field submission attempt");
            exit();
        }

        // Send email for application form
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // GoDaddy SMTP server
            $mail->Port = 587;
            $mail->SMTPAuth = true;
            $mail->Username = 'sean.t.carrigan@gmail.com';
            $mail->Password = 'twtm jbed sozc lmvv'; // app-specific password for Gmail *remove*
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

            // Recipients
            $mail->setFrom('sean.t.carrigan@gmail.com', 'TESTING'); // GoDaddy sender email (contact@domain)
            $mail->addAddress('sean.t.carrigan@gmail.com'); // Add recipient email address
            $mail->addReplyTo($email, $fullName);

            // Attach the resume
            $mail->addAttachment($resume['tmp_name'], $resume['name']);

            // Content
            $mail->isHTML(false); // Set email format to plain text
            $mail->Subject = "New job application for the $jobTitle position.";
            $mail->Body    = "You have a new job application from your website.\n\n";
            $mail->Body   .= "Name: $fullName\n";
            $mail->Body   .= "Email: $email\n";
            $mail->Body   .= "Phone: $phone\n";
            $mail->Body   .= "Location: $jobLocation\n";
            $mail->Body   .= "Experience Summary: $experienceSummary\n";
            $mail->Body   .= "Race/Ethnicity: $race\n";
            $mail->Body   .= "Gender: $gender\n";

            $mail->send();
            echo "success";
            logError("Job application sent successfully from $email");

        } catch (Exception $e) {
            echo "There was a problem sending your application. Please try again later.";
            logError("Failed to send application email: " . $mail->ErrorInfo);
        }
    }
}
?>