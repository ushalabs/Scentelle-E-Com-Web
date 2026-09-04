<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/../config/db.php';

$data = read_json_input();
require_fields($data, ['name', 'email', 'subject', 'message']);

$name = trim((string) $data['name']);
$email = strtolower(trim((string) $data['email']));
$subject = trim((string) $data['subject']);
$message = trim((string) $data['message']);

if (!valid_email($email)) {
    respond(false, 'Please enter a valid email address.', [], 422);
}

$stmt = $conn->prepare('INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)');
$stmt->bind_param('ssss', $name, $email, $subject, $message);

if (!$stmt->execute()) {
    respond(false, 'Unable to send message.', [], 500);
}

respond(true, 'Message sent successfully.', [], 201);
?>
