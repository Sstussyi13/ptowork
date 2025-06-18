import db from '../db/database.js';
import { sendApplicationEmail } from '../server/mailer.js';

export const submitRequest = async (req, res) => {
  try {
    const { full_name, phone, service_type, message } = req.body;
    
    const dbInstance = await db;
    const service = await dbInstance.get(
      'SELECT id FROM services WHERE name = ?',
      [service_type]
    );

    if (!service) {
      return res.status(400).json({ error: 'Услуга не найдена' });
    }

    await dbInstance.run(
      `INSERT INTO applications 
      (full_name, phone, message, service_id, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))`,
      [full_name, phone, message, service.id]
    );

    await sendApplicationEmail({ full_name, phone, service_type, message });
    
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Ошибка обработки заявки:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};