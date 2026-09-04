<?php
declare(strict_types=1);

session_start();
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/../config/db.php';

$data = read_json_input();
$action = $data['action'] ?? '';

if ($action === 'signup') {
    require_fields($data, ['fullName', 'email', 'password']);

    $fullName = trim((string) $data['fullName']);
    $email = strtolower(trim((string) $data['email']));
    $password = (string) $data['password'];

    if (!valid_email($email)) {
        respond(false, 'Please enter a valid email address.', [], 422);
    }

    if (strlen($password) < 8) {
        respond(false, 'Password must be at least 8 characters.', [], 422);
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare('INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $fullName, $email, $passwordHash);

    if (!$stmt->execute()) {
        if ($conn->errno === 1062) {
            respond(false, 'An account with this email already exists.', [], 409);
        }
        respond(false, 'Unable to create account.', [], 500);
    }

    $_SESSION['user'] = ['id' => $stmt->insert_id, 'fullName' => $fullName, 'email' => $email];

    respond(true, 'Account created successfully.', ['user' => $_SESSION['user']], 201);
}

if ($action === 'login') {
    require_fields($data, ['email', 'password']);

    $email = strtolower(trim((string) $data['email']));
    $password = (string) $data['password'];

    if (!valid_email($email)) {
        respond(false, 'Please enter a valid email address.', [], 422);
    }

    $stmt = $conn->prepare('SELECT id, full_name, email, password_hash FROM users WHERE email = ? LIMIT 1');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        respond(false, 'Invalid email or password.', [], 401);
    }

    $_SESSION['user'] = ['id' => (int) $user['id'], 'fullName' => $user['full_name'], 'email' => $user['email']];

    respond(true, 'Login successful.', ['user' => $_SESSION['user']]);
}

respond(false, 'Invalid authentication action.', [], 400);
?>
