import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendApplicationEmail = async ({ full_name, phone, service_type, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Заявка с сайта" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: '📩 Новая заявка с сайта',
      html: `
        <h2>Новая заявка</h2>
        <p><strong>Имя:</strong> ${full_name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Услуга:</strong> ${service_type}</p>
        <p><strong>Сообщение:</strong><br/>${message}</p>
      `,
    });

    console.log('✅ Email отправлен администратору');
  } catch (error) {
    console.error('❌ Ошибка отправки email:', error.message);
    // Ошибку не выбрасываем, чтобы не блокировать сохранение заявки
  }
};
