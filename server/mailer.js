// server/mailer.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // или 587 с secure: false
  secure: true, // true для порта 465, false для 587
  auth: {
    user: process.env.EMAIL_USER, // Твой Gmail
    pass: process.env.EMAIL_PASS, // Пароль приложения от Google
  },
});

/**
 * Отправка email при поступлении новой заявки
 */
export const sendApplicationEmail = async ({ full_name, phone, service_type, message }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Заявка с сайта" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Новая заявка с сайта',
      html: `
        <h2>Новая заявка</h2>
        <p><strong>Имя:</strong> ${full_name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Услуга:</strong> ${service_type}</p>
        <p><strong>Сообщение:</strong><br/>${message}</p>
      `,
    });

    console.log('📨 Email отправлен:', info.messageId);
  } catch (err) {
    console.error('⚠️ Ошибка при отправке email:', err.message);
    throw err; // проброс, если нужно отловить выше
  }
};
