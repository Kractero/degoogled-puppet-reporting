import Database from 'better-sqlite3';

export const db = new Database('puppets.db');

const createTable = `
  CREATE TABLE IF NOT EXISTS puppets(
    'name' text,
    'owner' text
  );
  CREATE TABLE IF NOT EXISTS submissions(
    'name' text,
    'owner' text,
    UNIQUE(name, owner)
  );
  CREATE TABLE IF NOT EXISTS users(
    'username' text,
    'password' text
  )
`

db.exec(createTable)