import Database from "better-sqlite3";

export const db = new Database("puppets.db");

export const createTable = `
  CREATE TABLE IF NOT EXISTS puppets(
    'name' text,
    'owner' text
  );
  CREATE TABLE IF NOT EXISTS submissions (
    'name' TEXT,
    'owner' TEXT,
    'timestamp' INTEGER,
    UNIQUE(name, owner)
  );
  CREATE TABLE IF NOT EXISTS users(
    'username' text,
    'password' text
  );
`;
export const displaySubmissions = () => {
  const createTable = `  CREATE TABLE IF NOT EXISTS submissions (
    'name' TEXT,
    'owner' TEXT,
    'timestamp' INTEGER,
    UNIQUE(name, owner)
  );`;
  db.exec(createTable);
  return db.prepare("SELECT * from submissions")
    .all()
    .map((submission) => {
      return {
        name: submission.name,
        owner: submission.owner
          .split(",")
          .map((pup) => pup.replace("\r", ""))
          .filter((pup) => pup),
      };
    });
};
