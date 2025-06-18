import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' }); // путь к .env

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendApplicationEmail = async ({ full_name, phone, service_type, message }) => {
  const mailOptions = {
    from: `"Сайт PТО" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `📬 Новая заявка с сайта`,
    html: `
      <h2>Новая заявка</h2>
      <p><strong>Имя:</strong> ${full_name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Тип услуги:</strong> ${service_type}</p>
      <p><strong>Сообщение:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📨 Email успешно отправлен');
  } catch (err) {
    console.warn('⚠️ Ошибка при отправке email:', err.message || err);
  }
};
