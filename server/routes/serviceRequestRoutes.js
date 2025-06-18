import express from 'express';
import { submitRequest } from '../controllers/serviceRequestController.js';
import dbPromise from '../db/database.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';
import { sendApplicationEmail } from '../server/mailer.js'; // Добавлен импорт

const router = express.Router();

// 📤 Отправка заявки (обновленный обработчик)
router.post('/requests', async (req, res) => {
  try {
    const { full_name, phone, service_type, message } = req.body;
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

    // Отправка email (добавлено)
    await sendApplicationEmail({ full_name, phone, service_type, message });

    res.status(201).json({ message: 'Заявка успешно отправлена' });
  } catch (err) {
    console.error('Ошибка при создании заявки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// 📥 Получение всех заявок (остается без изменений)
router.get('/requests', /* ... */);

// ✏️ Обновление заявки (остается без изменений)
router.put('/requests/:id', /* ... */);

// ❌ Удаление заявки (остается без изменений)
router.delete('/requests/:id', /* ... */);

// 📜 Получение всех услуг (остается без изменений)
router.get('/services', /* ... */);

export default router;