import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // или просто dotenv.config();

console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '✅' : '❌ нет');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);

