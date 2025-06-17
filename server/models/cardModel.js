import db from '../config/db.js'; // убедись, что db.js экспортирует экземпляр better-sqlite3

export const getAllCards = () => {
  return db.prepare('SELECT * FROM cards ORDER BY id').all();
};

export const createCard = ({ label, link, image }) => {
  const stmt = db.prepare('INSERT INTO cards (label, link, image) VALUES (?, ?, ?)');
  const result = stmt.run(label, link, image);
  return result.lastInsertRowid;
};

export const updateCard = (id, { label, link, image }) => {
  db.prepare('UPDATE cards SET label = ?, link = ?, image = ? WHERE id = ?')
    .run(label, link, image, id);
};

export const deleteCard = (id) => {
  db.prepare('DELETE FROM cards WHERE id = ?').run(id);
};
