import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { fileURLToPath } from 'url';

import serviceRequestRoutes from './routes/serviceRequestRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔗 Роуты
app.use('/api', serviceRequestRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

// ✅ HTTPS или HTTP
const sslKeyPath = path.join(__dirname, '../ssl/key.pem');
const sslCertPath = path.join(__dirname, '../ssl/cert.pem');

if (fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
  const credentials = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath),
  };

  https.createServer(credentials, app).listen(PORT, () => {
    console.log(`🔐 HTTPS-сервер запущен на https://localhost:${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`🌐 HTTPS-сертификаты не найдены, запущен HTTP на http://localhost:${PORT}`);
  });
}
