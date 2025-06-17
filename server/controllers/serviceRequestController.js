import db from '../db/database.js';
import { sendApplicationEmail } from '../mailer.js';

export const submitRequest = (req, res) => {
  const { full_name, phone, service_type, message } = req.body;

  try {
    // 🔍 Получение id услуги по названию
    const service = db.prepare('SELECT id FROM services WHERE name = ?').get(service_type);

    if (!service) {
      return res.status(400).json({ message: 'Такой услуги не существует' });
    }

    // 💾 Сохранение заявки
    db.prepare(`
      INSERT INTO applications (full_name, phone, message, service_id, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).run(full_name, phone, message, service.id);

    // 📧 Отправка письма (асинхронно, без ожидания)
    sendApplicationEmail({ full_name, phone, service_type, message })
      .then(() => console.log('📩 Письмо отправлено'))
      .catch(err => console.error('⚠️ Ошибка при отправке email:', err.message));

    res.status(201).json({ message: 'Заявка успешно отправлена и сохранена' });

  } catch (err) {
    console.error('❌ Ошибка при отправке заявки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
