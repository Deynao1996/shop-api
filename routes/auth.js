const CryptoJS = require('crypto-js');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//REGISTER

router.post('/register', async (req, res) => {
  const {name, lastName, userName, email, password} = req.body;
  const newUser = new User({
    name,
    lastName,
    userName,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  });

  try {
    const existingUserName = await User.findOne({userName});
    const existingEmail = await User.findOne({email});

    if (existingUserName) {
      return res.status(400).json({errorMessage: `Username ${userName} allready exists`});
    } else if (existingEmail) {
      return res.status(400).json({errorMessage: `Email address ${email} allready exists`});
    }

    const savedUser = await newUser.save();
    const {password, ...rest} = savedUser._doc;
    res.status(201).json(rest);
  } catch (e) {
    res.status(500).json(e);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  const {userName: qUserName, password: qPassword} = req.body;

  try {
    const user = await User.findOne({userName: qUserName});

    if (!user) {
      res.status(401).json({errorMessage: 'Wrong credentials!'});
    }

    const {password, ...rest} = user._doc;
    const hashedPassword = CryptoJS.AES.decrypt(password, process.env.PASS_SEC);
    const stringPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (stringPassword !== qPassword) {
      res.status(401).json({errorMessage: 'Wrong credentials!'});
    }

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, process.env.JWT_SEC, {expiresIn: '3d'});

    res.status(200).json({...rest, accessToken});
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
