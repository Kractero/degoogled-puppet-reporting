import { db, displaySubmissions } from "../util/db.js";
import { encoded } from "../util/encoded.js";

export const admin = (req, res) => res.render("admin", { user: req.user.username, submissions: displaySubmissions() })

export const add = (req, res) => {
  const { name, owner } = req.body
  const puppets = owner.split(',')
  const insertResults = [];
  puppets.forEach(puppet => {
      const result = db.prepare("INSERT OR IGNORE INTO puppets VALUES (?, ?)").run([encoded(puppet), encoded(name)])
      insertResults.push(result.changes > 0);
  });
  const anyInsertSuccessful = insertResults.some(result => result);
  if (anyInsertSuccessful) {
    db.prepare("DELETE FROM submissions WHERE name = ? AND owner = ?").run([encoded(name), encoded(owner.replaceAll('\r', '').replaceAll('\n', ','))]);
  }
  res.render("admin", { user: req.user.username, submissions: displaySubmissions() })
}

export const deleteItem = (req, res) => {
  const { name, owner } = req.body
  db.prepare("DELETE FROM submissions WHERE name = ? AND owner = ?").run([encoded(name), encoded(owner.replaceAll('\r', '').replaceAll('\n', ','))]);
  res.render("admin", { user: req.user.username, submissions: displaySubmissions() })
}