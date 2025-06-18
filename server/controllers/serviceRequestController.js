import db from '../db/database.js';
import { sendApplicationEmail } from '../mailer.js';

export const submitRequest = async (req, res) => {
  const { full_name, phone, service_type, message } = req.body;

  try {
    const service = await db.get(`SELECT id FROM services WHERE name = ?`, [service_type]);
    if (!service) {
      return res.status(400).json({ message: 'Услуга не найдена' });
    }

    await db.run(
      `INSERT INTO applications (full_name, phone, message, service_id, created_at)
       VALUES (?, ?, ?, ?, datetime('now'))`,
      [full_name, phone, message, service.id]
    );

    console.log('📥 Заявка получена на сервере:', req.body);

    await sendApplicationEmail({ full_name, phone, service_type, message });

    res.status(201).json({ message: 'Заявка успешно отправлена' });
  } catch (err) {
    console.error('❌ Ошибка при сохранении заявки:', err.message || err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
