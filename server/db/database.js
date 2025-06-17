// server/db/database.js (или database.mjs если ты используешь .mjs расширение)
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Нужно для получения __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к БД
const dbPath = path.resolve(__dirname, 'new_database.sqlite');

// Подключение к базе
const db = new Database(dbPath, {
  verbose: console.log, // опционально: логирует SQL-запросы в консоль
});

// Экспорт подключения
export default db;
