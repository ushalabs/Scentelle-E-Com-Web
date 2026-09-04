<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/../config/db.php';

$sql = 'SELECT id, name, gender, type, price, rating, image, description, top_notes, heart_notes, base_notes, stock FROM products ORDER BY id';
$result = $conn->query($sql);

if (!$result) {
    respond(false, 'Unable to load products.', [], 500);
}

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = [
        'id' => (int) $row['id'],
        'name' => $row['name'],
        'gender' => $row['gender'],
        'type' => $row['type'],
        'price' => (int) $row['price'],
        'rating' => (float) $row['rating'],
        'image' => $row['image'],
        'description' => $row['description'],
        'topNotes' => array_map('trim', explode(',', $row['top_notes'])),
        'heartNotes' => array_map('trim', explode(',', $row['heart_notes'])),
        'baseNotes' => array_map('trim', explode(',', $row['base_notes'])),
        'stock' => (int) $row['stock']
    ];
}

respond(true, 'Products loaded.', ['products' => $products]);
?>
