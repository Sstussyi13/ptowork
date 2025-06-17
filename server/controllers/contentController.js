import db from '../db/database.js';

export const getContent = (req, res) => {
  const { section } = req.params;
  db.get('SELECT value FROM editable_content WHERE key = ?', [section], (err, row) => {
    if (err) return res.status(500).json({ message: 'Ошибка получения' });
    if (!row) return res.status(404).json({ message: 'Не найдено' });
    res.json(JSON.parse(row.value));
  });
};

export const updateContent = (req, res) => {
  const { section } = req.params;
  const { value } = req.body;

  db.run(
    `INSERT INTO editable_content (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [section, JSON.stringify(value)],
    (err) => {
      if (err) {
        console.error("Ошибка обновления:", err);
        return res.status(500).json({ message: 'Ошибка обновления' });
      }
      res.json({ message: 'Сохранено' });
    }
  );
};
