<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/../config/db.php';

$data = read_json_input();
require_fields($data, ['email']);

$email = strtolower(trim((string) $data['email']));
if (!valid_email($email)) {
    respond(false, 'Please enter a valid email address.', [], 422);
}

$stmt = $conn->prepare('INSERT INTO newsletter_subscribers (email) VALUES (?)');
$stmt->bind_param('s', $email);

if (!$stmt->execute()) {
    if ($conn->errno === 1062) {
        respond(true, 'You are already subscribed.');
    }
    respond(false, 'Unable to save subscription.', [], 500);
}

respond(true, 'Thank you for subscribing.', [], 201);
?>
