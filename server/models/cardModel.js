import db from '../config/db.js';

export const getAllCards = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM cards ORDER BY id', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const createCard = ({ label, link, image }) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO cards (label, link, image) VALUES (?, ?, ?)',
      [label, link, image],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};

export const updateCard = (id, { label, link, image }) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE cards SET label = ?, link = ?, image = ? WHERE id = ?',
      [label, link, image, id],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

export const deleteCard = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM cards WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};
