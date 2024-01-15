import { db } from '../util/db.js';

export const getPuppetOwner = (req, res) => {
  const puppetName = req.query.name;
  let owner;
  if (puppetName) {
    const newestRecord = db.prepare('SELECT owner FROM puppets WHERE name = ?;').get(puppetName);
    owner = newestRecord ? newestRecord.owner : undefined;
  }
  res.render("puppet", { owner: owner, puppet: puppetName });
}

export const getOwnersPuppets = (req, res) => {
  const ownerName = req.query.name;
  let puppets;
  if (ownerName) {
    const newestRecord = db.prepare('SELECT name FROM puppets WHERE owner = ?;').all(ownerName);
    puppets = newestRecord
  }
  res.render("owner", { puppets: puppets, owner: ownerName });
}