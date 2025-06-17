import express from 'express';
import { submitRequest } from '../controllers/serviceRequestController.js';
import dbPromise from '../db/database.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

const router = express.Router();

// 📤 Отправка заявки
router.post('/requests', submitRequest);

// 📥 Получение всех заявок
router.get('/requests', async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all(`
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
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении заявок:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// ✏️ Обновление заявки
router.put('/requests/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;
    const { service_type, message } = req.body;

    const service = await db.get(`SELECT id FROM services WHERE name = ?`, [service_type]);
    if (!service) {
      return res.status(400).json({ message: 'Такой услуги не существует' });
    }

    await db.run(
      `UPDATE applications SET service_id = ?, message = ? WHERE id = ?`,
      [service.id, message, id]
    );

    res.json({ message: 'Заявка обновлена' });
  } catch (err) {
    console.error('Ошибка при обновлении заявки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// ❌ Удаление заявки
router.delete('/requests/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id } = req.params;

    await db.run(`DELETE FROM applications WHERE id = ?`, [id]);

    res.json({ message: 'Заявка удалена' });
  } catch (err) {
    console.error('Ошибка при удалении заявки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// 📜 Получение всех услуг
router.get('/services', async (req, res) => {
  try {
    const db = await dbPromise;
    const services = await db.all('SELECT id, name FROM services');
    res.json(services);
  } catch (err) {
    console.error('Ошибка получения услуг:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
