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

// 👉 Отдача фронтенда (React)
app.use(express.static(path.join(__dirname, '../client/dist')));

// 👉 Обработка всех остальных маршрутов — index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

