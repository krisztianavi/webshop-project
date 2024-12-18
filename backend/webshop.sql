CREATE DATABASE webshop;
USE webshop;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),  
    stock INT DEFAULT 0, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password) VALUES
('admin', 'admin123'),
('user1', 'password123');

INSERT INTO products (name, description, price, image, stock) VALUES
('Samsung 980 PRO 1TB', 'Gyors NVMe SSD 1TB tárolóval', 35990, 'images/samsung980.jpg', 50),
('Crucial P5 Plus 500GB', 'Gyors PCIe 4.0 NVMe SSD', 25990, 'images/crucialp5.jpg', 30),
('Western Digital Black SN850 1TB', 'Magas teljesítményű NVMe SSD játékhoz', 46990, 'images/wdblack.png', 20),
('Seagate FireCuda 530 1TB', 'Magas teljesítményű PCIe 4.0 SSD játékhoz', 52990, 'images/firecuda530.jpg', 25),
('Kingston A2000 500GB', 'Kedvező árú PCIe 3.0 NVMe SSD', 21990, 'images/kingston_a2000.jpg', 40),
('ADATA XPG GAMMIX S70 1TB', 'Gyors NVMe SSD PCIe 4.0 támogatással', 43990, 'images/adata_xpg.jpg', 35);



