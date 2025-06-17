import db from '../db/database.js';

export const getContent = (req, res) => {
  const { section } = req.params;

  try {
    const row = db.prepare('SELECT value FROM editable_content WHERE key = ?').get(section);

    if (!row) {
      return res.status(404).json({ message: 'Не найдено' });
    }

    res.json(JSON.parse(row.value));
  } catch (err) {
    console.error("Ошибка получения контента:", err);
    res.status(500).json({ message: 'Ошибка получения' });
  }
};

export const updateContent = (req, res) => {
  const { section } = req.params;
  const { value } = req.body;

  try {
    db.prepare(`
      INSERT INTO editable_content (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).run(section, JSON.stringify(value));

    res.json({ message: 'Сохранено' });
  } catch (err) {
    console.error("Ошибка обновления контента:", err);
    res.status(500).json({ message: 'Ошибка обновления' });
  }
};
