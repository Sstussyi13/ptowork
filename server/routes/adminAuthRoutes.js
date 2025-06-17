import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbPromise from '../db/database.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Вход в админку
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = await dbPromise;

  const user = await db.get('SELECT * FROM admin_users WHERE email = ?', [email]);
  if (!user) return res.status(401).json({ message: 'Неверный email или пароль' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Неверный email или пароль' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: true, // если https
    sameSite: 'strict',
  });

  res.json({ message: 'Успешный вход' });
});

// Выход
router.post('/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ message: 'Выход выполнен' });
});

export default router;
