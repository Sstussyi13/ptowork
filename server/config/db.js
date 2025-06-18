import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./new_database.sqlite');

export default db;
