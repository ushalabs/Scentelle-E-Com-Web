<?php
session_start();

if (!isset($_SESSION['user'])) {
    $currentPage = basename($_SERVER['PHP_SELF']);
    $query = $_SERVER['QUERY_STRING'] ?? '';
    $next = $currentPage . ($query ? '?' . $query : '');
    header('Location: login.html?next=' . urlencode($next));
    exit;
}
?>
