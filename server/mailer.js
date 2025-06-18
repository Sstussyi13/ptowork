import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Правильное определение путей для ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Загрузка .env из корня проекта
dotenv.config({ path: join(__dirname, '../.env') });

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Проверка подключения при инициализации
transporter.verify()
  .then(() => console.log('✅ SMTP подключение успешно'))
  .catch(err => console.error('❌ Ошибка SMTP:', err));

export const sendApplicationEmail = async (data) => {
  try {
    const info = await transporter.sendMail({
      from: `"Заявки с сайта" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Новая заявка',
      html: `
        <h2>Новая заявка</h2>
        <p><strong>Имя:</strong> ${data.full_name}</p>
        <p><strong>Телефон:</strong> ${data.phone}</p>
        <p><strong>Услуга:</strong> ${data.service_type}</p>
        <p><strong>Сообщение:</strong> ${data.message}</p>
      `
    });
    console.log('📨 Письмо отправлено:', info.messageId);
    return info;
  } catch (err) {
    console.error('⚠️ Ошибка отправки:', err);
    throw err;
  }
};