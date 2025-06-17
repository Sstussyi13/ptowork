import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import serviceRequestRoutes from './routes/serviceRequestRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Папка для изображений
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API роуты
app.use('/api', serviceRequestRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

// 👉 Отдача собранного фронта (React Vite)
app.use(express.static(path.join(__dirname, '../client/dist')));

// 👉 SPA: отдаём index.html на любые маршруты (в том числе /super, /admin и т.д.)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
