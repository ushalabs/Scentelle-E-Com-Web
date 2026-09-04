<?php
declare(strict_types=1);

session_start();
require_once __DIR__ . '/helpers.php';

if (!isset($_SESSION['user'])) {
    respond(false, 'Please login to continue.', ['authenticated' => false], 401);
}

respond(true, 'User is logged in.', [
    'authenticated' => true,
    'user' => $_SESSION['user']
]);
?>
