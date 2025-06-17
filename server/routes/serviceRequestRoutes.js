import express from 'express';
import db from '../config/db.js';
import { submitRequest } from '../controllers/serviceRequestController.js';

const router = express.Router();

// 📤 Отправка заявки
router.post('/requests', submitRequest);

// 📥 Получение всех заявок
router.get('/requests', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT 
        a.id,
        a.full_name,
        a.phone,
        a.message,
        a.created_at AS request_date,
        s.name AS service_type
      FROM applications a
      LEFT JOIN services s ON a.service_id = s.id
      ORDER BY a.created_at DESC
    `);
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении заявок:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// ✏️ Обновление заявки
router.put('/requests/:id', (req, res) => {
  const { id } = req.params;
  const { service_type, message } = req.body;

  try {
    const serviceStmt = db.prepare(`SELECT id FROM services WHERE name = ?`);
    const service = serviceStmt.get(service_type);

    if (!service) {
      return res.status(400).json({ message: 'Такой услуги не существует' });
    }

    const updateStmt = db.prepare(`UPDATE applications SET service_id = ?, message = ? WHERE id = ?`);
    updateStmt.run(service.id, message, id);

    res.json({ message: 'Заявка обновлена' });
  } catch (err) {
    console.error('Ошибка при обновлении заявки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// ❌ Удаление заявки
router.delete('/requests/:id', (req, res) => {
  const { id } = req.params;

  try {
    const deleteStmt = db.prepare(`DELETE FROM applications WHERE id = ?`);
    deleteStmt.run(id);

    res.json({ message: 'Заявка удалена' });
  } catch (err) {
    console.error('Ошибка при удалении заявки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// 📜 Получение всех услуг
router.get('/services', (req, res) => {
  try {
    const stmt = db.prepare('SELECT id, name FROM services');
    const services = stmt.all();
    res.json(services);
  } catch (err) {
    console.error('Ошибка получения услуг:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
