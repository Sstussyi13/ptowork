import dbPromise from '../db/database.js';
import { sendApplicationEmail } from '../mailer.js';

export const submitRequest = async (req, res) => {
  const { full_name, phone, service_type, message } = req.body;

  try {
    const db = await dbPromise;

    // 🔍 Получение id услуги по названию
    const service = await db.get(`SELECT id FROM services WHERE name = ?`, [service_type]);
    if (!service) {
      return res.status(400).json({ message: 'Такой услуги не существует' });
    }

    // 💾 Сохранение заявки
    await db.run(
      `INSERT INTO applications (full_name, phone, message, service_id, created_at) 
       VALUES (?, ?, ?, ?, datetime('now'))`,
      [full_name, phone, message, service.id]
    );

    // 📧 Отправка письма (не блокирует основной процесс)
    sendApplicationEmail({ full_name, phone, service_type, message })
      .then(() => console.log('📩 Письмо отправлено'))
      .catch(err => console.error('⚠️ Ошибка при отправке email:', err.message));

    res.status(201).json({ message: 'Заявка успешно отправлена и сохранена' });

  } catch (err) {
    console.error('❌ Ошибка при отправке заявки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
