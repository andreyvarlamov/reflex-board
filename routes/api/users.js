const users = require("express").Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const validateRegisterInput = require("../../validation/register");

const jwtSecret = process.env.JWT_SECRET;

// @route GET /api/users
// @desc Get all users
// @access Public
users.get("/", (req, res) => {
  // console.log("DEBUG: GET /api/users");
  User.find()
    .populate("boards", "title")
    .then(users => res.json(users))
    .catch(err => {
      console.log(err);
      res.status(404).json({ err });
    });
});

// @route POST /api/users
// @desc Create a new user
// @access Public
users.post("/", (req, res) => {
  // console.log("DEBUG: POST /api/users");
  const { firstName, lastName, email, password } = req.body;

  const { msg, isValid, emailValid } = validateRegisterInput(req.body);

  if (!emailValid) return res.status(400).json({ msg });

  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: "User already exists" });
      if (!isValid) return res.status(400).json({ msg });

      const newUser = new User({ firstName, lastName, email, password });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (hashErr, hash) => {
          if (hashErr) throw hashErr;

          newUser.password = hash;

          newUser
            .save()
            .then(user => {
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
            })
            .catch(err => console.log(err));
        });
      });
    })
    .catch(err => console.log(err));
});

module.exports = users;
