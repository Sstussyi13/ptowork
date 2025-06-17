import db from '../config/db.js';

export const createServiceRequest = ({ user_id, service_type, message }) => {
  const stmt = db.prepare(
    'INSERT INTO service_requests (user_id, service_type, message) VALUES (?, ?, ?)'
  );
  const info = stmt.run(user_id, service_type, message);
  return info.lastInsertRowid;
};

export const getAllRequests = () => {
  const stmt = db.prepare(`
    SELECT sr.id, sr.service_type, sr.message, sr.request_date,
           u.full_name, u.phone_number
    FROM service_requests sr
    LEFT JOIN users u ON sr.user_id = u.id
    ORDER BY sr.request_date DESC
  `);
  return stmt.all();
};

export const updateRequest = (id, { service_type, message }) => {
  const stmt = db.prepare(
    'UPDATE service_requests SET service_type = ?, message = ? WHERE id = ?'
  );
  stmt.run(service_type, message, id);
};

export const deleteRequest = (id) => {
  const stmt = db.prepare('DELETE FROM service_requests WHERE id = ?');
  stmt.run(id);
};
