import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Определяем путь к базе
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Создаём подключение
const db = new Database(dbPath);

// Удаляем старые таблицы, если есть
db.exec(`
  DROP TABLE IF EXISTS applications;
  DROP TABLE IF EXISTS services;
  DROP TABLE IF EXISTS admin_users;
`);

// Создаём новые таблицы
db.exec(`
  CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_id INTEGER NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(service_id) REFERENCES services(id)
  );

  CREATE TABLE admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );
`);

// Вставка услуг
const insertService = db.prepare('INSERT INTO services (name) VALUES (?)');
['Бухгалтерия', 'Юридические консультации', 'Кадровый учёт'].forEach(name => {
  insertService.run(name);
});

// Добавляем тестового администратора
db.prepare('INSERT INTO admin_users (username, password) VALUES (?, ?)').run(
  'admin',
  '123' // Здесь можно вставить захешированный пароль
);

console.log('✅ База данных и таблицы созданы.');
db.close();
