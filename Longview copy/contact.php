<?php
// Code for sending email from contact form

// Function to log errors
function logError($message) {
    $log_file = 'error_log.txt';
    file_put_contents($log_file, $message . "\n", FILE_APPEND);
}

// Sanitize the input data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    // Check if email is valid
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit();
    }

    // Check if any input fields are empty
    if (empty($name) || empty($email) || empty($message)) {
        echo "All fields are required";
        exit();
    }

    // Format the email message
    $to = "sean.t.carrigan@gmail.com";
    $subject = "New message from $name";
    $body = "You have a new message from your website contact form.\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message: $message";

    // Headers to prevent email spoofing and specify the reply address
    $headers = "From: " . filter_var($email, FILTER_SANITIZE_EMAIL) . "\r\n";
    $headers .= "Reply-To: " . filter_var($email, FILTER_SANITIZE_EMAIL) . "\r\n";

    // Determine if we're in a development environment
    $is_development = false; // Set this to false when deploying to production

    if ($is_development) {
        // For development: Use a local SMTP server or write to a file
        $log_file = 'email_log.txt';
        $log_message = "To: $to\nSubject: $subject\n$body\n\n";
        file_put_contents($log_file, $log_message, FILE_APPEND);
        echo "Email logged for development (check email_log.txt)";
    } else {
        // For production: Use the actual mail() function
        if (mail($to, $subject, $body, $headers)) {
            echo "success";
        } else {
            echo "There was a problem sending your message";
        }
    }
}
?>