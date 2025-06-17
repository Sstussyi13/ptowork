import express from 'express';
import dbPromise from '../db/database.js';

const router = express.Router();

// Получение всего контента
router.get('/all', async (req, res) => {
  const db = await dbPromise;
  try {
    const rows = await db.all('SELECT * FROM editable_content');
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении контента:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получение контента по ключу (например: cards, services)
router.get('/:key', async (req, res) => {
  const db = await dbPromise;
  const { key } = req.params;

  try {
    const row = await db.get('SELECT value FROM editable_content WHERE key = ?', [key]);

    if (!row) {
      return res.status(404).json({ message: 'Контент не найден' });
    }

    res.json(row); // вернёт { value: '[...]' }
  } catch (err) {
    console.error('Ошибка при получении контента по ключу:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Обновление конкретного блока по ключу
router.put('/:key', async (req, res) => {
  const db = await dbPromise;
  const { key } = req.params;
  const { value } = req.body;

  try {
    await db.run(`
      INSERT INTO editable_content (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `, [key, value]);

    res.json({ message: 'Контент обновлён' });
  } catch (err) {
    console.error('Ошибка при обновлении контента:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
