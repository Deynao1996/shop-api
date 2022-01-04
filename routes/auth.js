const CryptoJS = require("crypto-js");
const router = require('express').Router();
const User = require('../models/User');

//REGISTER

router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
  });

  try {
    const savedUser = await newUser.save();
    const {password, ...rest} = savedUser._doc;
    res.status(201).json(rest);
  } catch (e) {
    if (e.keyValue.username || e.keyValue.email) {
      res.status(401).json(e.keyValue);
    }
    res.status(500).json(e);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  const queryName = req.body.username;
  const queryPassword = req.body.password;

  try {
    const user = await User.findOne({username: queryName});
    const {password, ...rest} = user._doc;

    if (!user) {
      res.status(401).json("Wrong credentials!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const stringPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (stringPassword !== queryPassword) {
      res.status(401).json("Wrong credentials!");
    }
    res.status(200).json(rest);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
