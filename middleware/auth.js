const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ msg: "No Authorization Token" });

  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
