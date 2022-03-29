const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  console.log(req.body);

  const salt = bcrypt.genSaltSync(8);
  const hash_password = bcrypt.hashSync(req.body.password, salt);
  newUser.password = hash_password;

  try {
    const savedUser = await newUser.save();
    // console.log(savedUser);
    const { password, ...others } = savedUser._doc;
    // console.log("OTHERS ARE ", others);
    const accessToken = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json("Wrong credentials!");
    }

    bcrypt.compare(password, user.password, function (err, correct) {
      if (err) {
        console.log("You are error");
        res
          .status(401)
          .json({ msg: "username or password is incorrect Try again :|" });
      }
      if (correct) {
        const accessToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "3d",
          }
        );
        console.log("login");
        const { password, ...others } = user;
        res.status(200).json({ ...others, accessToken });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
