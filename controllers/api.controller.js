import { db } from "../util/db.js";

export const getPuppetOwner = (req, res) => {
  const puppet = req.params.name
  const record = db.prepare('SELECT owner FROM puppets WHERE name COLLATE NOCASE = ?;').get(puppet);
  console.log(record)
  return res.json({
    "owner": record ? record.owner : "No owner found"
  })
}

export const getOwnersPuppets = (req, res) => {
  const owner = req.params.name
  const record = db.prepare('SELECT name FROM puppets WHERE owner COLLATE NOCASE = ?;').all(owner);
  return res.json({
    "puppets": record ? record : "No owner found"
  })
}

export const getAll = (req, res) => {
  const record = db.prepare('SELECT * FROM puppets').all();
  return res.json(record)
}