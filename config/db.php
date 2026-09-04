<?php
declare(strict_types=1);

$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbName = 'scentelle_db';

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

if ($conn->connect_error) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed. Start MySQL in XAMPP and import database/scentelle.sql.'
    ]);
    exit;
}

$conn->set_charset('utf8mb4');
?>
