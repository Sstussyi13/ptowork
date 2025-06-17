import express from 'express';
import db from '../config/db.js'; // правильный путь к db (better-sqlite3)

const router = express.Router();

// 🔹 Получение всего контента
router.get('/all', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM editable_content');
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении контента:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// 🔹 Получение контента по ключу
router.get('/:key', (req, res) => {
  const { key } = req.params;

  try {
    const stmt = db.prepare('SELECT value FROM editable_content WHERE key = ?');
    const row = stmt.get(key);

    if (!row) {
      return res.status(404).json({ message: 'Контент не найден' });
    }

    res.json(row); // { value: '...' }
  } catch (err) {
    console.error('Ошибка при получении контента по ключу:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// 🔹 Обновление или вставка по ключу
router.put('/:key', (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO editable_content (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `);
    stmt.run(key, value);

    res.json({ message: 'Контент обновлён' });
  } catch (err) {
    console.error('Ошибка при обновлении контента:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
