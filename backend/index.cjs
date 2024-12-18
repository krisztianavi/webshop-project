const express = require('express');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "webshop",
}).promise();

app.get("/", (req, res) => {
    res.send("A webshop backendje");
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Felhasználónév, jelszó szükséges." });
    }

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Ez a felhasználónév már létezik." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: "Sikeresen regisztrált." });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Szerverhiba" });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Felhasználónév, jelszó szükséges." });
    }

    try {
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length === 0) {
            return res.status(400).json({ error: "Helytelen felhasználónév vagy jelszó." });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: "Helytelen felhasználónév vagy jelszó." });
        }

        const token = jsonwebtoken.sign({ userId: user[0].id, username: user[0].username }, 'yourSecretKey', { expiresIn: '1h' });
        res.status(200).json({ message: "Sikeres bejelentkezés.", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Szerverhiba" });
    }
});

app.put('/api/profile/username', async (req, res) => {
    const { username, token } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Felhasználónév szükséges." });
    }

    try {
        const decoded = jsonwebtoken.verify(token, 'yourSecretKey');
        console.log("Decoded token:", decoded);

        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            console.log('Ez a felhasználónév már létezik:', username);
            return res.status(400).json({ message: 'Ez a felhasználónév már létezik.' });
        }

        console.log("A felhasználónév módosult:", username);
        await db.query('UPDATE users SET username = ? WHERE id = ?', [username, decoded.userId]);
        res.status(200).json({ message: 'A felhasználónév sikeresen módosult.' });
    } catch (error) {
        console.error('Error updating username:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ message: 'Szerverhiba' });
    }
});

app.put('/api/profile/password', async (req, res) => {
    const { password } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing.' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Jelszó szükséges.' });
    }

    try {
        const decoded = jsonwebtoken.verify(token, 'yourSecretKey');
        console.log("Decoded token:", decoded);

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Jelszó frissítése a userIdhoz:", decoded.userId);

        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, decoded.userId]);
        res.status(200).json({ message: 'A jelszó sikeresen módosult.' });
    } catch (error) {
        console.error('Hiba a jelszó frissítése közben:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ message: 'Szerverhiba' });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
