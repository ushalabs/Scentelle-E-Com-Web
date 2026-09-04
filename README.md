# Scentelle

Scentelle is a semester-level perfume e-commerce website built with HTML, CSS, vanilla JavaScript, PHP, and MySQL.

## XAMPP Setup

1. Copy or move the `Scentelle` folder into your XAMPP `htdocs` folder.
   Example: `C:\xampp\htdocs\Scentelle`

2. Start XAMPP and turn on:
   - Apache
   - MySQL

3. Open phpMyAdmin:
   `http://localhost/phpmyadmin`

4. Import the database file:
   `database/scentelle.sql`

5. Open the website:
   `http://localhost/Scentelle/login.html`

## Database

Default database settings are in `config/db.php`.

```php
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbName = 'scentelle_db';
```

These match a normal XAMPP installation.

## Backend Features

- Products load from MySQL through `api/products.php`
- Signup and login use `api/auth.php`
- Newsletter subscriptions save through `api/newsletter.php`
- Contact messages save through `api/contact.php`
- Checkout orders save through `api/order.php`
- Order items are saved in the `order_items` table
- Login/signup starts a PHP session
- Store pages redirect back to login when the user is not logged in
- `.htaccess` tells Apache/XAMPP to process `.html` files as PHP so protected pages are blocked server-side

The shopping cart remains in `localStorage` until checkout, then the order is saved to MySQL.
