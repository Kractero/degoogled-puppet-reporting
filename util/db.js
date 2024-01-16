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

export const submissions = db.prepare('SELECT * from submissions').all().map(submission => {
  return {
    name: submission.name,
    owner: submission.owner.split('\n').map(pup => pup.replace('\r', ''))
  }
});

export const displaySubmissions = db.prepare('SELECT * from submissions').all().map(submission => {
  return {
    name: submission.name,
    owner: submission.owner.split(',').map(pup => pup.replace('\r', '')).filter(pup => pup)
  }
});