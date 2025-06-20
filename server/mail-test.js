import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Проверка соединения
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Ошибка проверки соединения:', error.message || error);
  } else {
    console.log('✅ SMTP соединение успешно установлено');

    // Если соединение норм — отправим письмо
    sendTestEmail();
  }
  console.log('✅ Завершено');
});


const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Сайт PТО" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '🚀 Тестовое письмо от сайта PТО',
      text: 'Успешная проверка SMTP отправки через Brevo.',
    });
    console.log('📨 Письмо отправлено:', info.messageId);
  } catch (err) {
    console.error('❌ Ошибка при отправке письма:', err.message || err);
  }
};
