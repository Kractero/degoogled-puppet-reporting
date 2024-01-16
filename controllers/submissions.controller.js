import { db } from "../util/db.js";
import { encoded } from "../util/encoded.js";

export const submit = (req, res) => {
  if (req.query.main && req.query.puppets) {
    const result = db.prepare('INSERT OR IGNORE INTO submissions VALUES (?, ?);').run([encoded(req.query.main), encoded(req.query.puppets.replaceAll('\r', '').replaceAll('\n', ','))]);
    res.render("submit", { success: result.changes > 0 ? "Successfully added to submission queue." : "Failed to submit." });
  } else {
    res.render("submit", { success: "" });
  }
}

export const getSubmissions = (req, res) => {
  const submissions = db.prepare('SELECT * from submissions').all().map(submission => {
    return {
      name: submission.name,
      owner: submission.owner.split(',').map(pup => pup.replace('\r', '')).filter(pup => pup)
    }
  });
  res.render("submissions", { submissions: submissions })
}