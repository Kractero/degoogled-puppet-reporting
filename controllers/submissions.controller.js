import { db, displaySubmissions } from "../util/db.js";
import { encoded } from "../util/encoded.js";

export const submit = (req, res) => {
  if (req.query.main && req.query.puppets) {
    const cleanPuppets = req.query.puppets.split('\n').map((str) => str.replace(/\r/g, '')).filter((str) => str.trim() !== '').join(',')
    const result = db.prepare('INSERT OR IGNORE INTO submissions VALUES (?, ?, ?);').run([encoded(req.query.main), encoded(cleanPuppets), Math.floor(Date.now() / 1000)]);
    res.render("submit", { success: result.changes > 0 ? "Successfully added to submission queue." : "Failed to submit." });
  } else {
    res.render("submit", { success: "" });
  }
}

export const getSubmissions = (req, res) => {
  res.render("submissions", { submissions: displaySubmissions() })
}