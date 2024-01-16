import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user;
    next()
  } catch (err) {
    console.log(err)
    res.clearCookie("token")
    return res.redirect("/login")
  }
}