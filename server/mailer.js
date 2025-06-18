import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // ← обязательно как строка
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendApplicationEmail = async ({ full_name, phone, service_type, message }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Заявка с сайта" <${process.env.SMTP_USER}>`,
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
    throw err;
  }
};
