import { compare } from "bcrypt";
import { db } from "../util/db.js";
import jwt from "jsonwebtoken"

export const login = (req, res) => {
  return res.render('login', { status: "" })
}

export const authenticate = async (req, res) => {
  let { username, password } = req.body;
  const user = db.prepare("SELECT * from users where username = ?;").get(username);

  try {
    compare(req.body.password, password)
  } catch {
    res.send("login", { status: "Error"} )
  }

  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" })

  res.cookie("token", token)

  return res.redirect("/admin")
}