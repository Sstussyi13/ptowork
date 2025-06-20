import express from 'express';
import dbPromise from '../db/database.js';
import { sendApplicationEmail } from '../mailer.js';


const router = express.Router();

// 📤 Отправка заявки
router.post('/requests', async (req, res) => {
  try {
    const { full_name, phone, service_type, message } = req.body;

    // ✅ Лог в терминал:
    console.log('📥 Заявка получена на сервере:', req.body);

    const db = await dbPromise;

    // Проверка существования услуги
    const service = await db.get('SELECT id FROM services WHERE name = ?', [service_type]);
    if (!service) {
      return res.status(400).json({ message: 'Такой услуги не существует' });
    }

    // Сохранение в БД
    await db.run(
      `INSERT INTO applications 
       (full_name, phone, message, service_id, created_at)
       VALUES (?, ?, ?, ?, datetime('now'))`,
      [full_name, phone, message, service.id]
    );

    // Отправка email
    await sendApplicationEmail({ full_name, phone, service_type, message });

    res.status(201).json({ message: 'Заявка успешно отправлена и сохранена' });
  } catch (err) {
    console.error('❌ Ошибка при создании заявки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Остальные маршруты (заглушки пока не используются)
router.get('/requests', (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
});

router.put('/requests/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
});

router.delete('/requests/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
});

router.get('/services', (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
});

export default router;
