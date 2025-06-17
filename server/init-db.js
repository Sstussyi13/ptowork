import db from './config/db.js';

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      phone_number TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS service_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      service_type TEXT NOT NULL,
      message TEXT,
      request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  db.run(`
  CREATE TABLE IF NOT EXISTS editable_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL UNIQUE,
    type TEXT CHECK(type IN ('text', 'json')) NOT NULL,
    content TEXT NOT NULL
  )
`);


  console.log('✅ Таблицы users и service_requests успешно созданы');
});
