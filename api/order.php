<?php
declare(strict_types=1);

session_start();
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/../config/db.php';

if (!isset($_SESSION['user'])) {
    respond(false, 'Please login before placing an order.', [], 401);
}

$data = read_json_input();
require_fields($data, ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'province', 'postalCode', 'paymentMethod']);

$cart = $data['cart'] ?? [];
if (!is_array($cart) || count($cart) === 0) {
    respond(false, 'Your cart is empty.', [], 422);
}

$email = strtolower(trim((string) $data['email']));
if (!valid_email($email)) {
    respond(false, 'Please enter a valid email address.', [], 422);
}

$productIds = [];
foreach ($cart as $item) {
    if (!isset($item['productId'], $item['quantity'], $item['size'])) {
        respond(false, 'Cart item data is invalid.', [], 422);
    }
    $productIds[] = (int) $item['productId'];
}

$safeIds = implode(',', array_map('intval', array_unique($productIds)));
$stmt = $conn->prepare("SELECT id, name, price FROM products WHERE id IN ($safeIds)");
$stmt->execute();
$result = $stmt->get_result();

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[(int) $row['id']] = $row;
}

$subtotal = 0;
$cleanItems = [];
foreach ($cart as $item) {
    $productId = (int) $item['productId'];
    if (!isset($products[$productId])) {
        respond(false, 'One or more cart products no longer exist.', [], 422);
    }

    $quantity = max(1, (int) $item['quantity']);
    $size = trim((string) $item['size']);
    $product = $products[$productId];
    $price = (int) $product['price'];
    $subtotal += $price * $quantity;

    $cleanItems[] = [
        'productId' => $productId,
        'name' => $product['name'],
        'price' => $price,
        'quantity' => $quantity,
        'size' => $size
    ];
}

$delivery = $subtotal >= 10000 ? 0 : 500;
$promoCode = strtoupper(trim((string) ($data['promoCode'] ?? '')));
$discount = $promoCode === 'SCENT10' ? (int) round($subtotal * 0.10) : 0;
$total = $subtotal + $delivery - $discount;
$orderNumber = 'SCT-' . random_int(1000, 9999);

$conn->begin_transaction();

try {
    $orderStmt = $conn->prepare(
        'INSERT INTO orders (order_number, first_name, last_name, email, phone, address, city, province, postal_code, payment_method, subtotal, delivery, discount, total)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );

    $firstName = trim((string) $data['firstName']);
    $lastName = trim((string) $data['lastName']);
    $phone = trim((string) $data['phone']);
    $address = trim((string) $data['address']);
    $city = trim((string) $data['city']);
    $province = trim((string) $data['province']);
    $postalCode = trim((string) $data['postalCode']);
    $paymentMethod = trim((string) $data['paymentMethod']);

    $orderStmt->bind_param(
        'ssssssssssiiii',
        $orderNumber,
        $firstName,
        $lastName,
        $email,
        $phone,
        $address,
        $city,
        $province,
        $postalCode,
        $paymentMethod,
        $subtotal,
        $delivery,
        $discount,
        $total
    );
    $orderStmt->execute();
    $orderId = $orderStmt->insert_id;

    $itemStmt = $conn->prepare('INSERT INTO order_items (order_id, product_id, product_name, size, price, quantity) VALUES (?, ?, ?, ?, ?, ?)');
    foreach ($cleanItems as $item) {
        $itemStmt->bind_param('iissii', $orderId, $item['productId'], $item['name'], $item['size'], $item['price'], $item['quantity']);
        $itemStmt->execute();
    }

    $conn->commit();
} catch (Throwable $error) {
    $conn->rollback();
    respond(false, 'Unable to place order.', [], 500);
}

respond(true, 'Order placed successfully.', [
    'orderNumber' => $orderNumber,
    'totals' => [
        'subtotal' => $subtotal,
        'delivery' => $delivery,
        'discount' => $discount,
        'total' => $total
    ]
], 201);
?>
