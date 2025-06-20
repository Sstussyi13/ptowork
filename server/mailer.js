import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные из .env

// Создаём транспортер с параметрами из .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,                           // smtp.gmail.com
  port: parseInt(process.env.SMTP_PORT),                 // 465 или 587
  secure: process.env.SMTP_SECURE === 'true',            // true для 465, false для 587
  auth: {
    user: process.env.EMAIL_USER,                        // Gmail-логин
    pass: process.env.EMAIL_PASS,                        // Пароль приложения Gmail
  },
});

// ✅ Проверка соединения сразу при запуске
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP соединение не установлено:', error.message || error);
  } else {
    console.log('✅ SMTP соединение успешно установлено');
  }
});

// ✉️ Функция отправки письма
export const sendApplicationEmail = async ({ full_name, phone, service_type, message }) => {
  try {
    const mailOptions = {
      from: `"Сайт PTO" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '📬 Новая заявка с сайта',
      text: `
        Имя: ${full_name}
        Телефон: ${phone}
        Услуга: ${service_type}
        Сообщение: ${message}
      `,
      html: `
        <h3>Новая заявка</h3>
        <p><strong>Имя:</strong> ${full_name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Услуга:</strong> ${service_type}</p>
        <p><strong>Сообщение:</strong><br>${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📨 Письмо отправлено:', info.response);
  } catch (err) {
    console.error('⚠️ Ошибка при отправке email:', err.message || err);
  }
};
