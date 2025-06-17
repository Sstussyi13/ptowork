import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

// Определяем путь к базе
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "database.sqlite");

const runMigrations = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Удаляем старые таблицы, если есть
  await db.exec(`
    DROP TABLE IF EXISTS applications;
    DROP TABLE IF EXISTS services;
    DROP TABLE IF EXISTS admin_users;
  `);

  // Создаём таблицы
  await db.exec(`
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

  // Вставляем базовые услуги
  await db.run(`INSERT INTO services (name) VALUES (?), (?), (?)`, [
    "Бухгалтерия",
    "Юридические консультации",
    "Кадровый учёт",
  ]);

  // Добавляем тестового администратора
  await db.run(`INSERT INTO admin_users (username, password) VALUES (?, ?)`, [
    "admin",
    "123", // Можно заменить на захешированный пароль
  ]);

  console.log("✅ База данных и таблицы созданы.");
  await db.close();
};

runMigrations();
