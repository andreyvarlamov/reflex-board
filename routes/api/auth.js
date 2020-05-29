const auth = require("express").Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = process.env.JWT_SECRET;

const User = require("../../models/User");
const validateLoginInput = require("../../validation/login");

const authMiddleware = require("../../middleware/auth");

// @route POST /api/auth
// @desc Authenticate a user
// @access Public
auth.post("/", (req, res) => {
  console.log("DEBUG: POST /api/auth");
  const { email, password } = req.body;

  const { msg, isValid, emailValid } = validateLoginInput(req.body);

  if (!emailValid) return res.status(400).json({ msg });

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "Invalid Credentials" });
      if (!isValid) return res.status(400).json({ msg });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Credentials" });

        jwt.sign(
          { id: user.id },
          jwtSecret,
          { expiresIn: 604800 },
          (jwtErr, token) => {
            if (jwtErr) throw jwtErr;
            return res.json({
              token,
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            });
          }
        );
      });
    })
    .catch(err => console.log(err));
});

// @route GET /api/auth/user
// @desc Return the user data based on the token
// @access Private
auth.get("/user", authMiddleware, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => {
      res.status(400).json({ msg: err });
      console.log(err);
    });
});

module.exports = auth;
