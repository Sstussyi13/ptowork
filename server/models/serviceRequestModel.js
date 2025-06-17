import db from '../config/db.js';

export const createServiceRequest = ({ user_id, service_type, message }) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO service_requests (user_id, service_type, message) VALUES (?, ?, ?)',
      [user_id, service_type, message],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};

export const getAllRequests = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT sr.id, sr.service_type, sr.message, sr.request_date,
             u.full_name, u.phone_number
      FROM service_requests sr
      LEFT JOIN users u ON sr.user_id = u.id
      ORDER BY sr.request_date DESC
    `,
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

export const updateRequest = (id, { service_type, message }) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE service_requests SET service_type = ?, message = ? WHERE id = ?',
      [service_type, message, id],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

export const deleteRequest = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM service_requests WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};
