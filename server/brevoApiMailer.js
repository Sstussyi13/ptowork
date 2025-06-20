import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

const sendApplicationEmail = async ({ full_name, phone, service_type, message }) => {
  // Настройка API Brevo
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const emailData = {
    sender: { name: 'PTO Сайт', email: process.env.SMTP_USER },
    to: [{ email: process.env.ADMIN_EMAIL }],
    subject: `📩 Новая заявка на услугу: ${service_type}`,
    htmlContent: `
      <h2>Новая заявка с сайта</h2>
      <p><strong>Имя:</strong> ${full_name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Услуга:</strong> ${service_type}</p>
      <p><strong>Сообщение:</strong><br>${message}</p>
    `,
  };

  try {
    const response = await apiInstance.sendTransacEmail(emailData);
    console.log('📨 Письмо успешно отправлено! ID:', response?.messageId || response);
  } catch (err) {
    console.error('❌ Ошибка при отправке письма через API:', err?.response?.body || err.message || err);
  }
};

export { sendApplicationEmail };
