CREATE DATABASE IF NOT EXISTS scentelle_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE scentelle_db;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS newsletter_subscribers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  gender ENUM('Men', 'Women', 'Unisex') NOT NULL,
  type VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.5,
  image VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  top_notes VARCHAR(255) NOT NULL,
  heart_notes VARCHAR(255) NOT NULL,
  base_notes VARCHAR(255) NOT NULL,
  stock INT NOT NULL DEFAULT 20,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(160) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  subject VARCHAR(180) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(20) NOT NULL UNIQUE,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(80) NOT NULL,
  province VARCHAR(80) NOT NULL,
  postal_code VARCHAR(30) NOT NULL,
  payment_method VARCHAR(40) NOT NULL,
  subtotal INT NOT NULL,
  delivery INT NOT NULL,
  discount INT NOT NULL,
  total INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  size VARCHAR(20) NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

INSERT INTO products (id, name, gender, type, price, rating, image, description, top_notes, heart_notes, base_notes, stock) VALUES
(1, 'Scentelle Noir', 'Men', 'Eau de Parfum', 12999, 4.8, 'assets/images/bottle-noir.svg', 'A sophisticated fragrance combining fresh citrus with warm woods and deep amber.', 'Bergamot, Lemon', 'Lavender, Cedarwood', 'Amber, Musk, Oud', 18),
(2, 'Velvet Rose', 'Women', 'Eau de Parfum', 9999, 4.7, 'assets/images/bottle-rose.svg', 'A soft rose fragrance wrapped in creamy musk and a quiet touch of spice.', 'Pink Pepper, Mandarin', 'Rose, Peony', 'Musk, Vanilla, Sandalwood', 24),
(3, 'Oud Royale', 'Unisex', 'Parfum', 18999, 4.9, 'assets/images/bottle-amber.svg', 'Deep oud, resin, and amber create a rich evening scent with lasting presence.', 'Saffron, Nutmeg', 'Rose, Incense', 'Oud, Amber, Leather', 12),
(4, 'Azure Mist', 'Women', 'Eau de Toilette', 7499, 4.4, 'assets/images/bottle-blue.svg', 'Fresh aquatic notes meet jasmine and clean woods for an airy daytime fragrance.', 'Sea Salt, Pear', 'Jasmine, Lily', 'Cedar, White Musk, Ambergris', 30),
(5, 'Amber Essence', 'Unisex', 'Eau de Parfum', 11999, 4.6, 'assets/images/bottle-amber.svg', 'Warm amber, tonka, and soft woods make this a comfortable signature scent.', 'Orange, Cardamom', 'Tonka, Cinnamon', 'Amber, Patchouli, Musk', 20),
(6, 'Midnight Reverie', 'Men', 'Parfum', 16999, 4.8, 'assets/images/bottle-noir.svg', 'Dark spices and smoky woods designed for late nights and formal moments.', 'Black Pepper, Grapefruit', 'Violet, Clove', 'Vetiver, Incense, Amber', 14),
(7, 'White Musk', 'Women', 'Eau de Toilette', 6999, 4.3, 'assets/images/bottle-rose.svg', 'Clean, delicate, and softly floral with a graceful musk trail.', 'Aldehydes, Neroli', 'Iris, Lily', 'White Musk, Cashmere Wood, Vanilla', 35),
(8, 'Golden Oud', 'Men', 'Parfum', 17999, 4.9, 'assets/images/bottle-amber.svg', 'A golden blend of oud, spice, and smoky resin for confident evenings.', 'Saffron, Bergamot', 'Oud, Rosewood', 'Amber, Labdanum, Leather', 13),
(9, 'Citrus Veil', 'Unisex', 'Eau de Toilette', 7999, 4.2, 'assets/images/bottle-blue.svg', 'Bright citrus and tea notes make a fresh, easy fragrance for warm days.', 'Lime, Grapefruit', 'Green Tea, Mint', 'Cedar, Musk, Vetiver', 27),
(10, 'Fleur Lumiere', 'Women', 'Eau de Parfum', 10999, 4.6, 'assets/images/bottle-rose.svg', 'Radiant white flowers with pear and sandalwood for an elegant floral finish.', 'Pear, Bergamot', 'Tuberose, Jasmine', 'Sandalwood, Musk, Vanilla', 22),
(11, 'Obsidian', 'Men', 'Eau de Parfum', 13999, 4.7, 'assets/images/bottle-noir.svg', 'A crisp woody aromatic fragrance with leather accents and a polished edge.', 'Apple, Bergamot', 'Geranium, Sage', 'Leather, Cedar, Amber', 19),
(12, 'Ocean Eclat', 'Unisex', 'Eau de Toilette', 8999, 4.5, 'assets/images/bottle-blue.svg', 'Sparkling marine freshness balanced with citrus, herbs, and soft musk.', 'Marine Accord, Lemon', 'Basil, Jasmine', 'Musk, Driftwood, Ambergris', 26),
(13, 'Imperial Amber', 'Men', 'Parfum', 18499, 4.8, 'assets/images/bottle-amber.svg', 'Resinous amber and spice with a smooth, formal depth.', 'Cinnamon, Orange', 'Myrrh, Clove', 'Amber, Oud, Tonka', 11),
(14, 'Rose Nocturne', 'Women', 'Parfum', 15499, 4.7, 'assets/images/bottle-rose.svg', 'Dark rose petals, plum, and patchouli create a romantic evening perfume.', 'Plum, Pink Pepper', 'Damask Rose, Violet', 'Patchouli, Musk, Amber', 16),
(15, 'Cedar Elixir', 'Men', 'Eau de Toilette', 8499, 4.4, 'assets/images/bottle-noir.svg', 'Dry cedar, herbs, and citrus form a clean masculine everyday scent.', 'Bergamot, Rosemary', 'Cedar Leaf, Lavender', 'Cedarwood, Vetiver, Musk', 25),
(16, 'Vanilla Muse', 'Unisex', 'Eau de Parfum', 11499, 4.6, 'assets/images/bottle-amber.svg', 'Creamy vanilla, almond, and amber with a refined gourmand warmth.', 'Almond, Mandarin', 'Vanilla Orchid, Heliotrope', 'Vanilla, Amber, Sandalwood', 21);
