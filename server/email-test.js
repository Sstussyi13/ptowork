import dotenv from 'dotenv';
import { sendApplicationEmail } from './server/mailer.js';

dotenv.config();

(async () => {
  try {
    console.log("🚀 Запуск теста отправки email...");
    
    await sendApplicationEmail({
      full_name: "Тестовый Пользователь",
      phone: "+7 999 123 45 67",
      service_type: "Тестовая услуга",
      message: "Это тестовое сообщение для проверки работы почты"
    });
    
    console.log("✅ Тестовое письмо отправлено успешно");
  } catch (err) {
    console.error("❌ Ошибка отправки теста:", err);
  }
})();