import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js'; // Синхронное подключение better-sqlite3

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// 🔐 Вход в админку
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    const stmt = db.prepare('SELECT * FROM admin_users WHERE email = ?');
    const user = stmt.get(email);

    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '2h',
    });

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: true, // ставить true только если HTTPS реально используется
      sameSite: 'strict',
    });

    res.json({ message: 'Успешный вход' });
  } catch (err) {
    console.error('Ошибка входа:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// 🚪 Выход
router.post('/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ message: 'Выход выполнен' });
});

export default router;
