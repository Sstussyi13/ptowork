import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

// Нужно для __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к новой базе
const dbPath = path.resolve(__dirname, 'new_database.sqlite');

// Открытие подключения
const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database,
});

// Экспорт подключения
export default dbPromise;
