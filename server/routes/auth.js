const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../setup/myurl");

// @type    GET
//@route    /api/auth
// @desc    just for testing
// @access  PUBLIC
router.get("/", (req, res) => res.json({ test: "Auth is being tested" }));

//Import Schema for User to Register
const User = require("../models/Users");

// @type    POST
//@route    /api/auth/register
// @desc    route for registration of users
// @access  PUBLIC

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ emailerror: "Email is already registered in our system" });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
        });
        //Encrypt password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

// @type    POST
//@route    /api/auth/login
// @desc    route for login of users
// @access  PUBLIC

router.post("/login", (req, res) => {
  console.log("login reached");
  console.log(req.body);
  const email = req.body.email_login;
  const password = req.body.password_login;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ emailerror: "User not found with this email" });
      }
      bcrypt
        .compare(password, user.password)
        .then((isCorrect) => {
          if (isCorrect) {
            // res.json({ success: "User is able to login successfully" });
            //use payload and create token for user
            const payload = {
              id: user.id,
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin,
            };
            jsonwt.sign(
              payload,
              key.secret,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          } else {
            res.status(400).json({ passworderror: "Password is not correct" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @type    GET
//@route    /api/auth/users
// @desc    route for fetching users
// @access  PRIVATE

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req);
    User.find({ isAdmin: false })
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
      });
  }
);

// @type    GET
//@route    /api/auth/admin
// @desc    route for fetching admins
// @access  PRIVATE

router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ isAdmin: true })
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
      });
  }
);
// @type    POST
//@route    /api/auth/email/
// @desc    route for verifying email
// @access  PUBLIC

router.post("/email", (req, res) => {
  console.log(req.body);
  const email = req.body.email;

  User.findOne({ email })
    .then((result) => {
      console.log(result);
      if (result === null) res.json({ check: false });
      res.json({ check: true });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
